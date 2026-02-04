const express = require('express');
const router = express.Router();
const Benefit = require('../models/Benefit');
const { authenticate } = require('../middlewares/auth');
const { validateBenefit } = require('../middlewares/validation');

router.get('/', async (req, res, next) => {
  try {
    const { lat, long, radius = 5000, category, limit = 20, offset = 0 } = req.query;

    if (!lat || !long) {
      return res.status(400).json({ error: 'Location (lat, long) required' });
    }

    const benefits = await Benefit.findNearby(
      parseFloat(lat),
      parseFloat(long),
      parseInt(radius),
      parseInt(limit)
    );

    res.json({
      success: true,
      count: benefits.length,
      benefits
    });
  } catch (error) {
    next(error);
  }
});

router.get('/special/daily', async (req, res, next) => {
  try {
    const dailyDrop = await Benefit.getDailyDrop();
    if (!dailyDrop) {
      return res.status(404).json({ error: 'No daily drop available' });
    }
    res.json({ success: true, benefit: dailyDrop });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const benefit = await Benefit.findById(req.params.id);
    if (!benefit) {
      return res.status(404).json({ error: 'Benefit not found' });
    }
    res.json({ success: true, benefit });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, validateBenefit, async (req, res, next) => {
  try {
    const benefitData = {
      ...req.body,
      provider_id: req.user.user_id
    };
    const benefit = await Benefit.create(benefitData);
    res.status(201).json({
      success: true,
      benefit_id: benefit.benefit_id,
      message: 'Benefit created successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
