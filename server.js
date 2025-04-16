const express = require('express');
const app = express();

// Define a port
const PORT = 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
