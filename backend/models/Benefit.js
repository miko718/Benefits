const { pool } = require('../config/database');

class Benefit {
  static async create(benefitData) {
    const {
      provider_id,
      type,
      title,
      description,
      media_url,
      location
    } = benefitData;

    const query = `
      INSERT INTO benefits (
        provider_id, type, title, description, media_url,
        location_lat, location_long, location_point
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, 
        ST_SetSRID(ST_MakePoint($7, $6), 4326)::geography
      )
      RETURNING benefit_id, title, type, created_at
    `;

    const values = [
      provider_id, type, title, description, media_url,
      location.lat, location.long
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findNearby(lat, long, radius = 5000, limit = 20) {
    const query = `
      SELECT 
        b.benefit_id, b.title, b.description, b.media_url, b.type,
        b.location_lat, b.location_long,
        u.business_name, u.business_category,
        ST_Distance(
          b.location_point,
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography
        ) / 1000 AS distance_km,
        COALESCE(AVG(i.rating_stars), 0) AS avg_rating,
        COUNT(DISTINCT i.interaction_id) FILTER (WHERE i.action_type = 'redeem') AS redemption_count
      FROM benefits b
      JOIN users u ON b.provider_id = u.user_id
      LEFT JOIN interactions i ON b.benefit_id = i.benefit_id
      WHERE ST_DWithin(
        b.location_point,
        ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
        $3
      )
      AND (b.expiry_date IS NULL OR b.expiry_date > NOW())
      GROUP BY b.benefit_id, u.business_name, u.business_category
      ORDER BY distance_km ASC
      LIMIT $4
    `;

    const values = [lat, long, radius, limit];
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(benefit_id) {
    const query = `
      SELECT 
        b.*,
        u.business_name, u.business_category, u.phone,
        COALESCE(AVG(i.rating_stars), 0) AS avg_rating,
        COUNT(DISTINCT i.interaction_id) FILTER (WHERE i.rating_stars IS NOT NULL) AS review_count
      FROM benefits b
      JOIN users u ON b.provider_id = u.user_id
      LEFT JOIN interactions i ON b.benefit_id = i.benefit_id
      WHERE b.benefit_id = $1
      GROUP BY b.benefit_id, u.business_name, u.business_category, u.phone
    `;

    const result = await pool.query(query, [benefit_id]);
    return result.rows[0];
  }

  static async getDailyDrop() {
    const query = `
      SELECT b.*, u.business_name, u.business_category
      FROM benefits b
      JOIN users u ON b.provider_id = u.user_id
      WHERE b.is_daily_drop = true
      AND (b.expiry_date IS NULL OR b.expiry_date > NOW())
      ORDER BY b.created_at DESC
      LIMIT 1
    `;

    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = Benefit;
