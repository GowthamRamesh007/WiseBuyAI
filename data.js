// WiseBuy AI Product Catalog Data

// Global formatting helper for Indian pricing conventions
function formatPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });
}

const PRODUCTS = [
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14\" M3 Pro",
    brand: "Apple",
    category: "Laptop",
    price: 169900,
    rating: 4.8,
    reviewsCount: 1420,
    availability: "In Stock",
    features: ["Apple M3 Pro Chip", "14.2\" Liquid Retina XDR", "18GB Unified Memory", "512GB SSD", "Up to 18h Battery Life", "Thunderbolt 4 Ports"],
    pros: ["Exceptional battery efficiency", "Unmatched display brightness & contrast", "Silent operation even under load", "Premium aluminum build quality"],
    cons: ["Not upgradeable after purchase", "Expensive entry and storage upgrades", "Limited port variety without adapters"],
    sources: [
      { name: "Amazon", price: 164900, link: "#", status: "In Stock" },
      { name: "Croma", price: 169900, link: "#", status: "In Stock" },
      { name: "Reliance Digital", price: 162900, link: "#", status: "Low Stock" }
    ],
    specs: {
      "Processor": "Apple M3 Pro (11-core CPU, 14-core GPU)",
      "Memory": "18GB Unified Memory",
      "Storage": "512GB NVMe SSD",
      "Display": "14.2\" Liquid Retina XDR (3024 x 1964), 120Hz Mini-LED",
      "Battery Life": "Up to 18 hours (72.4 Wh)",
      "Weight": "3.5 lbs (1.61 kg)",
      "Operating System": "macOS Sonoma",
      "Ports": "3x Thunderbolt 4 (USB-C), 1x HDMI, 1x SDXC Card Slot, MagSafe 3"
    },
    aiScore: 9.6,
    confidence: 98,
    svgType: "laptop",
    summary: "The MacBook Pro 14\" M3 Pro is an absolute powerhouse for creatives and software developers. Its power efficiency ensures it leads the market in battery endurance, while the Liquid Retina XDR display delivers class-leading color accuracy. It represents a premium investment with high longevity."
  },
  {
    id: "dell-xps-14",
    name: "Dell XPS 14 9440",
    brand: "Dell",
    category: "Laptop",
    price: 159900,
    rating: 4.5,
    reviewsCount: 840,
    availability: "In Stock",
    features: ["Intel Core Ultra 7", "14.5\" InfinityEdge FHD+", "16GB LPDDR5X RAM", "512GB SSD", "Intel Arc Graphics", "Glass Touchpad"],
    pros: ["Stunning modern design with borderless display", "Seamless glass haptic touchpad", "Excellent front-firing speakers", "Intel AI Boost NPU integrated"],
    cons: ["Only USB-C ports (requires dongles)", "Keyboard flat keys have learning curve", "Battery life is average under heavy load"],
    sources: [
      { name: "Amazon", price: 154900, link: "#", status: "In Stock" },
      { name: "Croma", price: 159900, link: "#", status: "In Stock" },
      { name: "Dell Store", price: 149900, link: "#", status: "In Stock" }
    ],
    specs: {
      "Processor": "Intel Core Ultra 7 155H (16-core, up to 4.8 GHz)",
      "Memory": "16GB LPDDR5X (Dual Channel)",
      "Storage": "512GB PCIe Gen4 SSD",
      "Display": "14.5\" InfinityEdge (1920 x 1200) IPS, 120Hz, Non-Touch",
      "Battery Life": "Up to 10 hours (69.5 Wh)",
      "Weight": "3.7 lbs (1.68 kg)",
      "Operating System": "Windows 11 Home",
      "Ports": "3x Thunderbolt 4 (USB-C), MicroSD Card Reader, 3.5mm Headphone Jack"
    },
    aiScore: 8.9,
    confidence: 94,
    svgType: "laptop",
    summary: "Dell's XPS 14 introduces a futuristic design language with its haptic glass trackpad and flat function row. It serves as an excellent Windows-based workhorse for professionals who value minimalist aesthetics, bright displays, and dedicated AI acceleration."
  },
  {
    id: "lenovo-thinkpad-x1",
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    category: "Laptop",
    price: 179900,
    rating: 4.6,
    reviewsCount: 920,
    availability: "In Stock",
    features: ["Intel Core Ultra 7", "14.0\" WUXGA IPS", "32GB RAM", "1TB SSD", "Carbon Fiber Chassis", "Classic TrackPoint"],
    pros: ["Legendary typing comfort & keyboard", "Extremely lightweight carbon fiber chassis", "Ample port selection including USB-A and HDMI", "Superior enterprise security features"],
    cons: ["Integrated graphics not suitable for gaming", "Design looks very traditional", "High initial retail pricing"],
    sources: [
      { name: "Lenovo Store", price: 174900, link: "#", status: "In Stock" },
      { name: "Amazon", price: 179900, link: "#", status: "In Stock" },
      { name: "Reliance Digital", price: 169900, link: "#", status: "Low Stock" }
    ],
    specs: {
      "Processor": "Intel Core Ultra 7 155U (12-core, up to 4.8 GHz)",
      "Memory": "32GB LPDDR5X (Soldered)",
      "Storage": "1TB PCIe Gen4 NVMe SSD",
      "Display": "14.0\" WUXGA (1920 x 1200) Anti-Glare, 400 nits, 60Hz",
      "Battery Life": "Up to 12 hours (57 Wh)",
      "Weight": "2.4 lbs (1.09 kg)",
      "Operating System": "Windows 11 Pro",
      "Ports": "2x Thunderbolt 4, 2x USB-A 3.2, 1x HDMI 2.1, 3.5mm Headphone Jack"
    },
    aiScore: 9.2,
    confidence: 96,
    svgType: "laptop",
    summary: "The Lenovo ThinkPad X1 Carbon Gen 12 is the ultimate laptop for business professionals, executives, and writers. Weighing just 2.4 lbs while retaining a full suite of traditional ports and the absolute best keyboard on any laptop, it excels in productivity, security, and travel comfort."
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphone",
    price: 144900,
    rating: 4.8,
    reviewsCount: 3820,
    availability: "In Stock",
    features: ["A17 Pro Chip", "6.7\" Super Retina XDR OLED", "5x Telephoto Optical Zoom", "Titanium Frame", "USB-C Port", "Action Button"],
    pros: ["Outstanding triple camera with 5x telephoto", "A17 Pro console-level gaming capability", "Lightweight and durable titanium design", "Excellent battery longevity"],
    cons: ["Very slow charging speeds (27W max)", "High price point starting at 256GB only", "iOS customization is still somewhat restricted"],
    sources: [
      { name: "Apple Store", price: 144900, link: "#", status: "In Stock" },
      { name: "Croma", price: 144900, link: "#", status: "In Stock" },
      { name: "Amazon", price: 139900, link: "#", status: "Low Stock" }
    ],
    specs: {
      "Processor": "Apple A17 Pro (6-core GPU, 6-core CPU)",
      "Memory": "8GB RAM",
      "Storage": "256GB / 512GB / 1TB NVMe",
      "Display": "6.7\" OLED (2796 x 1290), Super Retina XDR, 120Hz ProMotion",
      "Battery Life": "Up to 29 hours video playback (4441 mAh)",
      "Weight": "0.49 lbs (221 g)",
      "Operating System": "iOS 17",
      "Ports": "USB-C 3.0 (up to 10Gb/s)"
    },
    aiScore: 9.7,
    confidence: 99,
    svgType: "phone",
    summary: "Apple's flagship iPhone 15 Pro Max is the premier smartphone choice for mobile video creators, photographers, and heavy users. The new lightweight titanium band dramatically improves ergonomics, and the A17 Pro chip sets a new standard for graphics processing."
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphone",
    price: 129900,
    rating: 4.7,
    reviewsCount: 2950,
    availability: "In Stock",
    features: ["Snapdragon 8 Gen 3", "6.8\" Dynamic AMOLED 2X", "S Pen Stylus Included", "200MP Main Camera", "Galaxy AI suite", "Titanium Frame"],
    pros: ["Incredibly versatile quad camera with 200MP sensor", "Brightest flat screen with anti-reflective glass", "Integrated S Pen stylus expands productivity", "7 years of guaranteed OS updates"],
    cons: ["Bulky design with sharp square corners", "Shutter lag on moving subjects remains present", "Charging adapter not included in the box"],
    sources: [
      { name: "Amazon", price: 119900, link: "#", status: "In Stock" },
      { name: "Croma", price: 129900, link: "#", status: "In Stock" },
      { name: "Samsung Store", price: 124900, link: "#", status: "In Stock" }
    ],
    specs: {
      "Processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      "Memory": "12GB LPDDR5X",
      "Storage": "256GB / 512GB / 1TB UFS 4.0",
      "Display": "6.8\" Dynamic AMOLED 2X (3120 x 1440), 120Hz, Corning Armor",
      "Battery Life": "Up to 30 hours video playback (5000 mAh)",
      "Weight": "0.51 lbs (232 g)",
      "Operating System": "Android 14 with One UI 6.1",
      "Ports": "USB-C 3.2"
    },
    aiScore: 9.5,
    confidence: 97,
    svgType: "phone",
    summary: "The Samsung Galaxy S24 Ultra is a feature-packed powerhouse representing the pinnacle of Android technology. With the integrated S Pen, unmatched outdoor display visibility, and an array of useful local AI features, it is the ultimate tool for power users and multitaskers."
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Smartphone",
    price: 99900,
    rating: 4.5,
    reviewsCount: 1650,
    availability: "In Stock",
    features: ["Google Tensor G3", "6.7\" Super Actua Display", "Best-in-class AI Photo Editing", "50MP Triple Camera", "7 Years OS Support", "Temperature Sensor"],
    pros: ["Unmatched photo processing and AI magic eraser", "Cleanest Android interface with zero bloat", "Extremely bright and color-accurate flat screen", "Substantially cheaper than iPhone/Samsung equivalents"],
    cons: ["Tensor G3 runs warmer than Snapdragon chips", "Gaming framerates are slightly lower", "Charging speed is slow (30W)"],
    sources: [
      { name: "Flipkart", price: 99900, link: "#", status: "In Stock" },
      { name: "Amazon", price: 89900, link: "#", status: "In Stock" },
      { name: "Croma", price: 94900, link: "#", status: "Low Stock" }
    ],
    specs: {
      "Processor": "Google Tensor G3 (Titan M2 security)",
      "Memory": "12GB LPDDR5X",
      "Storage": "128GB / 256GB / 512GB NVMe",
      "Display": "6.7\" LTPO OLED (2992 x 1344), 1-120Hz, 2400 nits peak",
      "Battery Life": "Up to 24 hours normal usage (5050 mAh)",
      "Weight": "0.47 lbs (213 g)",
      "Operating System": "Android 14",
      "Ports": "USB-C 3.2"
    },
    aiScore: 9.1,
    confidence: 95,
    svgType: "phone",
    summary: "Google's Pixel 8 Pro is the smartest smartphone on the market. Focused heavily on software intelligence, it provides incredible photo manipulation features (Best Take, Audio Magic Eraser) and a pure Android workspace that appeals to fans of clean software design and casual photographers."
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Headphones",
    price: 29990,
    rating: 4.7,
    reviewsCount: 3120,
    availability: "In Stock",
    features: ["Industry-leading ANC", "Custom V1 Processor", "30-Hour Battery Life", "Speak-to-Chat Feature", "LDAC Hi-Res Audio", "Smart Touch Controls"],
    pros: ["Absolute best active noise cancellation available", "Feather-light and highly comfortable ear padding", "Extremely clear microphone quality for voice calls", "Customizable EQ app is robust and useful"],
    cons: ["Does not fold flat anymore (bulkier travel case)", "Material picks up finger oils easily", "Auto-NC optimizer can occasionally fluctuate"],
    sources: [
      { name: "Amazon", price: 26990, link: "#", status: "In Stock" },
      { name: "Croma", price: 29990, link: "#", status: "In Stock" },
      { name: "Reliance Digital", price: 27990, link: "#", status: "In Stock" }
    ],
    specs: {
      "Driver Size": "30mm Dome Dynamic Driver",
      "Frequency Response": "4 Hz - 40,000 Hz (LDAC 96kHz)",
      "Battery Life": "Up to 30 hours with ANC / 38 hours without",
      "Charging Time": "3-minute quick charge gives 3 hours playback",
      "Bluetooth Version": "Bluetooth 5.2 (Multipoint Connection)",
      "Weight": "0.55 lbs (250 g)",
      "Codecs Supported": "SBC, AAC, LDAC",
      "Noise Cancellation": "Dual Processors (QN1 + V1), 8 microphones"
    },
    aiScore: 9.4,
    confidence: 97,
    svgType: "headphones",
    summary: "The Sony WH-1000XM5 remains the industry gold-standard for over-ear travel headphones. Delivering elite noise suppression, balanced acoustic profile, and multi-day battery endurance, it is the perfect companion for office workers, commuters, and frequent flyers."
  },
  {
    id: "airpods-max",
    name: "Apple AirPods Max",
    brand: "Apple",
    category: "Headphones",
    price: 59900,
    rating: 4.4,
    reviewsCount: 1980,
    availability: "In Stock",
    features: ["Apple H1 Chip in each cup", "Custom Mesh Canopy", "Transparency Mode", "Spatial Audio Tracking", "Stainless Steel Frame", "Digital Crown Control"],
    pros: ["Unmatched transparency mode feels natural", "Breathtaking spatial audio head-tracking", "Luxury metal construction and premium styling", "Flawless integration with Apple ecosystem"],
    cons: ["Very heavy compared to competitor headphones", "Poorly designed smart case offers no protection", "Very expensive and charges via outdated Lightning port"],
    sources: [
      { name: "Croma", price: 59900, link: "#", status: "In Stock" },
      { name: "Amazon", price: 52900, link: "#", status: "Low Stock" },
      { name: "Apple Store", price: 59900, link: "#", status: "In Stock" }
    ],
    specs: {
      "Driver Size": "40mm Apple-designed dynamic driver",
      "Frequency Response": "8 Hz - 20,000 Hz",
      "Battery Life": "Up to 20 hours with ANC enabled",
      "Charging Time": "5-minute quick charge gives 1.5 hours playback",
      "Bluetooth Version": "Bluetooth 5.0",
      "Weight": "0.85 lbs (384 g)",
      "Codecs Supported": "SBC, AAC",
      "Noise Cancellation": "Active ANC, 9 microphones total"
    },
    aiScore: 8.5,
    confidence: 91,
    svgType: "headphones",
    summary: "Apple's AirPods Max are premium over-ear headphones aimed at audiophiles heavily invested in the Apple hardware ecosystem. Boasting standard-setting physical design, exceptional metal work, and spatial audio capability, their premium pricing is balanced by unmatched build and soundscape depth."
  },
  {
    id: "bose-qc-ultra",
    name: "Bose QuietComfort Ultra",
    brand: "Bose",
    category: "Headphones",
    price: 35900,
    rating: 4.6,
    reviewsCount: 1250,
    availability: "In Stock",
    features: ["Bose Immersive Audio", "CustomTune sound calibration", "Folding design for travel", "Ultra, Quiet & Aware Modes", "Up to 24h battery", "Soft protein leather"],
    pros: ["Superior long-session wear comfort", "Folds flat into a highly compact protective case", "Deep, satisfying low-end bass signature", "Excellent physical buttons combined with touch"],
    cons: ["Immersive Audio mode drains battery quickly", "App can be laggy during device switching", "Price premium over Sony XM5 is significant"],
    sources: [
      { name: "Amazon", price: 32900, link: "#", status: "In Stock" },
      { name: "Croma", price: 35900, link: "#", status: "In Stock" },
      { name: "Bose Store", price: 34900, link: "#", status: "In Stock" }
    ],
    specs: {
      "Driver Size": "35mm Custom Driver",
      "Frequency Response": "10 Hz - 25,000 Hz",
      "Battery Life": "Up to 24 hours (18 hours with Immersive Audio)",
      "Charging Time": "15-minute quick charge gives 2.5 hours playback",
      "Bluetooth Version": "Bluetooth 5.3 (aptX Adaptive)",
      "Weight": "0.56 lbs (252 g)",
      "Codecs Supported": "SBC, AAC, aptX Adaptive",
      "Noise Cancellation": "CustomTune active noise reduction"
    },
    aiScore: 9.2,
    confidence: 96,
    svgType: "headphones",
    summary: "Bose QuietComfort Ultra headphones focus heavily on supreme ergonomics and immersive sound. For users who prioritize a compact folding frame for travel and a soft, pressure-free headband structure, these represent the best comfort-first over-ear headphones on the market."
  },
  {
    id: "apple-watch-9",
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "Smartwatch",
    price: 41900,
    rating: 4.6,
    reviewsCount: 1120,
    availability: "In Stock",
    features: ["S9 SiP Chip", "Double Tap Gesture Control", "On-Device Siri Processing", "2000 nits Always-On Display", "ECG & Blood Oxygen Sensors", "Cycle Tracking"],
    pros: ["Flawless double-tap gesture for one-handed use", "Extremely responsive UI and fast Siri commands", "Comprehensive, FDA-cleared health sensors", "Superb haptic feedback across the OS"],
    cons: ["18-hour battery life requires daily charging", "Only works with iOS devices (zero Android compatibility)", "Design is virtually identical to previous generations"],
    sources: [
      { name: "Amazon", price: 37900, link: "#", status: "In Stock" },
      { name: "Croma", price: 41900, link: "#", status: "In Stock" },
      { name: "Apple Store", price: 41900, link: "#", status: "In Stock" }
    ],
    specs: {
      "Processor": "Apple S9 SiP (64-bit dual core)",
      "Storage": "64GB capacity",
      "Display": "Always-On Retina LTPO OLED, 2000 nits peak brightness",
      "Battery Life": "Up to 18 hours (36 hours in Low Power Mode)",
      "Water Resistance": "WR50 (50m swimproof), IP6X dust resistant",
      "Sensors": "ECG, SpO2, Heart Rate, Temperature, Accelerometer, Gyroscope",
      "Weight": "0.08 lbs (38.7 g - Aluminum 45mm)",
      "Connectivity": "GPS, Bluetooth 5.3, Wi-Fi, NFC"
    },
    aiScore: 9.3,
    confidence: 96,
    svgType: "watch",
    summary: "The Apple Watch Series 9 is the undisputed king of smartwatches for iPhone users. It integrates seamlessly into the Apple health system, and the new double-tap hand gesture offers hands-free convenience, making it the top daily companion for notifications and fitness tracking."
  },
  {
    id: "galaxy-watch-6",
    name: "Galaxy Watch 6",
    brand: "Samsung",
    category: "Smartwatch",
    price: 29999,
    rating: 4.4,
    reviewsCount: 940,
    availability: "In Stock",
    features: ["Exynos W930 Chip", "Super AMOLED Always-On Screen", "BIA Body Composition Analyzer", "Sleep Coaching System", "Rotating Bezel (Classic only)", "ECG & Heart Rate Monitor"],
    pros: ["Bright, crisp display with thinner bezel borders", "Advanced body composition analysis (muscle, fat, water)", "Outstanding sleep tracking and actionable coaching", "Affordable entry-level pricing for Android"],
    cons: ["Battery life struggles to hit two full days", "Certain advanced health features require a Samsung phone", "WearOS app library is still growing"],
    sources: [
      { name: "Amazon", price: 25999, link: "#", status: "In Stock" },
      { name: "Croma", price: 29999, link: "#", status: "In Stock" },
      { name: "Samsung Store", price: 27999, link: "#", status: "In Stock" }
    ],
    specs: {
      "Processor": "Exynos W930 (Dual-core 1.4GHz)",
      "Storage": "16GB storage / 2GB RAM",
      "Display": "Super AMOLED, Sapphire Crystal glass, Always-On",
      "Battery Life": "Up to 40 hours normal usage (300 mAh)",
      "Water Resistance": "5ATM + IP68, MIL-STD-810H certified",
      "Sensors": "BioActive Sensor (HR, ECG, BIA), Accelerometer, Barometer, Gyro",
      "Weight": "0.06 lbs (28.7 g - Aluminum 40mm)",
      "Connectivity": "GPS, Bluetooth 5.3, Wi-Fi, NFC"
    },
    aiScore: 8.8,
    confidence: 93,
    svgType: "watch",
    summary: "Samsung's Galaxy Watch 6 represents the top general smartwatch choice for Android users, especially those using Galaxy smartphones. Offering custom fitness coaching, detailed body mass metrics, and Google's dynamic WearOS app integration, it balances features and price well."
  },
  {
    id: "garmin-venu-3",
    name: "Garmin Venu 3",
    brand: "Garmin",
    category: "Smartwatch",
    price: 44990,
    rating: 4.7,
    reviewsCount: 460,
    availability: "In Stock",
    features: ["14-Day Battery Life", "AMOLED Touchscreen", "Body Battery energy monitor", "Wheelchair mode metrics", "Built-in Speaker & Mic", "Sleep Coach & Nap detection"],
    pros: ["Incredible 14-day battery endurance (no daily charging)", "Extremely accurate GPS tracking and running metrics", "Deep recovery diagnostics and sleep analysis", "Compatible with both iOS and Android natively"],
    cons: ["Watch UI feels less fluid than Apple/Samsung OS", "Limited smart app store ecosystem", "High pricing and no LTE option available"],
    sources: [
      { name: "Amazon", price: 44990, link: "#", status: "In Stock" },
      { name: "Croma", price: 44990, link: "#", status: "In Stock" },
      { name: "Garmin Store", price: 44990, link: "#", status: "In Stock" }
    ],
    specs: {
      "Processor": "Garmin proprietary low-power core",
      "Storage": "8GB storage (music capacity)",
      "Display": "1.4\" AMOLED Always-On (454 x 454), Gorilla Glass 3",
      "Battery Life": "Up to 14 days in smartwatch mode",
      "Water Resistance": "5ATM (swimproof)",
      "Sensors": "Elevate Gen 5 HR, Pulse Ox (SpO2), GPS/GLONASS, Altimeter, Compass",
      "Weight": "0.10 lbs (47 g - 45mm case)",
      "Connectivity": "GPS, Bluetooth, ANT+, Wi-Fi"
    },
    aiScore: 9.5,
    confidence: 98,
    svgType: "watch",
    summary: "The Garmin Venu 3 is the ultimate hybrid smartwatch for fitness enthusiasts and runners who also want standard smart notification features. Boasting a massive 14-day battery reserve, class-leading biometric sensors, and cross-platform compatibility, it represents a premium training choice."
  }
];

