const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', pod: os.hostname() });
});

app.get('/api/info', (req, res) => {
  res.json({
    message: 'Hello from Kubernetes!',
    pod: os.hostname(),
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} | Pod: ${os.hostname()}`);
});
