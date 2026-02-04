# Benefits – הטבות עצמאים (MIKO)

אפליקציית React להטבות לעצמאים: בית, עסקים קרובים, קהילה, מימוש הטבות עם QR, דירוג והגדרות.  
מבוססת על **MIKO Technical Spec**, **DEVELOPER-README** ו-**backend-sample-code**.

---

## 📁 מבנה הפרויקט

```
Benefits/
├── src/              # Frontend (React + Vite)
│   ├── App.jsx       # מסכים: בית, עסק, QR, הגדרות, מפה, הודעות
│   ├── api.js        # לקוח API (לחיבור ל-backend)
│   └── ...
├── backend/          # API לפי backend-sample-code
│   ├── server.js
│   ├── routes/       # auth, benefits, interactions, users
│   ├── models/       # User, Benefit
│   └── middlewares/
└── docs/
    └── DEVELOPER-README.md   # מדריך מפתחים מלא (מהקבצים שהוספת)
```

---

## 🚀 הרצה

### Frontend

```bash
npm install
npm run dev
```

נפתח: http://localhost:5173

### Backend (אופציונלי – לטעינת הטבות מ-DB)

```bash
cd backend
npm install
cp .env.example .env
# ערוך .env: DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET
npm run dev
```

שרת API: http://localhost:3000  
ב-frontend הוסף `.env` עם `VITE_API_BASE_URL=http://localhost:3000/api` כדי לחבר ל-API.

---

## 📚 תיעוד

- **מדריך מפתחים:** [docs/DEVELOPER-README.md](docs/DEVELOPER-README.md) – API, DB schema, התקנה, דיפלוי
- **חיבור ל-GitHub:** [SETUP-GIT.md](SETUP-GIT.md)

---

## טכנולוגיות

- **Frontend:** React 18, Vite, Tailwind CSS, lucide-react
- **Backend:** Node.js, Express, JWT, PostgreSQL + PostGIS (לפי המפרט)
