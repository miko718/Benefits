# MIKO - Developer Guide
## פלטפורמת ניהול הטבות לעצמאים

---

## 📋 תוכן עניינים
1. [סקירה כללית](#overview)
2. [התקנה ראשונית](#setup)
3. [ארכיטקטורה](#architecture)
4. [API Documentation](#api)
5. [Database Schema](#database)
6. [Frontend Components](#frontend)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

## 🎯 סקירה כללית {#overview}

**MIKO** היא פלטפורמה חברתית-מסחרית המחברת עצמאים ובעלי עסקים קטנים דרך מערכת הטבות חכמה.

### תכונות עיקריות:
- 🔍 **Discovery Feed** - גילוי הטבות מבוסס AI ומיקום
- 📍 **Location-Based Notifications** - התראות חכמות כשנכנסים לאזור רלוונטי
- ⭐ **Ratings & Reviews** - מערכת דירוגים קהילתית
- 📱 **QR Redemption** - מימוש הטבות באמצעות קוד QR
- 💰 **Subscription Model** - Free + Gold tiers

### טכנולוגיות:
- **Frontend:** React Native + Expo
- **Backend:** Node.js + Express
- **Database:** PostgreSQL + PostGIS
- **Auth:** JWT + Firebase Auth
- **Storage:** AWS S3
- **Push:** Firebase Cloud Messaging

---

## 🚀 התקנה ראשונית {#setup}

### דרישות מקדימות:
```bash
node >= 18.0.0
npm >= 9.0.0
postgresql >= 14
redis >= 7.0
```

### 1. Clone Repository
```bash
git clone https://github.com/your-org/miko-app.git
cd miko-app
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# ערוך את .env עם הגדרות שלך
npm run migrate
npm run seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npx expo start
```

### 4. Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/miko
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRATION=15m

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=miko-media

# Google Maps
GOOGLE_MAPS_API_KEY=your-api-key

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### Frontend (.env)
```env
API_BASE_URL=http://localhost:3000/api
GOOGLE_MAPS_API_KEY=your-api-key
FIREBASE_API_KEY=your-api-key
```

---

## 🏗️ ארכיטקטורה {#architecture}

```
miko-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/            # Database models
│   │   ├── routes/            # API endpoints
│   │   ├── middlewares/       # Auth, validation, etc.
│   │   ├── services/          # External services
│   │   └── utils/             # Helpers
│   ├── migrations/            # DB migrations
│   ├── seeds/                 # Sample data
│   └── tests/                 # Backend tests
├── frontend/
│   ├── src/
│   │   ├── screens/           # App screens
│   │   ├── components/        # Reusable components
│   │   ├── navigation/        # Navigation config
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API calls
│   │   ├── store/             # State management
│   │   └── utils/             # Helpers
│   └── assets/                # Images, fonts
└── docs/                      # Documentation
```

---

## 📡 API Documentation {#api}

### Base URL
```
Development: http://localhost:3000/api
Production: https://api.miko.app/api
```

### Authentication

#### POST /auth/register
```json
{
  "full_name": "דני כהן",
  "email": "danny@example.com",
  "phone": "+972501234567",
  "business_id_num": "123456789",
  "business_name": "דני כהן - ייעוץ",
  "business_category": "financial_services"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": "uuid",
    "full_name": "דני כהן",
    "subscription_type": "free"
  }
}
```

#### POST /auth/login
```json
{
  "email": "danny@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "refresh_token_here"
}
```

### Benefits

#### GET /benefits
```
Query Params:
  ?lat=32.0853&long=34.7818&radius=5000&category=health&limit=20&offset=0

Response:
{
  "success": true,
  "count": 45,
  "benefits": [
    {
      "benefit_id": "uuid",
      "title": "פגישת ייעוץ ראשונה ב-50% הנחה",
      "description": "...",
      "provider": {
        "name": "אבי כהן - ייעוץ מס",
        "rating": 4.8,
        "reviews_count": 127
      },
      "distance": 1.2,
      "expires_at": "2026-03-01T00:00:00Z"
    }
  ]
}
```

#### POST /benefits
```json
{
  "title": "20% הנחה על שיעור יוגה",
  "description": "שיעור יוגה פרטי 60 דקות",
  "type": "internal",
  "media_url": "https://...",
  "expiry_date": "2026-12-31",
  "location": {
    "lat": 32.0853,
    "long": 34.7818
  }
}

Headers:
  Authorization: Bearer {token}

Response:
{
  "success": true,
  "benefit_id": "new-uuid",
  "message": "Benefit created successfully"
}
```

### Interactions

#### POST /interactions/redeem
```json
{
  "benefit_id": "uuid",
  "qr_code": "QR_CODE_STRING"
}

Headers:
  Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Benefit redeemed successfully",
  "redeemed_at": "2026-02-04T14:30:00Z"
}
```

#### POST /interactions/rate
```json
{
  "benefit_id": "uuid",
  "rating_stars": 5,
  "review_text": "שירות מעולה, ממליץ בחום!"
}

Headers:
  Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Rating submitted successfully"
}
```

---

## 🗄️ Database Schema {#database}

### Users Table
```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  business_id_num VARCHAR(20),
  business_name VARCHAR(255),
  business_category VARCHAR(50),
  subscription_type VARCHAR(20) DEFAULT 'free',
  location_lat DECIMAL(10, 8),
  location_long DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(location_lat, location_long);
```

### Benefits Table
```sql
CREATE TABLE benefits (
  benefit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- 'internal', 'external', 'group'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_url VARCHAR(500),
  is_daily_drop BOOLEAN DEFAULT false,
  location_lat DECIMAL(10, 8),
  location_long DECIMAL(11, 8),
  location_point GEOGRAPHY(POINT, 4326), -- PostGIS for geo queries
  expiry_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_benefits_location ON benefits USING GIST(location_point);
CREATE INDEX idx_benefits_provider ON benefits(provider_id);
CREATE INDEX idx_benefits_daily ON benefits(is_daily_drop) WHERE is_daily_drop = true;
```

### Interactions Table
```sql
CREATE TABLE interactions (
  interaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  benefit_id UUID REFERENCES benefits(benefit_id) ON DELETE CASCADE,
  action_type VARCHAR(20) NOT NULL, -- 'like', 'save', 'redeem'
  rating_stars INTEGER CHECK (rating_stars >= 1 AND rating_stars <= 5),
  review_text TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, benefit_id, action_type)
);

CREATE INDEX idx_interactions_user ON interactions(user_id);
CREATE INDEX idx_interactions_benefit ON interactions(benefit_id);
CREATE INDEX idx_interactions_redeem ON interactions(action_type) WHERE action_type = 'redeem';
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  sub_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  plan_type VARCHAR(20) NOT NULL, -- 'free', 'gold'
  amount DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'canceled', 'expired'
  stripe_subscription_id VARCHAR(255),
  next_billing_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  canceled_at TIMESTAMP
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status) WHERE status = 'active';
```

### Geo Query Example
```sql
-- Find benefits within 5km radius
SELECT 
  b.*,
  ST_Distance(
    b.location_point, 
    ST_SetSRID(ST_MakePoint(34.7818, 32.0853), 4326)::geography
  ) / 1000 AS distance_km
FROM benefits b
WHERE ST_DWithin(
  b.location_point,
  ST_SetSRID(ST_MakePoint(34.7818, 32.0853), 4326)::geography,
  5000
)
ORDER BY distance_km ASC
LIMIT 20;
```

---

## 🎨 Frontend Components {#frontend}

### Core Screens

#### HomeScreen.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { useBenefits } from '../hooks/useBenefits';

export const HomeScreen = () => {
  const { location } = useLocation();
  const { benefits, loading } = useBenefits(location);
  
  return (
    <ScrollView>
      <Header />
      <SearchBar />
      <HeroSection />
      <CategoryFilter />
      <NearbySection benefits={benefits.nearby} />
      <CommunitySection benefits={benefits.community} />
    </ScrollView>
  );
};
```

#### BusinessDetailScreen.tsx
```typescript
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useBusiness } from '../hooks/useBusiness';

export const BusinessDetailScreen = () => {
  const route = useRoute();
  const { businessId } = route.params;
  const { business, loading } = useBusiness(businessId);
  
  const handleRedeem = async () => {
    navigation.navigate('QRScreen', { benefitId: business.benefit_id });
  };
  
  return (
    <ScrollView>
      <HeroImage source={business.image} />
      <RatingBadge rating={business.rating} />
      <BusinessInfo {...business} />
      <OfferCard offer={business.offer} onRedeem={handleRedeem} />
      <ContactSection {...business.contact} />
      <ReviewsList reviews={business.reviews} />
    </ScrollView>
  );
};
```

### Custom Hooks

#### useLocation.ts
```typescript
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        long: loc.coords.longitude
      });
    })();
  }, []);

  return { location, error };
};
```

#### useBenefits.ts
```typescript
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useBenefits = (location, filters = {}) => {
  const [benefits, setBenefits] = useState({ nearby: [], community: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await api.get('/benefits', {
          params: {
            lat: location.lat,
            long: location.long,
            ...filters
          }
        });
        
        // Separate nearby and community benefits
        const nearby = response.data.benefits.filter(b => b.distance < 5);
        const community = response.data.benefits.filter(b => b.type === 'internal');
        
        setBenefits({ nearby, community });
      } catch (error) {
        console.error('Failed to fetch benefits:', error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchBenefits();
    }
  }, [location, filters]);

  return { benefits, loading };
};
```

---

## 🧪 Testing {#testing}

### Backend Tests (Jest)

```javascript
// tests/auth.test.js
describe('Authentication', () => {
  test('should register new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        full_name: 'Test User',
        email: 'test@example.com',
        phone: '+972501234567',
        business_id_num: '123456789',
        password: 'Test123!'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('test@example.com');
  });

  test('should reject duplicate email', async () => {
    // Register first user
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', ... });
    
    // Try to register again
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', ... });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('already exists');
  });
});

