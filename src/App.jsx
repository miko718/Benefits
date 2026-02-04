import React, { useState, useEffect } from 'react';
import { Heart, MapPin, QrCode, MessageCircle, Settings, Bell, User, Star, Phone, Instagram, Linkedin, X, ChevronLeft, Sparkles, TrendingUp, Clock, Share2, Bookmark, Filter, Search, LogOut, Globe, HelpCircle } from 'lucide-react';

// Mock data for businesses with enhanced details
const mockBusinesses = [
  {
    id: 1,
    name: "אבי כהן - ייעוץ מס",
    category: "שירותים פיננסיים",
    description: "ייעוץ מס מקצועי לעצמאים ובעלי עסקים קטנים",
    longDescription: "למעלה מ-15 שנות ניסיון בליווי עצמאים וחברות סטארטאפ. מתמחה בתכנון מס אסטרטגי, ייעוץ רשויות והקמת חברות.",
    offer: "פגישת ייעוץ ראשונה ב-50% הנחה",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 127,
    distance: "2.3 ק״מ",
    phone: "050-1234567",
    instagram: "@avi.tax",
    linkedin: "avi-cohen-tax",
    verified: true,
    responseTime: "תוך שעה",
    completedDeals: 245,
    tags: ["מומלץ", "מקצוען", "מהיר"],
    openHours: "א׳-ה׳ 9:00-18:00",
    savedBy: 89
  },
  {
    id: 2,
    name: "סטודיו לוטוס - יוגה",
    category: "בריאות ורווחה",
    description: "שיעורי יוגה קבוצתיים ופרטיים לכל הרמות",
    longDescription: "סטודיו בוטיק המציע חוויית יוגה אותנטית עם מורים מוסמכים. שיעורים במגוון סגנונות: הטהא, וינייאסה, יין ויוגה משקמת.",
    offer: "שיעור ניסיון חינם + 20% הנחה על מנוי חודשי",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 234,
    distance: "1.8 ק״מ",
    phone: "050-9876543",
    instagram: "@lotus.yoga",
    linkedin: null,
    verified: true,
    responseTime: "תוך 30 דקות",
    completedDeals: 412,
    tags: ["פופולרי", "אווירה מעולה", "לכל הרמות"],
    openHours: "כל השבוע 7:00-21:00",
    savedBy: 156
  },
  {
    id: 3,
    name: "תמר לוי - קופירייטינג",
    category: "שיווק ותוכן",
    description: "כתיבת תוכן שיווקי ומקצועי לעסקים",
    longDescription: "קופירייטרית עם רקע בהייטק ועסקים קטנים. מתמחה בכתיבת landing pages, מיילים שיווקיים ותוכן לרשתות חברתיות.",
    offer: "שני פוסטים ראשונים במחיר של אחד",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 89,
    distance: "3.5 ק״מ",
    phone: "050-5555555",
    instagram: "@tamar.writes",
    linkedin: "tamar-levy-copy",
    verified: true,
    responseTime: "תוך 2 שעות",
    completedDeals: 178,
    tags: ["יצירתי", "עומד בלוחות זמנים", "מקצועי"],
    openHours: "א׳-ה׳ 10:00-19:00",
    savedBy: 64
  },
  {
    id: 4,
    name: "ביזנס האב - משרדים משותפים",
    category: "משרדים ועבודה",
    description: "מרחב עבודה משותף עם אווירה מקצועית",
    longDescription: "קו-וורקינג פרמיום במרכז העיר. חדרי ישיבות, פינות שקטות, קפה בחינם ואירועי נטוורקינג שבועיים.",
    offer: "שבוע ניסיון חינם + 15% הנחה על חודש ראשון",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 156,
    distance: "0.9 ק״מ",
    phone: "050-7777777",
    instagram: "@business.hub",
    linkedin: "business-hub-tlv",
    verified: true,
    responseTime: "תוך 15 דקות",
    completedDeals: 523,
    tags: ["מיקום מעולה", "קהילה תומכת", "מתקנים מעולים"],
    openHours: "24/7",
    savedBy: 203
  },
  {
    id: 5,
    name: "רועי שטרן - עיצוב גרפי",
    category: "עיצוב וקריאייטיב",
    description: "עיצוב לוגו, מיתוג ועיצוב דיגיטלי",
    longDescription: "מעצב עם תיק עבודות מרשים בתחום ההייטק והאופנה. מתמחה בזהות ויזואלית ייחודית לעסקים צעירים.",
    offer: "לוגו + כרטיס ביקור דיגיטלי במחיר מיוחד",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 312,
    distance: "4.2 ק״מ",
    phone: "050-3333333",
    instagram: "@roey.design",
    linkedin: "roey-stern-design",
    verified: true,
    responseTime: "תוך שעה",
    completedDeals: 298,
    tags: ["יצירתי מאוד", "סגנון ייחודי", "מומלץ בחום"],
    openHours: "א׳-ה׳ 9:00-20:00",
    savedBy: 178
  },
  {
    id: 6,
    name: "נועה ברק - אימון אישי",
    category: "בריאות ורווחה",
    description: "אימון כושר אישי ובקבוצות קטנות",
    longDescription: "מאמנת כושר מוסמכת עם התמחות בשיקום ספורטיבי. תוכניות מותאמות אישית לכל רמה.",
    offer: "3 אימונים ראשונים במחיר של 2",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    rating: 4.95,
    reviews: 187,
    distance: "2.7 ק״מ",
    phone: "050-8888888",
    instagram: "@noa.fitness",
    linkedin: null,
    verified: true,
    responseTime: "תוך 30 דקות",
    completedDeals: 356,
    tags: ["מוטיבציה גבוהה", "תוצאות מוכחות", "אנרגיה חיובית"],
    openHours: "א׳-ו׳ 6:00-21:00",
    savedBy: 234
  }
];