// Helper to render high-quality stylized SVG mockup based on category
function getProductSVG(type, brandColor = "var(--primary)") {
  if (type === "laptop") {
    return `
      <svg class="product-svg-mockup" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="laptopScreenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--accent-glow-primary)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--accent-glow-secondary)" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
        <!-- Screen Outer Bezel -->
        <rect x="25" y="15" width="110" height="65" rx="5" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
        <!-- Screen Glass Content -->
        <rect x="28" y="18" width="104" height="57" rx="2" fill="url(#laptopScreenGlow)" />
        <!-- Screen Highlight reflection -->
        <path d="M 28 18 L 90 18 L 28 80 Z" fill="rgba(255,255,255,0.03)" />
        <!-- Status Bar on screen -->
        <circle cx="80" cy="16.5" r="1" fill="#fff" opacity="0.4" />
        <rect x="34" y="22" width="12" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
        <rect x="114" y="22" width="12" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
        <!-- Code-like abstract graphics on screen -->
        <rect x="34" y="30" width="30" height="2" rx="0.5" fill="var(--primary)" opacity="0.6" />
        <rect x="34" y="35" width="45" height="2" rx="0.5" fill="var(--primary)" opacity="0.4" />
        <rect x="34" y="40" width="20" height="2" rx="0.5" fill="var(--primary)" opacity="0.8" />
        
        <circle cx="100" cy="45" r="12" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-dasharray="80 20" opacity="0.7"/>
        <path d="M92 45 L98 50 L108 40" stroke="var(--primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
        
        <!-- Keyboard Base hinge -->
        <rect x="18" y="78" width="124" height="5" rx="2" fill="#09090b" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />
        <!-- Laptop Base body -->
        <path d="M 18 80 L 142 80 L 138 88 L 22 88 Z" fill="#27272a" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <!-- Trackpad outline -->
        <rect x="68" y="81" width="24" height="5" rx="1" fill="#18181b" opacity="0.8" />
        <!-- Base bottom feet shadow -->
        <ellipse cx="80" cy="91" rx="60" ry="2" fill="#000" opacity="0.6" />
      </svg>
    `;
  } else if (type === "phone") {
    return `
      <svg class="product-svg-mockup" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="phoneScreenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="var(--accent-glow-secondary)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--accent-glow-primary)" stop-opacity="0.05"/>
          </linearGradient>
        </defs>
        <!-- Phone shadow -->
        <ellipse cx="80" cy="92" rx="25" ry="3" fill="#000" opacity="0.5" />
        <!-- Phone Outer Frame -->
        <rect x="60" y="10" width="40" height="78" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
        <!-- Phone Screen Glass -->
        <rect x="62" y="12" width="36" height="74" rx="6" fill="url(#phoneScreenGlow)" />
        <!-- Dynamic Island or notch -->
        <rect x="73" y="14" width="14" height="3" rx="1.5" fill="#000" />
        <circle cx="75" cy="15.5" r="0.5" fill="#1e293b" />
        <!-- Abstract Dashboard elements on screen -->
        <rect x="67" y="24" width="26" height="15" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.05)" />
        <circle cx="80" cy="31.5" r="5" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-dasharray="20 10" />
        
        <rect x="67" y="44" width="26" height="5" rx="1.5" fill="rgba(255,255,255,0.1)" />
        <rect x="67" y="52" width="16" height="3" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="67" y="58" width="20" height="3" rx="1" fill="var(--primary)" opacity="0.6" />
        <rect x="67" y="64" width="10" height="3" rx="1" fill="rgba(255,255,255,0.08)" />
        
        <!-- Home indicator bar -->
        <rect x="74" y="82" width="12" height="1" rx="0.5" fill="#fff" opacity="0.5" />
        <!-- Screen glare reflection -->
        <path d="M 62 12 L 90 12 L 62 70 Z" fill="rgba(255,255,255,0.03)" />
      </svg>
    `;
  } else if (type === "headphones") {
    return `
      <svg class="product-svg-mockup" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="headphoneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--accent-glow-primary)" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="var(--accent-glow-secondary)" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- Background Glow -->
        <circle cx="80" cy="50" r="35" fill="url(#headphoneGlow)" />
        <!-- Base Shadow -->
        <ellipse cx="80" cy="90" rx="35" ry="3" fill="#000" opacity="0.4" />
        <!-- Headband Arc -->
        <path d="M 45 55 A 38 38 0 0 1 115 55" fill="none" stroke="#27272a" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M 45 55 A 38 38 0 0 1 115 55" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Inner Headband Soft Mesh Cushion -->
        <path d="M 52 50 A 31 31 0 0 1 108 50" fill="none" stroke="#09090b" stroke-width="2" opacity="0.7"/>
        
        <!-- Left Cup Arm Extender -->
        <path d="M 45 53 L 42 60" stroke="#71717a" stroke-width="3" stroke-linecap="round"/>
        <!-- Right Cup Arm Extender -->
        <path d="M 115 53 L 118 60" stroke="#71717a" stroke-width="3" stroke-linecap="round"/>
        
        <!-- Left Ear Cup structure -->
        <g transform="translate(32, 56) rotate(-10)">
          <!-- Cup Bracket -->
          <path d="M 2 10 L 18 10 L 10 -2 Z" fill="#27272a" stroke="rgba(255,255,255,0.05)" />
          <!-- Earcup Outer shell -->
          <rect x="0" y="5" width="16" height="24" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <!-- Earcup Cushion pad -->
          <rect x="12" y="7" width="6" height="20" rx="3" fill="#09090b" opacity="0.9" />
          <!-- Metallic accent cap -->
          <rect x="4" y="13" width="3" height="8" rx="1" fill="var(--primary)" opacity="0.7" />
        </g>
        
        <!-- Right Ear Cup structure -->
        <g transform="translate(112, 56) rotate(10)">
          <!-- Cup Bracket -->
          <path d="M 14 10 L -2 10 L 6 -2 Z" fill="#27272a" stroke="rgba(255,255,255,0.05)" />
          <!-- Earcup Outer shell -->
          <rect x="0" y="5" width="16" height="24" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <!-- Earcup Cushion pad -->
          <rect x="-2" y="7" width="6" height="20" rx="3" fill="#09090b" opacity="0.9" />
          <!-- Metallic accent cap -->
          <rect x="9" y="13" width="3" height="8" rx="1" fill="var(--primary)" opacity="0.7" />
        </g>
      </svg>
    `;
  } else if (type === "watch") {
    return `
      <svg class="product-svg-mockup" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="watchDialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--accent-glow-primary)" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="var(--accent-glow-secondary)" stop-opacity="0.05"/>
          </radialGradient>
        </defs>
        <!-- Shadow -->
        <ellipse cx="80" cy="92" rx="20" ry="3" fill="#000" opacity="0.5" />
        <!-- Watch Bands -->
        <!-- Top Strap -->
        <path d="M 68 35 L 72 10 L 88 10 L 92 35 Z" fill="#18181b" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <!-- Bottom Strap -->
        <path d="M 68 65 L 72 90 L 88 90 L 92 65 Z" fill="#18181b" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        
        <!-- Watch Outer Bezel (Square with rounded corners) -->
        <rect x="63" y="32" width="34" height="36" rx="9" fill="#27272a" stroke="rgba(255,255,255,0.16)" stroke-width="1.8" />
        <!-- Watch Screen Glass -->
        <rect x="65" y="34" width="30" height="32" rx="7" fill="#09090b" />
        <!-- Dial Glow -->
        <rect x="65" y="34" width="30" height="32" rx="7" fill="url(#watchDialGlow)" />
        <!-- Crown Knob -->
        <rect x="97" y="44" width="2.5" height="7" rx="1" fill="#71717a" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />
        
        <!-- Watch Face Interface graphics -->
        <circle cx="80" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
        <circle cx="80" cy="50" r="10" fill="none" stroke="var(--primary)" stroke-width="1.2" stroke-dasharray="45 15" />
        <!-- Digital clock text simulation -->
        <rect x="73" y="42" width="14" height="4" rx="1" fill="var(--primary)" opacity="0.8" />
        <circle cx="73" cy="58" r="1.5" fill="#ef4444" />
        <circle cx="87" cy="58" r="1.5" fill="#10b981" />
        <rect x="77" y="57" width="6" height="2" rx="0.5" fill="rgba(255,255,255,0.3)" />
      </svg>
    `;
  }
  return "";
}

window.formatPrice = formatPrice;
window.PRODUCTS = PRODUCTS;
window.getProductSVG = getProductSVG;
