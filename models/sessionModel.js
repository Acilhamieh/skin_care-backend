import sql from '../config/db.js';
import supabase from '../config/supabaseClient.js';

const ALLOWED_SKIN_TYPES = ['Normal Skin', 'Oily Skin', 'Dry Skin', 'Combination Skin'];

export const getAllSessions = async () => {
  const sessions = await sql`
    SELECT 
      s.id,
      s.name,
      s.description,
      s.duration,
      s.price,
      s.createdat,
      s.updatedat,
      s.categoryid,
      c.name AS category_name,
      f.fileurl AS image_url,
      COALESCE(json_agg(DISTINCT sst.skin_type) FILTER (WHERE sst.skin_type IS NOT NULL), '[]') AS skin_types
    FROM sessions s
    LEFT JOIN categories c ON s.categoryid = c.id
    LEFT JOIN files f ON s.id = f.sessionid AND f.type = 'image'
    LEFT JOIN session_skin_types sst ON s.id = sst.session_id
    GROUP BY s.id, s.categoryid, c.name, f.fileurl
    ORDER BY s.createdat DESC;
  `;

  // Transform category fields into one object
  return sessions.map(session => ({
    ...session,
    category: {
      id: session.categoryid,
      name: session.category_name,
    },
    // remove the raw fields we nested inside category
    categoryid: undefined,
    category_name: undefined,
  }));
};

export const getSessionById = async (id) => {
  const [session] = await sql`
    SELECT 
      s.*, 
      f.fileurl AS image_url,
      COALESCE(json_agg(DISTINCT sst.skin_type) FILTER (WHERE sst.skin_type IS NOT NULL), '[]') AS skin_types
    FROM sessions s
    LEFT JOIN files f ON s.id = f.sessionid AND f.type = 'image'
    LEFT JOIN session_skin_types sst ON s.id = sst.session_id
    WHERE s.id = ${id}
    GROUP BY s.id, f.fileurl;
  `;
  return session;
};

export const createSession = async ({ name, description, categoryId, duration, price, imageFile, skinTypes }) => {
  return await sql.begin(async (sql) => {
    const now = new Date();

    // Insert session (ID auto-generated)
    const [session] = await sql`
      INSERT INTO sessions (name, description, categoryid, duration, price, createdat, updatedat)
      VALUES (${name}, ${description}, ${categoryId}, ${duration}, ${price}, ${now}, ${now})
      RETURNING *;
    `;

    // Upload image
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('session-images')
        .upload(`sessions/${Date.now()}_${imageFile.originalname}`, imageFile.buffer, {
          contentType: imageFile.mimetype,
        });

      if (error) {
        throw new Error(`Image upload failed: ${error.message}`);
      }

      const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/session-images/${data.path}`;

      await sql`
        INSERT INTO files (sessionid, categoryid, fileurl, type, createdat, updatedat)
        VALUES (${session.id}, ${categoryId}, ${imageUrl}, 'image', ${now}, ${now});
      `;
    }

    // Insert skin types
    for (const type of skinTypes) {
      if (!ALLOWED_SKIN_TYPES.includes(type)) {
        throw new Error(`Invalid skin type: ${type}`);
      }

      await sql`
        INSERT INTO session_skin_types (session_id, skin_type)
        VALUES (${session.id}, ${type});
      `;
    }

    return session;
  });
};

export const deleteSession = async (id) => {
  return await sql.begin(async (sql) => {
    await sql`DELETE FROM session_skin_types WHERE session_id = ${id};`;
    await sql`DELETE FROM files WHERE sessionid = ${id};`;
    await sql`DELETE FROM sessions WHERE id = ${id};`;
  });
};