const heroOffer = {
  title: "הטבת היום ⚡",
  description: "25% הנחה על חבילות סלולר לעסקים",
  business: "סלקום עסקים",
  subtitle: "תקפה ל-24 שעות הקרובות בלבד",
  image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=600&fit=crop",
  cta: "למימוש מיידי",
  badge: "HOT"
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userName] = useState("דני");
  const [qrActive, setQrActive] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [likedBusinesses, setLikedBusinesses] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [subscriptionType, setSubscriptionType] = useState('free'); // 'free' | 'gold'
  const [locationEnabled, setLocationEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSave = (businessId) => {
    setSavedBusinesses(prev =>
      prev.includes(businessId)
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  const toggleLike = (businessId) => {
    setLikedBusinesses(prev =>
      prev.includes(businessId)
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  // Home Screen Component
  const HomeScreen = () => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "בוקר טוב" : currentHour < 18 ? "צהריים טובים" : "ערב טוב";

    const categories = ['הכל', 'שירותים פיננסיים', 'בריאות ורווחה', 'שיווק ותוכן', 'עיצוב וקריאייטיב', 'משרדים ועבודה'];

    const filteredBusinesses = mockBusinesses.filter(business => {
      const matchesSearch = business.name.includes(searchQuery) ||
        business.description.includes(searchQuery) ||
        business.category.includes(searchQuery);
      const matchesCategory = filterCategory === 'all' || business.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Enhanced Header with Parallax */}
        <div
          className="sticky top-0 z-20 backdrop-blur-xl bg-black/80 border-b border-white/5"
          style={{ transform: `translateY(${Math.min(scrollY * 0.5, 50)}px)` }}
        >
          <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
                {greeting}, {userName}
              </div>
              <div className="text-sm text-white/40 mt-1 font-medium">גלה הזדמנויות חדשות היום</div>
            </div>
            <div className="flex gap-2">
              <button className="relative p-3 hover:bg-white/10 rounded-2xl transition-all group">
                <Bell size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </button>
              <button className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                <User size={22} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4 max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="חפש עסקים, שירותים או קטגוריות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-white/40 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Hero Section with Advanced Animation */}
        <div className="px-4 pt-6 pb-8 max-w-7xl mx-auto">
          <div className="relative h-80 rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 opacity-90"></div>
            <img
              src={heroOffer.image}
              alt="Hero offer"
              className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
            <div className="absolute top-6 left-6">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-black text-sm animate-pulse shadow-lg shadow-red-500/50">
                {heroOffer.badge}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-yellow-300" size={20} />
                <div className="text-yellow-300 text-sm font-black tracking-wider uppercase">
                  {heroOffer.title}
                </div>
              </div>
              <div className="text-4xl font-black mb-2 leading-tight drop-shadow-2xl">
                {heroOffer.description}
              </div>
              <div className="text-lg text-white/90 mb-1 font-semibold">{heroOffer.business}</div>
              <div className="text-sm text-white/60 mb-6 flex items-center gap-2">
                <Clock size={16} />
                {heroOffer.subtitle}
              </div>
              <button className="bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:bg-green-400 hover:text-white transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-white/30 group">
                <span className="flex items-center gap-2">
                  {heroOffer.cta}
                  <ChevronLeft className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide max-w-7xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat === 'הכל' ? 'all' : cat)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all ${(filterCategory === 'all' && cat === 'הכל') || filterCategory === cat
                    ? 'bg-green-400 text-black shadow-lg shadow-green-400/50'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Section with Enhanced Cards */}
        <div className="mb-12">
          <div className="px-4 mb-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <MapPin className="text-black" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">קרוב אלייך</h2>
                  <p className="text-white/50 text-sm">עסקים ברדיוס של 5 ק״מ</p>
                </div>
              </div>
              <button className="text-green-400 text-sm font-bold hover:text-green-300 flex items-center gap-1">
                הכל
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide max-w-7xl mx-auto">
            {filteredBusinesses.filter((_, i) => i < 4).map((business, idx) => (
              <div
                key={business.id}
                onClick={() => {
                  setSelectedBusiness(business);
                  setCurrentScreen('business');
                }}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-2xl hover:shadow-green-500/20 border border-white/5"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animation: 'slideInFromRight 0.6s ease-out forwards'
                }}
              >
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  {business.verified && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Sparkles size={12} />
                      מאומת
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(business.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all group"
                  >
                    <Bookmark
                      size={18}
                      className={savedBusinesses.includes(business.id) ? 'fill-green-400 text-green-400' : 'text-white group-hover:text-green-400'}
                    />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-400/20 px-3 py-1 rounded-full">
                        <Star className="text-yellow-400 fill-yellow-400" size={14} />
                        <span className="font-black text-sm">{business.rating}</span>
                        <span className="text-white/40 text-xs">({business.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-sm">
                      <MapPin size={14} />
                      <span className="font-semibold">{business.distance}</span>
                    </div>
                  </div>
                  <div className="font-black text-xl mb-2 leading-tight">{business.name}</div>
                  <div className="text-sm text-white/50 mb-3 font-medium">{business.category}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {business.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-white/5 text-white/70 px-3 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold px-4 py-3 rounded-2xl">
                    {business.offer}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <TrendingUp size={14} className="text-green-400" />
                      <span className="font-semibold">{business.completedDeals} עסקאות</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Clock size={14} className="text-blue-400" />
                      <span className="font-semibold">{business.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="mb-12">
          <div className="px-4 mb-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Heart className="text-white fill-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">עצמאים למען עצמאים</h2>
                  <p className="text-white/50 text-sm">הצעות מיוחדות מהקהילה</p>
                </div>
              </div>
              <button className="text-purple-400 text-sm font-bold hover:text-purple-300 flex items-center gap-1">
                הכל
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
            {filteredBusinesses.map((business, idx) => (
              <div
                key={business.id}
                onClick={() => {
                  setSelectedBusiness(business);
                  setCurrentScreen('business');
                }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/20 border border-white/5"
                style={{
                  animationDelay: `${idx * 80}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative h-56 overflow-hidden group">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  {business.verified && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={14} />
                      מאומת
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(business.id);
                    }}
                    className="absolute top-4 right-4 w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    <Bookmark
                      size={20}
                      className={savedBusinesses.includes(business.id) ? 'fill-green-400 text-green-400' : 'text-white'}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-black text-sm">{business.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full text-sm font-semibold">
                      <MapPin size={14} />
                      {business.distance}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="font-black text-xl mb-2 leading-tight">{business.name}</div>
                  <div className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">{business.description}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {business.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-full font-semibold border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold px-4 py-3 rounded-2xl mb-4">
                    {business.offer}
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-green-400" />
                      <span className="font-semibold">{business.completedDeals}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-400" />
                      <span className="font-semibold">{business.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart size={14} className="text-pink-400" />
                      <span className="font-semibold">{business.savedBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showSuccessToast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl z-50 flex items-center gap-2 animate-slideDown">
            <Heart className="fill-black" size={18} />
            נוסף למועדפים!
          </div>
        )}
      </div>
    );
  };

  // Enhanced Business Detail Screen
  const BusinessScreen = () => {
    if (!selectedBusiness) return null;

    return (
      <div className="min-h-screen bg-black text-white pb-24 overflow-hidden">
        <button
          onClick={() => setCurrentScreen('home')}
          className="fixed top-6 right-6 z-30 bg-black/70 backdrop-blur-xl p-3 rounded-full hover:bg-black/90 transition-all shadow-2xl border border-white/10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <button
          className="fixed top-6 left-6 z-30 bg-black/70 backdrop-blur-xl p-3 rounded-full hover:bg-black/90 transition-all shadow-2xl border border-white/10"
        >
          <Share2 size={24} />
        </button>

        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={selectedBusiness.video}
            alt={selectedBusiness.name}
            className="w-full h-full object-cover scale-110"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="absolute bottom-8 right-8 bg-yellow-400 text-black px-5 py-3 rounded-full font-black text-lg shadow-2xl shadow-yellow-400/50 flex items-center gap-2 animate-float">
            <Star className="fill-black" size={24} />
            <span className="text-2xl">{selectedBusiness.rating}</span>
            <span className="text-black/70 text-sm">/ 5</span>
          </div>
        </div>

        <div className="px-6 -mt-20 relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {selectedBusiness.verified && (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-blue-500/50">
                <Sparkles size={18} />
                עסק מאומת
              </div>
            )}
            {selectedBusiness.tags.map(tag => (
              <span key={tag} className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/20">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-black mb-3 leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {selectedBusiness.name}
          </h1>
          <p className="text-xl text-white/70 mb-2 font-medium">{selectedBusiness.category}</p>
          <p className="text-white/60 mb-8 leading-relaxed text-lg">{selectedBusiness.longDescription}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 p-5 rounded-2xl text-center">
              <TrendingUp className="mx-auto mb-2 text-green-400" size={28} />
              <div className="text-2xl font-black text-white">{selectedBusiness.completedDeals}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">עסקאות</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-5 rounded-2xl text-center">
              <Clock className="mx-auto mb-2 text-blue-400" size={28} />
              <div className="text-xl font-black text-white">{selectedBusiness.responseTime}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">זמן תגובה</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 p-5 rounded-2xl text-center">
              <Heart className="mx-auto mb-2 text-pink-400" size={28} />
              <div className="text-2xl font-black text-white">{selectedBusiness.savedBy}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">שמורים</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl mb-8 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black">ביקורות</h3>
              <div className="text-sm text-white/50">{selectedBusiness.reviews} ביקורות</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-yellow-400">{selectedBusiness.rating}</div>
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < Math.floor(selectedBusiness.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} size={20} />
                  ))}
                </div>
                <div className="text-sm text-white/60">מבוסס על {selectedBusiness.reviews} ביקורות</div>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 rounded-[32px] mb-8 overflow-hidden shadow-2xl shadow-green-500/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-yellow-300" size={24} />
                <div className="text-sm font-black text-black/70 uppercase tracking-wider">ההטבה המיוחדת שלך</div>
              </div>
              <div className="text-3xl font-black mb-6 leading-tight text-black drop-shadow-lg">
                {selectedBusiness.offer}
              </div>
              <button
                onClick={() => {
                  setCurrentScreen('qr');
                  setQrActive(true);
                }}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-zinc-900 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3 group"
              >
                <QrCode size={24} className="group-hover:rotate-12 transition-transform" />
                מימוש ההטבה עכשיו
                <ChevronLeft className="group-hover:translate-x-2 transition-transform" size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-black mb-4">יצירת קשר</h3>
            <a
              href={`tel:${selectedBusiness.phone}`}
              className="w-full bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-zinc-800 hover:to-zinc-900 py-5 rounded-2xl font-bold flex items-center justify-between px-6 transition-all border border-white/5 hover:border-green-400/50 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center group-hover:bg-green-400/30 transition-colors">
                  <Phone className="text-green-400" size={22} />
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/50 mb-1">טלפון</div>
                  <div className="font-black">{selectedBusiness.phone}</div>
                </div>
              </div>
              <ChevronLeft className="text-white/30 group-hover:text-green-400 group-hover:translate-x-2 transition-all" size={24} />
            </a>
            {selectedBusiness.instagram && (
              <a
                href={`https://instagram.com/${selectedBusiness.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-pink-900/30 hover:to-purple-900/30 py-5 rounded-2xl font-bold flex items-center justify-between px-6 transition-all border border-white/5 hover:border-pink-400/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full flex items-center justify-center group-hover:from-pink-400/30 group-hover:to-purple-400/30 transition-colors">
                    <Instagram className="text-pink-400" size={22} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/50 mb-1">Instagram</div>
                    <div className="font-black">{selectedBusiness.instagram}</div>
                  </div>
                </div>
                <ChevronLeft className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-2 transition-all" size={24} />
              </a>
            )}
            {selectedBusiness.linkedin && (
              <a
                href={`https://linkedin.com/in/${selectedBusiness.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-blue-900/30 hover:to-cyan-900/30 py-5 rounded-2xl font-bold flex items-center justify-between px-6 transition-all border border-white/5 hover:border-blue-400/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center group-hover:bg-blue-400/30 transition-colors">
                    <Linkedin className="text-blue-400" size={22} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/50 mb-1">LinkedIn</div>
                    <div className="font-black">פרופיל מקצועי</div>
                  </div>
                </div>
                <ChevronLeft className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" size={24} />
              </a>
            )}
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl mb-8 border border-white/5">
            <h3 className="text-xl font-black mb-4">שעות פעילות</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                <Clock className="text-green-400" size={24} />
              </div>
              <div>
                <div className="font-bold text-lg">{selectedBusiness.openHours}</div>
                <div className="text-sm text-white/50">זמינות</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 sticky bottom-24 z-20">
            <button
              onClick={() => toggleSave(selectedBusiness.id)}
              className={`flex-1 py-5 rounded-2xl font-black transition-all transform hover:scale-105 border-2 ${savedBusinesses.includes(selectedBusiness.id)
                  ? 'bg-green-400 text-black border-green-400 shadow-lg shadow-green-400/30'
                  : 'bg-zinc-900 text-white border-white/10 hover:border-green-400/50'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Bookmark className={savedBusinesses.includes(selectedBusiness.id) ? 'fill-black' : ''} size={22} />
                {savedBusinesses.includes(selectedBusiness.id) ? 'נשמר' : 'שמור לאחר כך'}
              </div>
            </button>
            <button
              onClick={() => toggleLike(selectedBusiness.id)}
              className={`flex-1 py-5 rounded-2xl font-black transition-all transform hover:scale-105 ${likedBusinesses.includes(selectedBusiness.id)
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 shadow-lg shadow-green-500/30'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className={likedBusinesses.includes(selectedBusiness.id) ? 'fill-white' : 'fill-black'} size={22} />
                {likedBusinesses.includes(selectedBusiness.id) ? 'אהבתי!' : 'מעניין אותי'}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced QR Screen
  const QRScreen = () => {
    const [countdown, setCountdown] = useState(24);

    useEffect(() => {
      if (qrActive) {
        const timer = setInterval(() => {
          setCountdown(prev => prev > 0 ? prev - 1 : 0);
        }, 3600000);
        return () => clearInterval(timer);
      }
    }, [qrActive]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-24 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <button
          onClick={() => setCurrentScreen('home')}
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl p-3 rounded-full hover:bg-white/20 transition-all z-10 border border-white/20"
        >
          <X size={24} />
        </button>

        <div className="relative z-10 max-w-md w-full">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/50 animate-float">
              <QrCode className="text-black" size={48} />
            </div>
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
              קוד המימוש שלך
            </h1>
            <p className="text-white/70 text-lg">הצג קוד זה לבעל העסק</p>
          </div>

          <div className="bg-white p-10 rounded-[32px] mb-8 shadow-2xl transform hover:scale-105 transition-transform">
            <div className="w-full aspect-square bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-1 p-4">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={`bg-black rounded ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-9xl font-black text-white drop-shadow-2xl">QR</div>
                <div className="text-sm text-white/80 font-bold mt-2">סרוק אותי</div>
              </div>
            </div>
          </div>

          {selectedBusiness && (
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 rounded-[32px] w-full mb-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedBusiness.image}
                  alt={selectedBusiness.name}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <div className="font-black text-2xl mb-1">{selectedBusiness.name}</div>
                  <div className="text-white/50 text-sm">{selectedBusiness.category}</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 font-bold px-6 py-4 rounded-2xl mb-6">
                <div className="text-lg leading-relaxed">{selectedBusiness.offer}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={18} className="text-yellow-400" />
                  <span className="font-semibold">תקף למשך <span className="text-white font-black">{countdown}</span> שעות</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold">פעיל</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowRating(true)}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black px-10 py-6 rounded-full font-black text-xl hover:from-green-300 hover:to-emerald-400 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-green-500/50 flex items-center justify-center gap-3 group"
          >
            <span>סיימתי את העסקה</span>
            <ChevronLeft className="group-hover:translate-x-2 transition-transform" size={24} />
          </button>

          <div className="text-center text-white/40 text-sm mt-6">
            לא הצלחת לממש? <button className="text-green-400 font-bold hover:text-green-300">דווח על בעיה</button>
          </div>
        </div>

        {showRating && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 z-50 animate-fadeIn">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 rounded-[32px] max-w-md w-full border border-white/10 shadow-2xl">
              <h2 className="text-4xl font-black mb-3 text-center">איך היה?</h2>
              <p className="text-white/70 text-center mb-8 text-lg">
                דרג את השירות של <span className="text-green-400 font-bold">{selectedBusiness?.name}</span>
              </p>
              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onMouseEnter={() => setHoveredStar(num)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(num)}
                    className="transform hover:scale-125 transition-all duration-200"
                  >
                    <Star
                      className={
                        num <= (hoveredStar || rating)
                          ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                          : 'text-white/20'
                      }
                      size={48}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-yellow-400 mb-2">{rating}.0</div>
                  <div className="text-white/60">
                    {rating === 5 && "מעולה! 🎉"}
                    {rating === 4 && "טוב מאוד! 👍"}
                    {rating === 3 && "בסדר ✓"}
                    {rating === 2 && "לא משהו 😕"}
                    {rating === 1 && "חוויה גרועה 😞"}
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setShowRating(false);
                  setCurrentScreen('home');
                  setRating(0);
                }}
                disabled={rating === 0}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform ${rating > 0
                    ? 'bg-green-400 text-black hover:bg-green-300 hover:scale-105 shadow-lg shadow-green-400/50'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
              >
                שלח דירוג
              </button>
              <button
                onClick={() => setShowRating(false)}
                className="w-full mt-3 py-4 text-white/50 hover:text-white font-bold transition-colors"
              >
                דלג
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Settings Screen
  const SettingsScreen = () => (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">הגדרות</h1>
          <p className="text-white/50 text-sm mt-1">נהל את החשבון וההעדפות שלך</p>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Profile */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <User className="text-black" size={32} />
            </div>
            <div>
              <div className="text-xl font-black">{userName}</div>
              <div className="text-white/50 text-sm">עצמאי</div>
              <div className="text-green-400 text-sm font-semibold mt-1">חשבון חינמי</div>
            </div>
          </div>
          <button className="w-full mt-4 py-3 rounded-2xl border border-white/10 text-white/80 font-bold hover:bg-white/5 transition-all">
            ערוך פרופיל
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-white/5">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <Bell size={20} className="text-green-400" />
            התראות
          </h2>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-white/90 font-medium">התראות push</span>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-8 rounded-full transition-all ${notificationsEnabled ? 'bg-green-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${notificationsEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-white/50 text-xs mt-2">התראות על הטבות קרובות והטבת היום</p>
        </div>

        {/* Location */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-white/5">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-green-400" />
            מיקום
          </h2>
          <div className="flex items-center justify-between py-3">
            <span className="text-white/90 font-medium">שימוש במיקום</span>
            <button
              onClick={() => setLocationEnabled(!locationEnabled)}
              className={`w-14 h-8 rounded-full transition-all ${locationEnabled ? 'bg-green-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${locationEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-white/50 text-xs mt-2">להצגת עסקים קרוב אליך</p>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-white/5">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            מנוי
          </h2>
          <div className="flex items-center justify-between py-3 mb-4">
            <div>
              <span className="font-bold text-white">{subscriptionType === 'gold' ? 'Gold' : 'חינם'}</span>
              <span className="text-white/50 text-sm mr-2">({subscriptionType === 'gold' ? '₪49/חודש' : '3 הטבות ליום'})</span>
            </div>
            {subscriptionType === 'free' && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">שדרג</span>
            )}
          </div>
          {subscriptionType === 'free' && (
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-yellow-400 font-black hover:from-yellow-500/30 hover:to-amber-500/30 transition-all">
              שדרג ל-Gold – גישה להטבות ללא הגבלה
            </button>
          )}
        </div>

        {/* Language & About */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-white/5">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <Globe size={20} className="text-green-400" />
            כללי
          </h2>
          <button className="w-full flex items-center justify-between py-4 border-b border-white/5 text-right hover:bg-white/5 rounded-t-2xl transition-colors">
            <ChevronLeft size={20} className="text-white/40" />
            <span className="text-white/90 font-medium">שפה</span>
            <span className="text-white/50 text-sm">עברית</span>
          </button>
          <button className="w-full flex items-center justify-between py-4 border-b border-white/5 text-right hover:bg-white/5 transition-colors">
            <ChevronLeft size={20} className="text-white/40" />
            <span className="text-white/90 font-medium">תנאי שימוש</span>
          </button>
          <button className="w-full flex items-center justify-between py-4 text-right hover:bg-white/5 rounded-b-2xl transition-colors">
            <ChevronLeft size={20} className="text-white/40" />
            <span className="text-white/90 font-medium flex items-center gap-2">
              <HelpCircle size={18} />
              עזרה ותמיכה
            </span>
          </button>
        </div>

        {/* Version */}
        <div className="text-center text-white/40 text-sm py-4">גרסה 1.0.0</div>

        {/* Logout */}
        <button className="w-full py-4 rounded-2xl border-2 border-red-500/50 text-red-400 font-black hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
          <LogOut size={20} />
          התנתק
        </button>
      </div>
    </div>
  );

  const NavBar = () => {
    const navItems = [
      { id: 'home', icon: MapPin, label: 'בית', color: 'green' },
      { id: 'map', icon: MapPin, label: 'מפה', color: 'blue' },
      { id: 'qr', icon: QrCode, label: 'QR שלי', color: 'purple' },
      { id: 'messages', icon: MessageCircle, label: 'הודעות', color: 'pink' },
      { id: 'settings', icon: Settings, label: 'הגדרות', color: 'orange' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 px-4 py-4 z-50 shadow-2xl">
        <div className="flex justify-around items-center max-w-2xl mx-auto relative">
          <div
            className="absolute top-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300"
            style={{
              width: '20%',
              right: `${navItems.findIndex(item => item.id === currentScreen) * 20}%`
            }}
          ></div>
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
                className={`flex flex-col items-center gap-2 transition-all relative ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                  }`}
              >
                <div className={`p-3 rounded-2xl transition-all ${isActive
                    ? 'bg-green-400/20 shadow-lg shadow-green-400/30'
                    : 'bg-transparent hover:bg-white/5'
                  }`}>
                  <Icon
                    size={24}
                    className={`transition-all ${isActive ? 'text-green-400' : 'text-white/50'
                      }`}
                  />
                </div>
                <span className={`text-xs font-bold transition-all ${isActive ? 'text-green-400' : 'text-white/40'
                  }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const PlaceholderScreen = ({ icon: Icon, title }) => (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="text-center relative z-10 animate-fadeIn">
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/50 animate-float">
          <Icon className="text-black" size={64} />
        </div>
        <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{title}</h2>
        <p className="text-white/50 text-xl mb-8">בקרוב...</p>
        <div className="inline-flex items-center gap-2 text-green-400 font-bold">
          <Sparkles size={20} />
          <span>תכונה בפיתוח</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased" dir="rtl">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'business' && <BusinessScreen />}
      {currentScreen === 'qr' && <QRScreen />}
      {currentScreen === 'map' && <PlaceholderScreen icon={MapPin} title="מפת העסקים" />}
      {currentScreen === 'messages' && <PlaceholderScreen icon={MessageCircle} title="הודעות" />}
      {currentScreen === 'settings' && <SettingsScreen />}
      <NavBar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Heebo', sans-serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
