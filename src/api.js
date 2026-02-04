/**
 * MIKO / Benefits API client
 * לפי DEVELOPER-README.md ו-backend-sample-code
 * שים ב-.env: VITE_API_BASE_URL=http://localhost:3000/api
 */

const BASE = import.meta.env.VITE_API_BASE_URL || '';

export const api = {
  async getBenefits(params = {}) {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE}/benefits?${q}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getBenefit(id) {
    const res = await fetch(`${BASE}/benefits/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getDailyDrop() {
    const res = await fetch(`${BASE}/benefits/special/daily`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async register(data) {
    const res = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async redeem(token, benefitId, qrCode) {
    const res = await fetch(`${BASE}/interactions/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ benefit_id: benefitId, qr_code: qrCode }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async rate(token, benefitId, ratingStars, reviewText = '') {
    const res = await fetch(`${BASE}/interactions/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        benefit_id: benefitId,
        rating_stars: ratingStars,
        review_text: reviewText,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

export default api;
