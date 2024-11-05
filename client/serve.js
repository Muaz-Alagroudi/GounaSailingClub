const express = require('express');
const path = require('path');

const app = express();
const PORT = 80; // Default HTTP port

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
