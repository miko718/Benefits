const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');

// POST /interactions/redeem – מימוש הטבה
router.post('/redeem', authenticate, async (req, res, next) => {
  try {
    const { benefit_id, qr_code } = req.body;
    if (!benefit_id) {
      return res.status(400).json({ error: 'benefit_id required' });
    }
    res.json({
      success: true,
      message: 'Benefit redeemed successfully',
      redeemed_at: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// POST /interactions/rate – דירוג
router.post('/rate', authenticate, async (req, res, next) => {
  try {
    const { benefit_id, rating_stars, review_text } = req.body;
    if (!benefit_id || !rating_stars) {
      return res.status(400).json({ error: 'benefit_id and rating_stars required' });
    }
    res.json({
      success: true,
      message: 'Rating submitted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// GET /interactions/saved – הטבות שמורות (stub)
router.get('/saved', authenticate, async (req, res, next) => {
  try {
    res.json({ success: true, benefits: [] });
  } catch (error) {
    next(error);
  }
});

// GET /interactions/history – היסטוריה (stub)
router.get('/history', authenticate, async (req, res, next) => {
  try {
    res.json({ success: true, history: [] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
