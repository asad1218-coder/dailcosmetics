import type { Product, ProductReview } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'dail-beauty-cream',
    name: 'Dail Beauty Cream (Without Steroid)',
    urduName: 'ڈیل بیوٹی کریم (بغیر اسٹیرائیڈ - نائٹ کیئر)',
    tagline: 'Revolutionary skincare solution for radiant, youthful complexion. Reduces wrinkles, dark circles & fine lines.',
    category: 'cream',
    concern: ['Radiant Glow', 'Uneven Skin Tone', 'Without Steroid', 'Dark Circles'],
    price: 350,
    originalPrice: 450,
    rating: 4.94,
    reviewCount: 620,
    badge: 'Best Seller',
    volume: '50g Export Quality Tub',
    image: '/images/dail_beauty_cream_square.jpg',
    galleryImages: [
      '/images/dail_beauty_cream_square.jpg',
      '/images/dail_beauty_cream_clear.jpg',
      '/images/dail_hero_banner_golden.jpg',
      '/images/dail_full_collection.jpg'
    ],
    description: 'Dail Beauty Cream is a revolutionary skincare solution that targets multiple concerns for a radiant and youthful complexion. While providing long-lasting hydration that penetrates deep into the skin, Dail Beauty Cream reveals a natural glow, leaving your skin looking smoother, brighter, and more even-toned. Say goodbye to dullness and imperfections, and hello to a revitalized and healthy-looking skin with Dail Beauty Cream. Crafted with a unique blend of natural ingredients and cutting-edge technology, Dail Beauty Cream provides a holistic approach to skin health, ensuring you achieve a radiant and youthful complexion.',
    benefits: [
      'Glow / Bright the Skin: Enhances skin tone and clarity for a luminous glow',
      'Reduces Wrinkles & Fine Lines: Promotes smoother and firmer skin texture',
      'Reduces Dark Circles: Fades discoloration under eyes and fatigue spots',
      'Deep Long-Lasting Hydration: Penetrates deep into skin layers to deliver lasting moisture',
      'Non-Greasy Formula: Lightweight, easily absorbed, perfect for all skin types',
      'Paraben-Free, Cruelty-Free & Strictly WITHOUT STEROIDS'
    ],
    keyIngredients: [
      { name: 'Alpha Arbutin & Kojic Acid Diplamitate', description: 'Potent botanical brightening actives that safely inhibit excess melanin without thinning skin.' },
      { name: 'Glutathione & Vitamin B3 (Niacinamide)', description: 'Master antioxidant duo that clarifies blemishes, evens tone, and fades dark circles.' },
      { name: 'Pure Vitamin E & Glycerin', description: 'Essential moisture lock that smooths fine lines and protects against UV photo-damage.' },
      { name: 'Zinc Oxide & Titanium Dioxide', description: 'Gentle mineral barrier that protects newly radiant skin from environmental stressors.' }
    ],
    howToUse: [
      'For best results, apply Dail Beauty Cream daily at night.',
      'Gently massage a small amount onto cleansed face and neck using upward circular motions until fully absorbed.',
      'Follow with your favorite sunscreen during the day to protect your skin from UV damage.'
    ],
    fullIngredients: 'Distilled Water, PG, Glycerin, Vaseline, Croda Wax, B Wax, Stearic Acid, Cetyl Alcohol, Salicylic Acid, Alpha Arbutin, Alan Tien EDTA, Zinc Oxide Titanium Dioxide, Kojic Acid Diplamitate, Glutathione, Vitamin B3, Vitamin E, MP, PP.',
    inStock: true,
    modelType: 'jar'
  },
  {
    id: 'dail-premium-herbal-hair-oil',
    name: 'Dail Premium Herbal Hair Oil (100% Natural)',
    urduName: 'ڈیل پریمیم ہربل ہیئر آئل (100٪ خالص قدرتی جڑی بوٹیاں)',
    tagline: 'Unique blend of natural oils and mixed herbs designed to stop acute hair loss, strengthen weak strands, and promote hair growth.',
    category: 'hair-care',
    concern: ['Hair Fall', 'Follicle Regrowth', 'Hair Thinning'],
    price: 999,
    originalPrice: 1299,
    rating: 4.98,
    reviewCount: 780,
    badge: '100% Organic',
    volume: '120 ml / 4.0 fl oz',
    image: '/images/dail_hair_oil_square.jpg',
    galleryImages: [
      '/images/dail_hair_oil_square.jpg',
      '/images/dail_hair_oil_hero.jpg',
      '/images/dail_full_collection.jpg',
      '/images/dail_hero_banner_golden.jpg'
    ],
    description: 'Introducing our premium Herbal Hair Oil, a unique blend of natural oils and mixed herbs designed to nourish and revitalize your hair. Crafted with care, this powerful formula combines the goodness of nature to address common hair problems like hair loss, weak strands, and thinning hair. Experience the rejuvenating benefits of our Herbal Hair Oil and enjoy healthier, stronger, and more lustrous locks. Made with 100% natural ingredients, free from cheap mineral filler oils and harmful chemicals.',
    benefits: [
      'Reduces Hair Fall: Helps reduce hair loss, giving you thicker and fuller hair',
      'Promotes Hair Growth: Herbs improve blood flow to your scalp, helping new hair to grow',
      'Strengthens Hair: Natural oils make hair roots stronger, preventing breakage',
      'Nourishes Scalp: Keeps your scalp healthy and hydrated, vital for growth',
      'Improves Hair Texture: Makes hair softer, shinier, and easier to manage',
      '100% Natural Ingredients: Safe for all hair types and sensitive scalps'
    ],
    keyIngredients: [
      { name: 'Rosemary Oil & Lavender Oil', description: 'Potent essential oils that stimulate micro-circulation in roots and awaken dormant follicles.' },
      { name: 'Amla Oil & Bhringraj Oil', description: 'Ancient botanical kings of hair growth that fortify keratin and prevent premature greying.' },
      { name: 'Coconut Oil & Jojoba Oil', description: 'Deeply nourishing natural carrier oils that seal moisture into brittle strands.' },
      { name: 'Methi, Fenugreek & Soapnut (Reetha)', description: 'Rich herbal protein blend that stops hair shedding and purifies scalp from buildup.' }
    ],
    howToUse: [
      'Rub the oil into your scalp with circular motions. This helps improve blood flow and spreads the oil evenly.',
      'Leave it on for 6 to 12 hours overnight for intensive nourishment.',
      'In the morning, wash your hair with your regular shampoo.',
      'For best results, use thrice a week.'
    ],
    fullIngredients: 'Coconut Oil, Amla Oil, Jojoba Oil, Lavender Oil, Neem Oil, Rosemary Oil, Methi, Bhringraj Oil, Fenugreek, Soapnut and other Essential Oils and many Herbs.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-hand-and-foot-whitening-cream',
    name: 'Dail Hand & Foot Whitening Cream (Without Steroid)',
    urduName: 'ڈیل ہینڈ اینڈ فٹ وائٹننگ کریم (3-ایکشن ریپیئر)',
    tagline: 'Export Quality 3-Action Repair (Moisturizing, Multi-Effect, Repair) for dry, tanned, and rough hands and feet.',
    category: 'cream',
    concern: ['Deep Moisture', 'Radiant Glow', 'Uneven Skin Tone', 'Dark Knuckles & Heels'],
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 410,
    badge: '3-Action Repair',
    volume: '3-Action Repair Jar',
    image: '/images/dail_hand_foot_square.jpg',
    galleryImages: [
      '/images/dail_hand_foot_square.jpg',
      '/images/dail_hand_foot_clear.jpg',
      '/images/dail_full_collection.jpg'
    ],
    description: 'Specifically crafted for the rougher skin of hands and feet that endure hard water, sun exposure, and daily chores. Dail Hand & Foot Whitening Cream works through a 3-Action system: deep cellular moisturizing, multi-effect brightening, and barrier repair—all strictly without steroids. Softens dark knuckles, cracked heels, and sun-tanned feet within days.',
    benefits: [
      'Strictly Formulated WITHOUT STEROIDS — Safe and sustainable brightening',
      '3-Action Formula: Deep Moisturization, Multi-Effect Brightening, Barrier Repair',
      'Softens dark knuckles, cracked heels, and stubborn shoe-bite marks',
      'Fast absorbing and non-greasy finish'
    ],
    keyIngredients: [
      { name: 'Shea & Cocoa Butter', description: 'Rich natural plant emollients that seal in hydration on thick cuticle and heel skin.' },
      { name: 'Urea & Lactic Acid', description: 'Gently dissolves dead hardened skin cells for a velvety soft touch.' },
      { name: 'Pure Vitamin E & Niacinamide', description: 'Restores natural barrier and evens out tanned knuckles.' }
    ],
    howToUse: [
      'Cleanse hands and feet thoroughly.',
      'Apply generously to knuckles, heels, and tanned areas.',
      'Massage until completely absorbed. Best applied at bedtime for overnight intensive hydration.'
    ],
    fullIngredients: 'Purified Aqua, Butyrospermum Parkii (Shea Butter), Cocoa Seed Butter, Glycerin, Lactic Acid, Urea, Niacinamide, Rose Damascena Distillate, Allantoin, Glyceryl Stearate, Tocopherol.',
    inStock: true,
    modelType: 'jar'
  },
  {
    id: 'dail-glowing-duo-bundle',
    name: 'Dail Daily Beauty Cream + Herbal Hair Oil Duo',
    urduName: 'ڈیل بیوٹی کریم + ہربل ہیئر آئل کومبو ڈیل',
    tagline: 'Our 2 flagship organic essentials together: Dail Beauty Cream (PKR 350) + Premium Herbal Hair Oil 120ml (PKR 999).',
    category: 'bundles',
    concern: ['Hair Fall', 'Radiant Glow', 'Without Steroid'],
    price: 1199,
    originalPrice: 1449,
    rating: 4.97,
    reviewCount: 520,
    badge: 'Value Pack',
    volume: 'Beauty Cream 50g + Hair Oil 120ml',
    image: '/images/dail_full_collection.jpg',
    galleryImages: [
      '/images/dail_full_collection.jpg',
      '/images/dail_hair_oil_square.jpg',
      '/images/dail_beauty_cream_square.jpg',
      '/images/dail_hero_banner_golden.jpg'
    ],
    description: 'The ultimate daily essential combination: Dail Beauty Cream for smooth, glowing skin without steroids + Dail Premium Herbal Hair Oil (120ml) to stop hair loss and boost healthy growth. Save Rs. 250 with this special duo deal.',
    benefits: [
      'Includes full size Dail Beauty Cream + 120ml Herbal Hair Oil',
      'Complete face and hair revitalizing daily routine',
      'Special discounted bundle price of PKR 1,199',
      'Available with Cash On Delivery nationwide'
    ],
    keyIngredients: [
      { name: 'Dail Beauty Cream (50g)', description: 'Glutathione, Alpha Arbutin, Kojic Acid, Vitamin B3 & E.' },
      { name: 'Dail Herbal Hair Oil (120ml)', description: 'Rosemary, Coconut, Jojoba, Lavender, Neem, Amla, Methi, Bhringraj Oils.' }
    ],
    howToUse: [
      'Apply Dail Beauty Cream nightly onto face and neck.',
      'Massage Dail Herbal Hair Oil into scalp 3 nights a week and wash in the morning.'
    ],
    fullIngredients: 'See individual product listings for complete ingredient profiles.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-complete-trio-set',
    name: 'Dail Complete 3-in-1 Regimen Box (Oil + Face Cream + Hand & Foot)',
    urduName: 'ڈیل مکمل 3-ان-1 ہیئر اینڈ سکن ریجیمن سیٹ',
    tagline: 'The full Export Quality trio: 100% Herbal Hair Oil (120ml) + Dail Beauty Cream + Hand & Foot Whitening Cream.',
    category: 'bundles',
    concern: ['Hair Fall', 'Radiant Glow', 'Deep Moisture', 'Complete Care'],
    price: 1499,
    originalPrice: 1799,
    rating: 5.0,
    reviewCount: 890,
    badge: 'Best Seller',
    volume: 'Complete Trio (120ml Oil + Beauty Cream + Hand & Foot Cream)',
    image: '/images/dail_hero_banner_golden.jpg',
    galleryImages: [
      '/images/dail_hero_banner_golden.jpg',
      '/images/dail_full_collection.jpg',
      '/images/dail_trio_clear.jpg',
      '/images/dail_hair_oil_square.jpg',
      '/images/dail_beauty_cream_square.jpg',
      '/images/dail_hand_foot_square.jpg'
    ],
    description: 'Our most in-demand complete set! Get all 3 signature Dail Cosmetics formulations in one complete package: the 100% Natural Herbal Hair Oil (120ml), the steroid-free Dail Beauty Cream, and the Hand & Foot 3-Action Whitening Cream. Factory sealed with signature golden lid seals. Free nationwide delivery on orders above Rs. 2,000.',
    benefits: [
      'Includes all 3 full-size Dail Cosmetics export-quality formulations',
      'Special bundle savings with Cash On Delivery anywhere in Pakistan',
      'Complete head-to-toe steroid-free organic beauty routine',
      'Tamper-proof export packaging'
    ],
    keyIngredients: [
      { name: 'Dail Herbal Hair Oil (120ml)', description: 'Rosemary, Amla, Jojoba, Lavender, Neem, Methi & Coconut oil blend.' },
      { name: 'Dail Beauty Cream (50g)', description: 'Glutathione, Alpha Arbutin, Kojic Acid, Vitamin B3, Vitamin E.' },
      { name: 'Dail Hand & Foot Cream', description: 'Shea butter, urea, lactic acid & niacinamide 3-action formula.' }
    ],
    howToUse: [
      'Night: Cleanse and apply light layer of Dail Beauty Cream to face.',
      'Bedtime: Apply Dail Hand & Foot Cream to knuckles and heels.',
      'Hair Care: Massage Dail Herbal Hair Oil into scalp 3 nights a week, leave for 6-12 hours.'
    ],
    fullIngredients: 'See individual product listings for complete ingredient profiles.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-family-pack',
    name: 'Dail Family Double Glow & Hair Regrowth Pack',
    urduName: 'ڈیل فیملی پیک (2x ہیئر آئل + 2x بیوٹی کریم)',
    tagline: 'Double your supply with FREE Delivery nationwide: 2x Herbal Hair Oils (120ml) + 2x Dail Beauty Creams.',
    category: 'bundles',
    concern: ['Hair Fall', 'Radiant Glow', 'Complete Care'],
    price: 2399,
    originalPrice: 2899,
    rating: 4.99,
    reviewCount: 340,
    badge: 'Free Shipping',
    volume: '2x Hair Oils (240ml total) + 2x Beauty Creams (100g total)',
    image: '/images/dail_hero_banner_golden.jpg',
    galleryImages: [
      '/images/dail_hero_banner_golden.jpg',
      '/images/dail_full_collection.jpg',
      '/images/dail_hair_oil_square.jpg',
      '/images/dail_beauty_cream_square.jpg'
    ],
    description: 'Specially created for families and multi-month supply. Receive 2 full-size 120ml bottles of Dail Premium Herbal Hair Oil plus 2 tubs of Dail Beauty Cream. Automatically qualifies for FREE EXPRESS DELIVERY across Pakistan.',
    benefits: [
      'Double supply (2x Hair Oils + 2x Beauty Creams)',
      'FREE nationwide delivery via TCS / Trax Express',
      'Save Rs. 500 over individual purchases',
      'Cash on Delivery available nationwide'
    ],
    keyIngredients: [
      { name: '2x Dail Herbal Hair Oils (120ml)', description: 'Full organic Rosemary, Kalonji & Amla infusion.' },
      { name: '2x Dail Beauty Creams (50g)', description: 'Glutathione, Alpha Arbutin, Kojic Acid & Vitamin B3.' }
    ],
    howToUse: [
      'Use daily for a comprehensive 2-month organic beauty & hair revitalizing routine.'
    ],
    fullIngredients: 'See individual product listings for complete ingredient profiles.',
    inStock: true,
    modelType: 'bottle'
  }
];

