import mongoose from 'mongoose';

import dotenv from 'dotenv';

import Product from '../models/Product.js';

import path from 'path';

import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



dotenv.config({ path: path.join(__dirname, '..', '.env') });



const products = [

  {

    name: 'Tofu65 Hot-Swap Kit',

    slug: 'tofu65-hot-swap-kit',

    description: 'The Tofu65 represents the pinnacle of entry-level enthusiast kits. CNC-machined 6063 aluminum case with a sandblasted matte finish and subtle 6-degree typing angle. Features hot-swap PCB supporting 5-pin switches, silicone dampening foam, and IXPE switch pad for that coveted "thocky" acoustic profile. Includes brass weight with laser-etched Alpha Keys logo. Compatible with QMK/VIA firmware out of the box.',

    shortDescription: '65% aluminum hot-swap kit with QMK/VIA support and premium acoustics.',

    price: 149.00,

    category: 'Keyboard Kits',

    images: [

      { url: '/images/products/tofu65hotswapkit.jpg', alt: 'Tofu65 Keyboard Kit' },

      { url: '/images/products/tofu65hotswapkit.jpg', alt: 'Tofu65 Side View' }

    ],

    stock: 24,

    featured: true,

    specifications: {

      'Layout': '65% (68 keys)',

      'Case Material': '6063 Aluminum',

      'Mount': 'Gasket',

      'PCB': 'Hot-swap, QMK/VIA',

      'Weight': '1.2kg'

    },

    tags: ['aluminum', 'hot-swap', '65%', 'qmk', 'entry-level']

  },

  {

    name: 'Oblivion PBT Keycap Set',

    slug: 'oblivion-pbt-keycap-set',

    description: 'Double-shot PBT keycaps in the iconic Oblivion colorway. Dark gray base with crisp white legends that will never fade or shine. Cherry profile for familiar ergonomics with a sculpted feel. Full 144-key set covers 60%, 65%, TKL, and full-size layouts including ISO support. Thick 1.5mm PBT plastic provides deep, muted acoustics compared to ABS alternatives.',

    shortDescription: 'Premium double-shot PBT keycaps in dark gray with white legends.',

    price: 89.00,

    category: 'Keycaps',

    images: [

      { url: '/images/products/oblivionpbtkeycapset.jpg', alt: 'Oblivion PBT Keycaps' }

    ],

    stock: 45,

    featured: true,

    specifications: {

      'Material': 'Double-shot PBT',

      'Profile': 'Cherry',

      'Legend': 'White',

      'Keys': '144'

    },

    tags: ['pbt', 'cherry-profile', 'doubleshot', 'dark']

  },

  {

    name: 'Gateron Oil King Switches (Pack of 10)',

    slug: 'gateron-oil-king-switches',

    description: 'Factory-lubed linear switches that set the standard for smooth keystrokes out of the box. Magnetic ink black bottom housing with proprietary stem design reduces wobble. Self-lubricating nylon top housing paired with Gateron\'s signature "milky" bottom creates a satisfying deep sound profile. 55g operating force with 22mm travel distance. Pre-lubed with Krytox 205g0 on rails and spring.',

    shortDescription: 'Ultra-smooth factory-lubed linear switches with minimal stem wobble.',

    price: 35.00,

    category: 'Switches',

    images: [

      { url: '/images/products/gateronoilkingswitchespackof10.jpg', alt: 'Gateron Oil King Switches' }

    ],

    stock: 120,

    featured: false,

    specifications: {

      'Type': 'Linear',

      'Force': '55g',

      'Travel': '22mm',

      'Lube': 'Krytox 205g0',

      'Stem': 'POM'

    },

    tags: ['linear', 'lubed', 'gateron']

  },

  {

    name: 'Artisan Coiled Cable (Aviator)',

    slug: 'artisan-coiled-cable-aviator',

    description: 'Hand-coiled USB-C cable with premium metal aviator connector for quick disconnect. Double-sleeved with flexible PET braiding over a paracord core. Custom-tuned coil memory ensures perfect retraction every time. Gold-plated USB-A to USB-C connections. 4ft uncoiled length, 2ft coiled section. The aviator connector allows swapping cables without unplugging from your PC.',

    shortDescription: 'Premium coiled cable with metal aviator quick-disconnect.',

    price: 58.00,

    category: 'Cables',

    images: [

      { url: '/images/products/artisancoiledcableaviator.jpg', alt: 'Artisan Coiled Cable' }

    ],

    stock: 32,

    featured: false,

    specifications: {

      'Length': '4ft uncoiled / 2ft coiled',

      'Connector': 'USB-A to USB-C',

      'Material': 'PET braided / Paracord',

      'Aviator': 'Metal GX12'

    },

    tags: ['cable', 'coiled', 'aviator', 'usb-c']

  },

  {

    name: 'Wool Felt Desk Mat (900x400)',

    slug: 'wool-felt-desk-mat',

    description: '5mm thick premium wool felt desk pad providing superior wrist comfort and acoustic dampening. Naturally water-resistant and antimicrobial. Charcoal gray colorway complements any setup. Anti-slip rubber backing keeps the mat firmly in place during intense typing sessions. Edge stitching prevents fraying over years of use.',

    shortDescription: '5mm premium wool felt desk pad with anti-slip backing.',

    price: 42.00,

    category: 'Desk Mats',

    images: [

      { url: '/images/products/woolfeltdeskmat900x400.jpg', alt: 'Wool Felt Desk Mat' }

    ],

    stock: 67,

    featured: true,

    specifications: {

      'Size': '900 x 400mm',

      'Thickness': '5mm',

      'Material': 'Wool Felt',

      'Base': 'Anti-slip rubber'

    },

    tags: ['desk-mat', 'wool', 'ergonomic']

  },

  {

    name: 'KBD67 MKII Lite R3 Kit',

    slug: 'kbd67-mkii-lite-r3-kit',

    description: 'The quintessential entry-level enthusiast kit, now in its third revision. Polycarbonate case with frosted translucent finish creates beautiful RGB diffusion. Gasket-mounted plate design delivers flexible, bouncy typing feel. Hot-swap PCB with per-key RGB, ESD protection, and VIA support. Includes foam dampening kit and plate stabilizer pads.',

    shortDescription: 'Polycarbonate 65% kit with gasket mount and RGB diffusion.',

    price: 95.00,

    category: 'Keyboard Kits',

    images: [

      { url: '/images/products/kbd67mkiiliter3kit.jpg', alt: 'KBD67 MKII Lite R3' }

    ],

    stock: 18,

    featured: false,

    specifications: {

      'Layout': '65%',

      'Case': 'Polycarbonate',

      'Mount': 'Gasket',

      'PCB': 'Hot-swap RGB'

    },

    tags: ['polycarbonate', 'rgb', '65%', 'gasket']

  },

  {

    name: 'GMK Botanical Keycap Set',

    slug: 'gmk-botanical-keycap-set',

    description: 'Authentic GMK doubleshot keycaps in the beloved Botanical colorway. Cherry profile with thick 1.5mm ABS plastic. Deep olive green base with cream-colored legends inspired by vintage botanical illustrations. 161-key base kit covers most modern layouts including split spacebar and ANSI/ISO enter keys. Made in Germany to exacting GMK quality standards.',

    shortDescription: 'Authentic GMK doubleshot ABS keycaps in olive green/cream.',

    price: 135.00,

    category: 'Keycaps',

    images: [

      { url: '/images/products/gmkbotanicalkeycapset.jpg', alt: 'GMK Botanical Keycaps' }

    ],

    stock: 12,

    featured: true,

    specifications: {

      'Material': 'Doubleshot ABS',

      'Profile': 'Cherry',

      'Keys': '161',

      'Origin': 'Germany'

    },

    tags: ['gmk', 'abs', 'cherry-profile', 'premium']

  },

  {

    name: 'Durock V2 Stabilizers (Screw-In)',

    slug: 'durock-v2-stabilizers-screw-in',

    description: 'Industry-standard screw-in stabilizers with gold-plated stems and smoke-clear housings. Significantly reduced rattle compared to plate-mount alternatives. Gold-plated stems provide smooth, consistent feel across the full keystroke. Includes 2x 6u, 4x 2u, 2x 6.25u sizes for complete keyboard coverage. Compatible with most PCBs featuring screw-in mounting points.',

    shortDescription: 'Premium screw-in stabilizers with gold-plated stems.',

    price: 18.00,

    category: 'Stabilizers',

    images: [

      { url: '/images/products/durockv2stabilizersscrewin.jpg', alt: 'Durock V2 Stabilizers' }

    ],

    stock: 89,

    featured: false,

    specifications: {

      'Type': 'Screw-in PCB mount',

      'Stem': 'Gold-plated',

      'Housing': 'Smoke-clear'

    },

    tags: ['stabilizers', 'screw-in', 'durock']

  },

  {

    name: 'Aluminum Artisan Keycap (Single)',

    slug: 'aluminum-artisan-keycap-single',

    description: 'CNC-machined aluminum artisan keycap with anodized finish. Fits Cherry MX-style switches as a single accent piece on your escape key or enter. Sandblasted texture provides tactile grip while the weight adds satisfying heft to each press. Available in molten copper finish to match the Alpha Keys aesthetic.',

    shortDescription: 'CNC aluminum artisan keycap with anodized copper finish.',

    price: 28.00,

    category: 'Accessories',

    images: [

      { url: '/images/products/aluminumartisankeycapsingle.jpg', alt: 'Aluminum Artisan Keycap' }

    ],

    stock: 45,

    featured: false,

    specifications: {

      'Material': 'CNC Aluminum',

      'Finish': 'Anodized Copper',

      'Compatibility': 'Cherry MX'

    },

    tags: ['artisan', 'aluminum', 'single-keycap']

  },

  {

    name: 'Holy Panda Switches (Pack of 10)',

    slug: 'holy-panda-switches',

    description: 'The legendary tactile switch that started a revolution. Drop Panda stem into Halo housing creates an incredibly sharp, pronounced tactile bump at the top of the keystroke. 67g peak force with immediate feedback. These switches require break-in but reward users with unparalleled typing precision. Unlubed to preserve maximum tactile feel.',

    shortDescription: 'Legendary sharp tactile switches with pronounced bump.',

    price: 42.00,

    category: 'Switches',

    images: [

      { url: '/images/products/holypandaswitchespackof10.jpg', alt: 'Holy Panda Switches' }

    ],

    stock: 56,

    featured: true,

    specifications: {

      'Type': 'Tactile',

      'Force': '67g peak',

      'Stem': 'Panda',

      'Housing': 'Halo Clear'

    },

    tags: ['tactile', 'holy-panda', 'legendary']

  },

  {

    name: 'Minimalist Wrist Rest (Walnut)',

    slug: 'minimalist-wrist-rest-walnut',

    description: 'Solid American black walnut wrist rest with hand-rubbed oil finish. Ergonomically contoured to match keyboard height. Cork base prevents sliding and protects desk surface. Natural wood grain means each piece is unique. Designed for 65% keyboards but available in multiple lengths. The warmth of wood provides comfort during marathon typing sessions.',

    shortDescription: 'Solid walnut wrist rest with cork base.',

    price: 65.00,

    category: 'Accessories',

    images: [

      { url: '/images/products/minimalistwristrestwalnut.jpg', alt: 'Walnut Wrist Rest' }

    ],

    stock: 28,

    featured: false,

    specifications: {

      'Material': 'American Black Walnut',

      'Base': 'Cork',

      'Finish': 'Hand-rubbed oil'

    },

    tags: ['wrist-rest', 'walnut', 'ergonomic']

  },

  {

    name: 'SA Profile Retrocast Keycaps',

    slug: 'sa-profile-retrocast-keycaps',

    description: 'Tall, sculpted SA profile keycaps in the Retrocast colorway. Deep purple base with mint green and cream accent legends inspired by 80s retro computing. Thick PBT construction with dye-sublimated legends that will never fade. The high sculpted profile creates an ergonomic typing angle reminiscent of vintage terminals. 138-key base kit covers most layouts.',

    shortDescription: 'Tall SA profile PBT keycaps in retro 80s colorway.',

    price: 115.00,

    category: 'Keycaps',

    images: [

      { url: '/images/products/saprofileretrocastkeycaps.jpg', alt: 'SA Retrocast Keycaps' }

    ],

    stock: 22,

    featured: false,

    specifications: {

      'Material': 'Dye-sub PBT',

      'Profile': 'SA (High Sculpted)',

      'Keys': '138'

    },

    tags: ['sa-profile', 'pbt', 'retro', 'vintage']

  },

  {

    name: 'Laser-Cut Acrylic Switch Display',

    slug: 'laser-cut-acrylic-switch-display',

    description: 'Showcase your switch collection in this laser-cut acrylic display stand. Holds 35 switches in a grid layout with individual slots. Clear acrylic construction with frosted edges for premium look. Includes removable backplate for easy switch insertion. Perfect for switch sampling or showing off your favorite artisan caps. Stackable design allows building a complete collection display.',

    shortDescription: 'Clear acrylic display stand for 35 switches.',

    price: 32.00,

    category: 'Accessories',

    images: [

      { url: '/images/products/lasercutacrylicswitchdisplay.jpg', alt: 'Acrylic Switch Display' }

    ],

    stock: 41,

    featured: false,

    specifications: {

      'Material': 'Laser-cut Acrylic',

      'Capacity': '35 switches',

      'Stackable': 'Yes'

    },

    tags: ['display', 'acrylic', 'switch-holder']

  },

  {

    name: 'Custom Lube Station Kit',

    slug: 'custom-lube-station-kit',

    description: 'Everything you need to hand-lube switches and stabilizers. Includes 3D-printed switch opener, stem holder, lube brush, and precision tweezers. Comes with 5g of Krytox 205g0 (for linears) and 5g of Krytox 105 (for springs). Magnetic base keeps tools organized. The essential upgrade for enthusiasts seeking to optimize their keyboard feel and sound.',

    shortDescription: 'Complete switch lubing kit with tools and lubricants.',

    price: 75.00,

    category: 'Accessories',

    images: [

      { url: '/images/products/customlubestationkit.jpg', alt: 'Lube Station Kit' }

    ],

    stock: 19,

    featured: false,

    specifications: {

      'Includes': 'Switch opener, stem holder, brushes, tweezers',

      'Lubricant': 'Krytox 205g0 + 105'

    },

    tags: ['lube-kit', 'tools', 'enthusiast']

  }

];



const seedProducts = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');



    await Product.deleteMany({});

    console.log('🗑️  Cleared existing products');



    const seeded = await Product.insertMany(products);

    console.log(`🌱 Seeded ${seeded.length} products successfully`);

    

    process.exit(0);

  } catch (error) {

    console.error('❌ Seed Error:', error.message);

    process.exit(1);

  }

};



seedProducts();