// tests/benefits.test.js
describe('Benefits API', () => {
  let authToken;
  
  beforeAll(async () => {
    // Login and get token
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Test123!' });
    authToken = response.body.token;
  });

  test('should create new benefit', async () => {
    const response = await request(app)
      .post('/api/benefits')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Benefit',
        description: 'Test description',
        type: 'internal',
        location: { lat: 32.0853, long: 34.7818 }
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('benefit_id');
  });

  test('should get nearby benefits', async () => {
    const response = await request(app)
      .get('/api/benefits')
      .query({ lat: 32.0853, long: 34.7818, radius: 5000 });
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.benefits)).toBe(true);
  });
});
```

### Run Tests
```bash
# Backend
cd backend
npm test
npm run test:coverage

# Frontend
cd frontend
npm test
```

---

## 🚢 Deployment {#deployment}

### Backend (AWS)

```bash
# Install AWS CLI
aws configure

# Build Docker image
docker build -t miko-backend .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag miko-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/miko-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/miko-backend:latest

# Deploy to ECS
aws ecs update-service --cluster miko-cluster --service miko-backend-service --force-new-deployment
```

### Frontend (Expo EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Database Migrations

```bash
# Run migrations
npm run migrate

# Rollback
npm run migrate:rollback

# Create new migration
npm run migrate:make add_new_column
```

---

## 📚 נספחים

### Useful Commands
```bash
# Backend
npm run dev          # Start dev server
npm run lint         # Run linter
npm run format       # Format code
npm run migrate      # Run DB migrations

# Frontend
npx expo start       # Start Expo dev server
npx expo start --clear  # Clear cache
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
```

### Environment-Specific Configs

#### Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://prod-user:pass@prod-db.amazonaws.com:5432/miko_prod
REDIS_URL=redis://prod-redis.amazonaws.com:6379
```

#### Staging
```env
NODE_ENV=staging
DATABASE_URL=postgresql://staging-user:pass@staging-db.amazonaws.com:5432/miko_staging
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

- **Email:** dev@miko.app
- **Slack:** #miko-dev
- **Documentation:** https://docs.miko.app

---

**Last Updated:** February 2026  
**Version:** 1.0.0
