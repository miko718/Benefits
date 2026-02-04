const Joi = require('joi');

const registrationSchema = Joi.object({
  full_name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  password: Joi.string().min(8).required(),
  business_id_num: Joi.string().optional(),
  business_name: Joi.string().optional(),
  business_category: Joi.string().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const benefitSchema = Joi.object({
  type: Joi.string().valid('internal', 'external', 'group').required(),
  title: Joi.string().min(5).max(255).required(),
  description: Joi.string().max(2000).optional(),
  media_url: Joi.string().uri().optional(),
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    long: Joi.number().min(-180).max(180).required()
  }).required(),
  expiry_date: Joi.date().greater('now').optional()
});

const validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateBenefit = (req, res, next) => {
  const { error } = benefitSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateBenefit
};