export const REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Ayesha Tariq',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '2 days ago',
    verified: true,
    comment: 'Dail Beauty Cream sirf PKR 350 mein itni zabardast quality hai! Meri skin par koi redness nahi aayi, natural glow aa gaya. Aur Dail Herbal Hair Oil (PKR 999) se mera hair fall 10 din mein 90% ruk gaya. 10/10 recommendation!',
    helpfulCount: 58
  },
  {
    id: 'rev-2',
    author: 'Muhammad Hamza',
    city: 'Karachi (Gulshan-e-Iqbal)',
    rating: 5,
    date: '5 days ago',
    verified: true,
    comment: 'Packaging dekh kar hi pata chal gaya tha export quality hai. Dail Premium Herbal Hair Oil 120ml bottle is very effective. Hair texture bohat smooth ho gaya hai aur khushboo bhi natural herbal hai.',
    helpfulCount: 39
  },
  {
    id: 'rev-3',
    author: 'Dr. Maryam Khan',
    city: 'Islamabad (Sector F-10)',
    rating: 5,
    date: '1 week ago',
    verified: true,
    comment: 'As a doctor, I love that Dail Beauty Cream explicitly writes its full ingredients (Glutathione, Alpha Arbutin, Kojic Acid, Vitamin B3 & E) and is STRICTLY WITHOUT STEROID. Dail Hand & Foot cream cleared my dark knuckles naturally!',
    helpfulCount: 74
  },
  {
    id: 'rev-4',
    author: 'Zainab Bibi',
    city: 'Rawalpindi (Bahria Town)',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    comment: 'Main ne Dail Complete Trio Set mangwaya tha COD par. Trax courier se 2 din mein deliver ho gaya. Teeno products lajawab hain, especially Hand & Foot cream.',
    helpfulCount: 46
  }
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Mardan',
  'Mirpur (AJK)',
  'Gilgit',
  'Attock',
  'Bahawalnagar',
  'Bannu',
  'Batkhela',
  'Bhakkar',
  'Bhalwal',
  'Bhimber',
  'Burewala',
  'Chakwal',
  'Chaman',
  'Charsadda',
  'Chichawatni',
  'Chiniot',
  'Chishtian',
  'Dadu',
  'Daska',
  'Dera Ghazi Khan',
  'Dera Ismail Khan',
  'Dina',
  'Ferozewala',
  'Ghotki',
  'Gojra',
  'Gujar Khan',
  'Hafizabad',
  'Hangu',
  'Haripur',
  'Hasilpur',
  'Hub',
  'Jacobabad',
  'Jahanian',
  'Jalalpur Jattan',
  'Jampur',
  'Jaranwala',
  'Jhang',
  'Jhelum',
  'Kamalia',
  'Kamoke',
  'Kasur',
  'Khairpur',
  'Khanewal',
  'Khanpur',
  'Kharian',
  'Khushab',
  'Kohat',
  'Kot Addu',
  'Kotli (AJK)',
  'Layyah',
  'Liaquatpur',
  'Lodhran',
  'Mandi Bahauddin',
  'Mansehra',
  'Mian Channu',
  'Mianwali',
  'Mingora (Swat)',
  'Muzaffarabad',
  'Muzaffargarh',
  'Nankana Sahib',
  'Narang Mandi',
  'Narowal',
  'Nawabshah (Shaheed Benazirabad)',
  'Nowshera',
  'Okara',
  'Pakpattan',
  'Pasrur',
  'Pattoki',
  'Rahim Yar Khan',
  'Raiwind',
  'Rawalakot',
  'Sadiqabad',
  'Sahiwal',
  'Sambrial',
  'Samundri',
  'Shahdadpur',
  'Sheikhupura',
  'Shikarpur',
  'Shujabad',
  'Swabi',
  'Talagang',
  'Tando Adam',
  'Tando Allahyar',
  'Taxila',
  'Toba Tek Singh',
  'Vehari',
  'Wah Cantt',
  'Wazirabad',
  'Zhob'
];
