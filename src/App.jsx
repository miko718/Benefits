import React, { useState } from 'react';
import { Heart, MapPin, QrCode, MessageCircle, Settings, Bell, User, Star, Phone, Instagram, Linkedin, X } from 'lucide-react';

// Mock data for businesses
const mockBusinesses = [
  {
    id: 1,
    name: "אבי כהן - ייעוץ מס",
    category: "שירותים פיננסיים",
    description: "ייעוץ מס מקצועי לעצמאים ובעלי עסקים קטנים",
    offer: "פגישת ייעוץ ראשונה ב-50% הנחה",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 127,
    distance: "2.3 ק״מ",
    phone: "050-1234567",
    instagram: "@avi.tax",
    linkedin: "avi-cohen-tax"
  },
  {
    id: 2,
    name: "סטודיו לוטוס - יוגה",
    category: "בריאות ורווחה",
    description: "שיעורי יוגה קבוצתיים ופרטיים לכל הרמות",
    offer: "שיעור ניסיון חינם + 20% הנחה על מנוי חודשי",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 234,
    distance: "1.8 ק״מ",
    phone: "050-9876543",
    instagram: "@lotus.yoga",
    linkedin: null
  },
  {
    id: 3,
    name: "תמר לוי - קופירייטינג",
    category: "שיווק ותוכן",
    description: "כתיבת תוכן שיווקי ומקצועי לעסקים",
    offer: "שני פוסטים ראשונים במחיר של אחד",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 89,
    distance: "3.5 ק״מ",
    phone: "050-5555555",
    instagram: "@tamar.writes",
    linkedin: "tamar-levy-copy"
  },
  {
    id: 4,
    name: "ביזנס האב - משרדים משותפים",
    category: "משרדים ועבודה",
    description: "מרחב עבודה משותף עם אווירה מקצועית",
    offer: "שבוע ניסיון חינם + 15% הנחה על חודש ראשון",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 156,
    distance: "0.9 ק״מ",
    phone: "050-7777777",
    instagram: "@business.hub",
    linkedin: "business-hub-tlv"
  }
];

