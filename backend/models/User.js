const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(userData) {
    const {
      full_name,
      email,
      phone,
      password,
      business_id_num,
      business_name,
      business_category
    } = userData;

    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (
        full_name, email, phone, password_hash,
        business_id_num, business_name, business_category
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING user_id, full_name, email, business_name, subscription_type, created_at
    `;

    const values = [
      full_name, email, phone, password_hash,
      business_id_num, business_name, business_category
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(user_id) {
    const query = `
      SELECT user_id, full_name, email, phone,
             business_name, business_category, subscription_type,
             location_lat, location_long, created_at
      FROM users WHERE user_id = $1
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows[0];
  }

  static async updateLocation(user_id, lat, long) {
    const query = `
      UPDATE users 
      SET location_lat = $2, location_long = $3, updated_at = NOW()
      WHERE user_id = $1
      RETURNING user_id, location_lat, location_long
    `;
    const result = await pool.query(query, [user_id, lat, long]);
    return result.rows[0];
  }

  static async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = User;
