import * as sessionModel from '../models/sessionModel.js';

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await sessionModel.getSessionById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const { name, description, categoryId, duration, price, skinTypes } = req.body;
    const imageFile = req.file;

    const session = await sessionModel.createSession({
      name,
      description,
      categoryId,
      duration,
      price,
      imageFile,
      skinTypes,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    await sessionModel.deleteSession(req.params.id);
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
