const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const SERVER_CONFIG = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const networksRoutes = require('./routes/networks');
const servicesRoutes = require('./routes/services');
const carouselRoutes = require('./routes/carousel');
const settingsRoutes = require('./routes/settings');
const mediaRoutes = require('./routes/media');
const submissionsRoutes = require('./routes/submissions');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/pages', pagesRoutes);
app.use('/networks', networksRoutes);
app.use('/services', servicesRoutes);
app.use('/carousel', carouselRoutes);
app.use('/settings', settingsRoutes);
app.use('/media', mediaRoutes);
app.use('/submissions', submissionsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on http://${SERVER_CONFIG.IP}:${SERVER_CONFIG.PORT}`);
});