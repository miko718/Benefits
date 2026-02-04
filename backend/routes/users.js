const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');

// GET /users/profile
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

// PUT /users/profile (stub – עדכון פרופיל)
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    next(error);
  }
});

// PUT /users/location
router.put('/location', authenticate, async (req, res, next) => {
  try {
    const { lat, long } = req.body;
    if (lat == null || long == null) {
      return res.status(400).json({ error: 'lat and long required' });
    }
    const User = require('../models/User');
    await User.updateLocation(req.user.user_id, lat, long);
    res.json({ success: true, message: 'Location updated' });
  } catch (error) {
    next(error);
  }
});

// GET /users/businesses (stub)
router.get('/businesses', authenticate, async (req, res, next) => {
  try {
    res.json({ success: true, businesses: [] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