const heroOffer = {
  title: "הטבת היום",
  description: "25% הנחה על חבילות סלולר לעסקים",
  business: "סלקום עסקים",
  image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=600&fit=crop",
  cta: "למימוש מיידי"
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userName] = useState("דני");
  const [qrActive, setQrActive] = useState(false);
  const [showRating, setShowRating] = useState(false);

  // Home Screen Component
  const HomeScreen = () => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "בוקר טוב" : currentHour < 18 ? "צהריים טובים" : "ערב טוב";

    return (
      <div className="min-h-screen bg-black text-white pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-black to-transparent p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">{greeting}, {userName}</div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Bell size={24} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all">
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-4 mb-8">
          <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
            <img 
              src={heroOffer.image} 
              alt="Hero offer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-green-400 text-sm font-bold mb-2">{heroOffer.title}</div>
              <div className="text-2xl font-bold mb-2">{heroOffer.description}</div>
              <div className="text-sm text-white/70 mb-4">{heroOffer.business}</div>
              <button className="bg-green-500 text-black px-6 py-3 rounded-full font-bold hover:bg-green-400 transition-all transform hover:scale-105">
                {heroOffer.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Section */}
        <div className="mb-8">
          <div className="px-4 mb-4 flex items-center gap-2">
            <MapPin className="text-green-400" size={20} />
            <h2 className="text-xl font-bold">קרוב אלייך</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {mockBusinesses.filter((_, i) => i < 3).map(business => (
              <div 
                key={business.id}
                onClick={() => {
                  setSelectedBusiness(business);
                  setCurrentScreen('business');
                }}
                className="flex-shrink-0 w-64 bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-bold">{business.rating}</span>
                    </div>
                    <span className="text-white/50 text-sm">•</span>
                    <span className="text-white/50 text-sm">{business.distance}</span>
                  </div>
                  <div className="font-bold mb-1">{business.name}</div>
                  <div className="text-sm text-white/70 mb-2">{business.category}</div>
                  <div className="text-green-400 text-sm font-semibold">{business.offer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div>
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold">עצמאים למען עצמאים</h2>
            <p className="text-white/50 text-sm">הצעות מיוחדות מהקהילה שלנו</p>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {mockBusinesses.map(business => (
              <div 
                key={business.id}
                onClick={() => {
                  setSelectedBusiness(business);
                  setCurrentScreen('business');
                }}
                className="flex-shrink-0 w-72 bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-bold">{business.rating}</span>
                    </div>
                    <span className="text-white/50 text-sm">({business.reviews})</span>
                    <span className="text-white/50 text-sm">•</span>
                    <span className="text-white/50 text-sm">{business.distance}</span>
                  </div>
                  <div className="font-bold text-lg mb-1">{business.name}</div>
                  <div className="text-sm text-white/70 mb-3">{business.description}</div>
                  <div className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-2 rounded-xl">
                    {business.offer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Business Detail Screen
  const BusinessScreen = () => {
    if (!selectedBusiness) return null;

    return (
      <div className="min-h-screen bg-black text-white pb-20">
        {/* Back Button */}
        <button 
          onClick={() => setCurrentScreen('home')}
          className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-all"
        >
          <X size={24} />
        </button>

        {/* Video/Image Header */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={selectedBusiness.video}
            alt={selectedBusiness.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="px-6 -mt-16 relative z-10">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold mb-4">
            <Star className="fill-black" size={20} />
            <span>{selectedBusiness.rating}</span>
            <span className="text-black/70">({selectedBusiness.reviews} ביקורות)</span>
          </div>

          {/* Business Name */}
          <h1 className="text-3xl font-bold mb-2">{selectedBusiness.name}</h1>
          <p className="text-white/70 mb-6">{selectedBusiness.description}</p>

          {/* Offer Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl mb-6">
            <div className="text-sm font-semibold mb-2 text-black/70">ההטבה שלך</div>
            <div className="text-2xl font-bold mb-4">{selectedBusiness.offer}</div>
            <button 
              onClick={() => {
                setCurrentScreen('qr');
                setQrActive(true);
              }}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-zinc-900 transition-all transform hover:scale-105"
            >
              מימוש ההטבה
            </button>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all">
              <Phone size={20} />
              צור קשר: {selectedBusiness.phone}
            </button>
            
            {selectedBusiness.instagram && (
              <button className="w-full bg-zinc-900 hover:bg-zinc-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all">
                <Instagram size={20} />
                {selectedBusiness.instagram}
              </button>
            )}
            
            {selectedBusiness.linkedin && (
              <button className="w-full bg-zinc-900 hover:bg-zinc-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all">
                <Linkedin size={20} />
                LinkedIn
              </button>
            )}
          </div>

          {/* Like/Dislike */}
          <div className="flex gap-4">
            <button className="flex-1 bg-zinc-900 hover:bg-red-500/20 border-2 border-zinc-800 hover:border-red-500 py-4 rounded-2xl font-bold transition-all transform hover:scale-105">
              לא בשבילי
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-400 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Heart className="fill-white" size={20} />
              אהבתי
            </button>
          </div>
        </div>
      </div>
    );
  };

  // QR Screen
  const QRScreen = () => {
    return (
      <div className="min-h-screen bg-black text-white pb-20 flex flex-col items-center justify-center p-6">
        <button 
          onClick={() => setCurrentScreen('home')}
          className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <QrCode className="mx-auto mb-4 text-green-400" size={48} />
          <h1 className="text-3xl font-bold mb-2">קוד המימוש שלך</h1>
          <p className="text-white/70">הצג קוד זה לבעל העסק</p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-8 rounded-3xl mb-6">
          <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
            <div className="text-8xl font-bold text-white">QR</div>
          </div>
        </div>

        {/* Business Info */}
        {selectedBusiness && (
          <div className="bg-zinc-900 p-6 rounded-3xl w-full max-w-md mb-6">
            <div className="font-bold text-xl mb-2">{selectedBusiness.name}</div>
            <div className="text-green-400 mb-4">{selectedBusiness.offer}</div>
            <div className="text-white/50 text-sm">
              הקוד תקף למשך 24 שעות מרגע הפתיחה
            </div>
          </div>
        )}

        {/* Complete Button */}
        <button 
          onClick={() => setShowRating(true)}
          className="bg-green-500 text-black px-8 py-4 rounded-full font-bold hover:bg-green-400 transition-all transform hover:scale-105"
        >
          סיימתי את העסקה
        </button>

        {/* Rating Modal */}
        {showRating && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-zinc-900 p-8 rounded-3xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">איך היה?</h2>
              <p className="text-white/70 text-center mb-6">
                דרג את השירות של {selectedBusiness?.name}
              </p>
              
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    className="hover:scale-125 transition-transform"
                  >
                    <Star className="text-yellow-400 hover:fill-yellow-400" size={40} />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  setShowRating(false);
                  setCurrentScreen('home');
                }}
                className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold hover:bg-green-400 transition-all"
              >
                שלח דירוג
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Navigation Bar
  const NavBar = () => {
    const navItems = [
      { id: 'home', icon: MapPin, label: 'בית' },
      { id: 'map', icon: MapPin, label: 'מפה' },
      { id: 'qr', icon: QrCode, label: 'QR שלי' },
      { id: 'messages', icon: MessageCircle, label: 'הודעות' },
      { id: 'settings', icon: Settings, label: 'הגדרות' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 z-50">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'qr') {
                    setQrActive(true);
                  }
                  setCurrentScreen(item.id);
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? 'text-green-400' : 'text-white/50 hover:text-white'
                }`}
              >
                <Icon size={24} className={isActive ? 'fill-green-400' : ''} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans" dir="rtl">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'business' && <BusinessScreen />}
      {currentScreen === 'qr' && <QRScreen />}
      {currentScreen === 'map' && (
        <div className="min-h-screen bg-black text-white pb-20 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto mb-4 text-green-400" size={64} />
            <h2 className="text-2xl font-bold">מפת העסקים</h2>
            <p className="text-white/50 mt-2">בקרוב...</p>
          </div>
        </div>
      )}
      {currentScreen === 'messages' && (
        <div className="min-h-screen bg-black text-white pb-20 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="mx-auto mb-4 text-green-400" size={64} />
            <h2 className="text-2xl font-bold">הודעות</h2>
            <p className="text-white/50 mt-2">בקרוב...</p>
          </div>
        </div>
      )}
      {currentScreen === 'settings' && (
        <div className="min-h-screen bg-black text-white pb-20 flex items-center justify-center">
          <div className="text-center">
            <Settings className="mx-auto mb-4 text-green-400" size={64} />
            <h2 className="text-2xl font-bold">הגדרות</h2>
            <p className="text-white/50 mt-2">בקרוב...</p>
          </div>
        </div>
      )}
      <NavBar />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
