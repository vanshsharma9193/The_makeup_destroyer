/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Master Product Catalog Database
 */

const PRODUCTS_DATA = [
  // 1. LIPSTICKS
  {
    id: "cb-lip-01",
    name: "Velvet Rouge Satin Lipstick",
    category: "Lipsticks",
    categorySlug: "lipsticks",
    price: 1850,
    originalPrice: 2400,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 342,
    badge: "Bestseller",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599732497127-c10f845a7d0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Burgundy Velvet", hex: "#64132F" },
      { name: "Cherry Romance", hex: "#922B4B" },
      { name: "Royal Crimson", hex: "#7E1229" },
      { name: "Petal Rose", hex: "#C76D80" },
      { name: "Nude Elegance", hex: "#B87A6E" }
    ],
    description: "An ultra-luxurious, couture satin lipstick infused with cherry blossom nectar and hyaluronic spheres for 16-hour hydration and opulent pigment payoff.",
    benefits: [
      "16-hour continuous hydration without feathering",
      "Enriched with Japanese Sakura flower extract",
      "Velvet satin finish with luminous silver micro-pearls",
      "Weightless, cushiony comfort with one-swipe opacity"
    ],
    ingredients: "Octyldodecanol, Polybutene, Ricinus Communis (Castor) Seed Oil, Prunus Serrulata (Cherry Blossom) Flower Extract, Hyaluronic Acid Spheres, Tocopheryl Acetate (Vitamin E), Synthetic Fluorphlogopite, Silver Sparkle Flakes.",
    howToUse: "Glide effortlessly directly from the bullet starting at Cupid's bow, extending towards the outer corners. For ultimate definition, pair with Cherry Blossom Couture Lip Contour.",
    inStock: true
  },
  {
    id: "cb-lip-02",
    name: "Matte Blossom Lip Elixir",
    category: "Lipsticks",
    categorySlug: "lipsticks",
    price: 1650,
    originalPrice: 2100,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 198,
    badge: "New",
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Imperial Wine", hex: "#3B091B" },
      { name: "Scarlet Desire", hex: "#A81D35" },
      { name: "Blossom Mauve", hex: "#A25C74" },
      { name: "Vintage Brick", hex: "#87323B" }
    ],
    description: "A transfer-proof liquid matte lipstick that locks like air and drapes lips in lavish, petal-soft pigmentation for up to 18 hours.",
    benefits: [
      "Transfer-proof & kiss-proof all day wear",
      "Infused with Moroccan Argan oil & Vitamin E",
      "Zero cracking or dryness",
      "Precision curved diamond-petal wand"
    ],
    ingredients: "Isododecane, Dimethicone, Argania Spinosa Kernel Oil, Prunus Avium (Sweet Cherry) Seed Oil, Silica Silylate, Fragrance.",
    howToUse: "Define lips with the pointed applicator tip, then fill in with the flat side. Allow 45 seconds to set to a flawless velvet matte.",
    inStock: true
  },
  {
    id: "cb-lip-03",
    name: "Couture Hydrating Lip Oil & Gloss",
    category: "Lipsticks",
    categorySlug: "lipsticks",
    price: 1450,
    originalPrice: 1900,
    discount: "24% OFF",
    rating: 4.9,
    reviewsCount: 276,
    badge: "Trending",
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1599732497127-c10f845a7d0c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599732497127-c10f845a7d0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Glass Shimmer", hex: "#F3E3E8" },
      { name: "Cherry Glaze", hex: "#D65B79" },
      { name: "Sparkling Berry", hex: "#8A2A46" }
    ],
    description: "A high-mirror glaze lip treatment packed with jojoba oils and multidimensional silver starlight flakes that naturally plump and soothe.",
    benefits: [
      "Non-sticky mirror gloss finish",
      "Immediate visible plumping effect",
      "Conditions cracked, dry lips",
      "Can be worn alone or as a topper"
    ],
    ingredients: "Polyisobutene, Jojoba Oil, Cherry Seed Extract, Tripeptide-1, Peppermint Leaf Oil, Mica, Silver Micro-Crystals.",
    howToUse: "Apply generously on bare lips for an instant glassy glow, or layer atop lipstick for a vinyl 3D effect.",
    inStock: true
  },

  // 2. FOUNDATIONS
  {
    id: "cb-fdn-01",
    name: "Luminous Silk Breathable Foundation",
    category: "Foundations",
    categorySlug: "foundations",
    price: 3200,
    originalPrice: 4000,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 512,
    badge: "Award Winner",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Alabaster 10N", hex: "#F7E1D3" },
      { name: "Porcelain Rose 15C", hex: "#F2D0BF" },
      { name: "Honey Beige 25W", hex: "#E4B89A" },
      { name: "Warm Almond 35W", hex: "#C79574" },
      { name: "Chestnut Velvet 45N", hex: "#8B5738" }
    ],
    description: "An iconic, weightless liquid foundation that captures the ethereal glow of early morning cherry blossoms, delivering custom medium-to-full buildable coverage.",
    benefits: [
      "Micro-fil technology creates an imperceptible second-skin veil",
      "24-hour hydration with SPF 25 UV protection",
      "Resistant to sweat, humidity, and photo flashback",
      "Non-comedogenic and dermatologist tested"
    ],
    ingredients: "Aqua/Water, Cyclopentasiloxane, Titanium Dioxide, Dimethicone, Sakura Extract, Niacinamide, Glycerin, Phenoxyethanol, Iron Oxides.",
    howToUse: "Dispense 1-2 pumps onto the back of your hand. Blend seamlessly using the Cherry Blossom Flawless Buffing Brush from center of face outwards.",
    inStock: true
  },
  {
    id: "cb-fdn-02",
    name: "Velvet Matte Poreless Foundation",
    category: "Foundations",
    categorySlug: "foundations",
    price: 2950,
    originalPrice: 3600,
    discount: "18% OFF",
    rating: 4.7,
    reviewsCount: 240,
    badge: "Popular",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Ivory Fair", hex: "#F4E0CE" },
      { name: "Classic Nude", hex: "#E8C4A9" },
      { name: "Golden Tan", hex: "#CB9973" },
      { name: "Rich Mocha", hex: "#7E5039" }
    ],
    description: "A photo-ready soft matte foundation formulated with volcanic ash minerals to blur pores, absorb excess sebum, and maintain a velvety finish.",
    benefits: [
      "Natural soft-focus blur filter in a bottle",
      "Oil-control for up to 16 continuous hours",
      "Water-resistant and sweat-proof",
      "Enriched with soothing chamomile extract"
    ],
    ingredients: "Water, Isododecane, Dimethicone, Chamomilla Recutita Flower Extract, Silica, Kaolin, Phenoxyethanol.",
    howToUse: "Apply with a damp sponge or stippling brush, layering as needed over blemishes or uneven zones.",
    inStock: true
  },

  // 3. CONCEALERS
  {
    id: "cb-cnc-01",
    name: "Radiant Silk Touch-Up Concealer",
    category: "Concealers",
    categorySlug: "concealers",
    price: 1550,
    originalPrice: 1950,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 389,
    badge: "Must-Have",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Light Peach", hex: "#F6DDD0" },
      { name: "Vanilla Cream", hex: "#EFCBB5" },
      { name: "Warm Honey", hex: "#D6A584" },
      { name: "Deep Amber", hex: "#976547" }
    ],
    description: "A creaseless, peptide-powered concealer designed to awaken tired eyes, conceal imperfections, and sculpt high points with luminous clarity.",
    benefits: [
      "Infused with caffeine and botanical peptides to reduce puffiness",
      "14-hour creaseless flexibility",
      "Light-reflecting silver mineral core",
      "Seamless blend with natural skin texture"
    ],
    ingredients: "Aqua, Cyclopentasiloxane, Caffeine, Palmitoyl Tripeptide-5, Prunus Serrulata Leaf Extract, Vitamin C Ester.",
    howToUse: "Dot under eyes, around nostrils, and over blemishes. Gently tap and diffuse with your ring finger or mini blender.",
    inStock: true
  },
  {
    id: "cb-cnc-02",
    name: "Full Cover Velvet Camouflage",
    category: "Concealers",
    categorySlug: "concealers",
    price: 1750,
    originalPrice: 2200,
    discount: "20% OFF",
    rating: 4.8,
    reviewsCount: 177,
    badge: "Pro Pick",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Fair Nude", hex: "#F5DFCF" },
      { name: "Medium Warm", hex: "#DEB394" },
      { name: "Toffee Deep", hex: "#8F5E41" }
    ],
    description: "High-density pigment dispersion specifically formulated to neutralize dark circles, hyperpigmentation, and redness in a single touch.",
    benefits: [
      "Complete 100% coverage with zero cakey finish",
      "Waterproof and smudge-resistant",
      "Enriched with Centella Asiatica for skin calming"
    ],
    ingredients: "Dimethicone, Talc, Centella Asiatica Extract, Tocopherol, Iron Oxides.",
    howToUse: "Use a small dot on dark spots and buff out the perimeter.",
    inStock: true
  },

  // 4. BLUSHES
  {
    id: "cb-blu-01",
    name: "Cherry Petal Soft Powder Blush",
    category: "Blushes",
    categorySlug: "blushes",
    price: 2150,
    originalPrice: 2800,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 420,
    badge: "Iconic",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Blossom Pink", hex: "#E897A9" },
      { name: "Burgundy Flush", hex: "#922B4B" },
      { name: "Sunset Coral", hex: "#EA7A6E" },
      { name: "Spiced Plum", hex: "#7B3448" }
    ],
    description: "An ultra-finely milled baked blush adorned with an embossed cherry blossom motif. Infused with soft silver micronized pearls for a healthy regal flush.",
    benefits: [
      "Silky micronized powder that blends seamlessly",
      "Infused with organic rosehip oil for skin radiance",
      "Buildable warmth from ethereal sheer to dramatic drama",
      "Luxury burgundy lacquered compact with vanity mirror"
    ],
    ingredients: "Mica, Zea Mays (Corn) Starch, Rosa Canina (Rosehip) Fruit Oil, Squalane, Silver Micro-Glimmer, Fragrance.",
    howToUse: "Sweep over cheekbones angling up toward temples with the Cherry Blossom Angled Blush Brush.",
    inStock: true
  },
  {
    id: "cb-blu-02",
    name: "Dewy Cheek Tint Jelly Elixir",
    category: "Blushes",
    categorySlug: "blushes",
    price: 1650,
    originalPrice: 2100,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 203,
    badge: "Trending",
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Dewy Rose", hex: "#DC7D93" },
      { name: "Crushed Berry", hex: "#8A2643" }
    ],
    description: "Water-based bouncy jelly blush infused with aloe and Japanese cherry water for a glassy, translucent glass-skin flush.",
    benefits: [
      "12-hour dewy watercolor tint",
      "Cooling sensation upon skin contact",
      "Double duty for both cheeks and lips"
    ],
    ingredients: "Aloe Barbadensis Leaf Juice, Prunus Serrulata Flower Water, Glycerin, Phenoxyethanol.",
    howToUse: "Dab two dots on the apples of your cheeks and blend rapidly with fingertips.",
    inStock: true
  },

  // 5. HIGHLIGHTERS
  {
    id: "cb-hlg-01",
    name: "Starlight Diamond Shimmer Powder",
    category: "Highlighters",
    categorySlug: "highlighters",
    price: 2450,
    originalPrice: 3200,
    discount: "23% OFF",
    rating: 5.0,
    reviewsCount: 468,
    badge: "Top Rated",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Silver Moonlight", hex: "#E8E7E9" },
      { name: "Champagne Blossom", hex: "#EED7C5" },
      { name: "Rose Gold Crown", hex: "#E4B0A7" }
    ],
    description: "A show-stopping gelee-powder highlighter packed with pure diamond-grade silver and champagne pigments that catch every beam of light.",
    benefits: [
      "Pure diamond starlight sparkle with zero chalkiness",
      "Melted chrome effect on collarbones and cheekbones",
      "Long-wearing 16-hour radiance without glitter fallout",
      "Encased in a jewel-faceted silver and burgundy compact"
    ],
    ingredients: "Calcium Sodium Borosilicate, Synthetic Fluorphlogopite, Dimethicone, Silver Powder (CI 77820), Caprylyl Glycol.",
    howToUse: "Dust along cheekbones, brow bones, cupid's bow, and shoulders for a breathtaking ethereal glow.",
    inStock: true
  },
  {
    id: "cb-hlg-02",
    name: "Moonlit Celestial Liquid Glow",
    category: "Highlighters",
    categorySlug: "highlighters",
    price: 1950,
    originalPrice: 2500,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 184,
    badge: "New",
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Opal Lustre", hex: "#F3ECEF" },
      { name: "Golden Aura", hex: "#E7CEB5" }
    ],
    description: "Multidimensional liquid drops with micro-silver pearls that can be worn alone or mixed into your foundation for lit-from-within brilliance.",
    benefits: [
      "Multi-use formulation for face, neck, and body",
      "Weightless water-gel matrix",
      "Non-greasy, non-sticky satin dry-down"
    ],
    ingredients: "Aqua, Squalane, Mica, Mica/Titanium Dioxide, Phenoxyethanol.",
    howToUse: "Add 1 drop into foundation for all-over luminosity, or tap onto cheekbones as a liquid strobe.",
    inStock: true
  },

  // 6. EYESHADOW PALETTES
  {
    id: "cb-eye-01",
    name: "Imperial Blossom 18-Color Eyeshadow Palette",
    category: "Eyeshadow Palettes",
    categorySlug: "eyeshadow-palettes",
    price: 3850,
    originalPrice: 4900,
    discount: "21% OFF",
    rating: 5.0,
    reviewsCount: 680,
    badge: "Signature Hero",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "18 Majestic Tones", hex: "#64132F" }
    ],
    description: "The crown jewel of Cherry Blossom. 18 velvety butter-mattes, foiled chrome metallics, and diamond silver glitters inspired by royal Japanese imperial gardens.",
    benefits: [
      "High-impact, single-swipe color payoff",
      "Zero patchiness or fallout with wet-or-dry versatility",
      "Includes 6 buttery mattes, 6 molten metallics, and 6 silver-duochrome glitters",
      "Heavyweight collector's edition burgundy velvet case with mirror"
    ],
    ingredients: "Talc, Zinc Stearate, Dimethicone, Silica, Silver Flakes, Prunus Serrulata Extract, Tocopherol.",
    howToUse: "Prep lids with concealer. Blend matte shades through crease and pat foil metallic or glitter shades onto center eyelid.",
    inStock: true
  },
  {
    id: "cb-eye-02",
    name: "Rose Quartz Smoky Eyes Palette",
    category: "Eyeshadow Palettes",
    categorySlug: "eyeshadow-palettes",
    price: 2650,
    originalPrice: 3400,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 215,
    badge: "Limited Edition",
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "9 Romantic Shades", hex: "#922B4B" }
    ],
    description: "A curation of 9 sultry plum, mauve, deep burgundy, and icy silver eyeshadows formulated for captivating evening and bridal looks.",
    benefits: [
      "Compact travel-friendly luxury casing",
      "Seamless blending with rich pigment depth",
      "Crease-free performance up to 16 hours"
    ],
    ingredients: "Mica, Boron Nitride, Kaolin, Dimethicone, Carmine, Iron Oxides.",
    howToUse: "Use deeper burgundy on outer V and silver sparkle in the inner tear duct for dramatic glamour.",
    inStock: true
  },

  // 7. MASCARAS
  {
    id: "cb-mas-01",
    name: "Lash Crown Dramatic Volume Mascara",
    category: "Mascaras",
    categorySlug: "mascaras",
    price: 1650,
    originalPrice: 2200,
    discount: "25% OFF",
    rating: 4.9,
    reviewsCount: 430,
    badge: "Bestseller",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Midnight Noir", hex: "#0F0C0E" },
      { name: "Burgundy Velvet", hex: "#4E1225" }
    ],
    description: "Transform lashes with majestic length, sky-high lift, and astronomical volume. Infused with biotin and botanical keratin for lash-strengthening care.",
    benefits: [
      "Hourglass silicone wand captures every micro lash",
      "Clump-free, flake-free, and smudge-resistant",
      "Nourishing lash serum formula promotes lash health",
      "Intense carbon black & couture deep burgundy pigments"
    ],
    ingredients: "Aqua, Cera Alba (Beeswax), Copernicia Cerifera Wax, Stearic Acid, Biotinoyl Tripeptide-1, Carbon Black.",
    howToUse: "Position brush at the base of lashes, wiggle gently, and pull through to tips in an upward motion. Layer twice for faux-lash intensity.",
    inStock: true
  },
  {
    id: "cb-mas-02",
    name: "Feather-Light Waterproof Mascara",
    category: "Mascaras",
    categorySlug: "mascaras",
    price: 1750,
    originalPrice: 2300,
    discount: "24% OFF",
    rating: 4.7,
    reviewsCount: 194,
    badge: "Waterproof",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Jet Black", hex: "#000000" }
    ],
    description: "An ultra-resistant waterproof formula that braves humidity, tears, and monsoons without weighing lashes down.",
    benefits: [
      "24-hour waterproof curl hold",
      "Featherweight feeling on sensitive eyes",
      "Removes easily with oil cleansers"
    ],
    ingredients: "Isododecane, Disteardimonium Hectorite, Ozokerite, Carnauba Wax, Iron Oxides.",
    howToUse: "Sweep from lash roots to ends. Coat lower lashes with the tapered brush tip.",
    inStock: true
  },

  // 8. EYELINERS
  {
    id: "cb-eye-03",
    name: "Obsidian Precision Waterproof Liquid Eyeliner",
    category: "Eyeliners",
    categorySlug: "eyeliners",
    price: 1350,
    originalPrice: 1750,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 310,
    badge: "Precision Tip",
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Obsidian Black", hex: "#080608" },
      { name: "Burgundy Chrome", hex: "#64132F" },
      { name: "Silver Starlight", hex: "#C0C0C0" }
    ],
    description: "A Japanese calligraphy-inspired 0.01mm micro-brush eyeliner pen that glides effortlessly with carbon-pigmented ink.",
    benefits: [
      "Ultra-fine 0.01mm felt tip for surgical precision",
      "Instant dry down within 5 seconds",
      "Smudge-proof, transfer-proof, tear-proof 24h wear",
      "Ergonomic metallic silver weighted grip"
    ],
    ingredients: "Aqua, Acrylates Copolymer, Carbon Black, Butylene Glycol, Laureth-21, Phenoxyethanol.",
    howToUse: "Shake well before use. Rest pinky against cheek and trace along lashline, flicking upward at outer edge for a sharp wing.",
    inStock: true
  },
  {
    id: "cb-eye-04",
    name: "Velvet Gel Glide Eyeliner Pencil",
    category: "Eyeliners",
    categorySlug: "eyeliners",
    price: 1150,
    originalPrice: 1500,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 165,
    badge: "Waterline Safe",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Dark Cherry", hex: "#3B091B" },
      { name: "Smoky Charcoal", hex: "#2B282A" },
      { name: "Champagne Silver", hex: "#D4C7BA" }
    ],
    description: "Creamy gel pencil that melts like butter on the waterline and stays locked all day without running or fading.",
    benefits: [
      "Creamy, zero-tug application",
      "Ophthalmologist tested for sensitive eyes and contact lens wearers",
      "Built-in sharpener and blending smudger"
    ],
    ingredients: "Cyclopentasiloxane, Polyethylene, Synthetic Wax, Trimethylsiloxysilicate, Vitamin E.",
    howToUse: "Glide along tightline or waterline. Smudge within 30 seconds for a sultry smoky eye.",
    inStock: true
  },

  // 9. MAKEUP BRUSHES
  {
    id: "cb-brs-01",
    name: "Imperial 12-Piece Luxury Vegan Brush Set",
    category: "Makeup Brushes",
    categorySlug: "makeup-brushes",
    price: 4950,
    originalPrice: 6500,
    discount: "24% OFF",
    rating: 5.0,
    reviewsCount: 520,
    badge: "Masterpiece",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Burgundy & Silver", hex: "#64132F" }
    ],
    description: "Crafted by hand using cruelty-free Dermasyn™ ultra-plush synthetic bristles, royal burgundy lacquered wooden handles, and polished silver metallic ferrules.",
    benefits: [
      "12 comprehensive face and eye brushes for flawless application",
      "Antibacterial, hypoallergenic, zero bristle shedding",
      "Effortlessly picks up and distributes powder, cream, and liquid formulas",
      "Accompanied by an embossed faux-leather cylinder travel case"
    ],
    ingredients: "100% Dermasyn Vegan Micro-Fiber Bristles, Sustainable Birchwood, Aluminum Silver Ferrules.",
    howToUse: "Use designated brushes for buffing foundation, contouring, sculpting blush, highlighting, and blending eyeshadows. Wash weekly with mild soap.",
    inStock: true
  },
  {
    id: "cb-brs-02",
    name: "Flawless Buffing Foundation Brush",
    category: "Makeup Brushes",
    categorySlug: "makeup-brushes",
    price: 1450,
    originalPrice: 1900,
    discount: "24% OFF",
    rating: 4.9,
    reviewsCount: 312,
    badge: "Essential",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Silver Ferrule", hex: "#C0C0C0" }
    ],
    description: "Dense, dome-shaped kabuki brush designed to buff liquid and cream foundations into skin for an airbrushed, streak-free complexion.",
    benefits: [
      "Over 180,000 ultra-dense micro bristles",
      "Streak-free poreless coverage",
      "Conserves 30% more product than standard sponges"
    ],
    ingredients: "Synthetic vegan fibers, solid wood handle.",
    howToUse: "Buff in circular motions from center of face outwards.",
    inStock: true
  },

  // 10. BEAUTY ESSENTIALS
  {
    id: "cb-ess-01",
    name: "Hydra-Mist Setting Spray With 24K Silver Glow",
    category: "Beauty Essentials",
    categorySlug: "beauty-essentials",
    price: 2150,
    originalPrice: 2800,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 476,
    badge: "Holy Grail",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Starlight Mist", hex: "#F8E9EE" }
    ],
    description: "A continuous micro-mist setting spray infused with genuine silver micro-particles, cherry blossom water, and green tea to lock makeup for 24 hours.",
    benefits: [
      "Locks makeup for 24 hours with transfer resistance",
      "Ultra-fine Japanese micro-atomizer nozzle for even dispersion",
      "Instantly revives tired skin with soothing antioxidants",
      "Leaves skin with a luminous glass-like soft radiance"
    ],
    ingredients: "Rosa Damascena Flower Water, Prunus Serrulata (Sakura) Flower Water, Camellia Sinensis (Green Tea) Leaf Extract, Colloidal Silver, Hyaluronic Acid.",
    howToUse: "Shake well. Hold bottle 8-10 inches from face, close eyes, and mist in an 'X' and 'T' motion after makeup application.",
    inStock: true
  },
  {
    id: "cb-ess-02",
    name: "Velvet Cloud Loose Translucent Powder",
    category: "Beauty Essentials",
    categorySlug: "beauty-essentials",
    price: 2250,
    originalPrice: 2900,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 395,
    badge: "Award Winner",
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Translucent Crystal", hex: "#FFFDFB" },
      { name: "Translucent Honey", hex: "#F3DCB9" }
    ],
    description: "A weightless, invisible micro-powder that blurs texture, sets foundation, and halts shine without flashback in photos.",
    benefits: [
      "Zero photo flashback guaranteed",
      "Silk amino acids keep skin matte yet hydrated",
      "Double-sifter mesh container prevents spillage"
    ],
    ingredients: "Silica, Lauroyl Lysine, Mica, Silk Amino Acids, Prunus Serrulata Flower Extract.",
    howToUse: "Press and roll onto oily areas with the included velour puff.",
    inStock: true
  },
  {
    id: "cb-ess-03",
    name: "Cherry Blossom Gentle Cleansing Balm",
    category: "Beauty Essentials",
    categorySlug: "beauty-essentials",
    price: 1950,
    originalPrice: 2500,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 288,
    badge: "New",
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    shades: [
      { name: "Cherry Nectar", hex: "#F8E9EE" }
    ],
    description: "A sherbet-to-oil melting cleansing balm that effortlessly melts away stubborn waterproof makeup while pampering skin with nourishing botanicals.",
    benefits: [
      "Melt-away waterproof mascara and liquid lipsticks effortlessly",
      "Leaves skin silky smooth without greasy residue",
      "Includes magnetic spatula nestled in lid"
    ],
    ingredients: "Cetyl Ethylhexanoate, PEG-20 Glyceryl Triisostearate, Cherry Seed Oil, Jojoba Seed Oil, Vitamin E.",
    howToUse: "Scoop a nickel-sized amount onto dry skin. Massage in circular motions over face and eyes. Splash with warm water to emulsify into milk, then rinse.",
    inStock: true
  }
];

// Product Data Utility Methods
const ProductService = {
  getAll: () => PRODUCTS_DATA,
  
  getById: (id) => PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0],
  
  getFeatured: () => PRODUCTS_DATA.filter(p => p.isFeatured),
  
  getBestSellers: () => PRODUCTS_DATA.filter(p => p.isBestSeller),
  
  getNewArrivals: () => PRODUCTS_DATA.filter(p => p.isNew),
  
  getByCategory: (categoryName) => {
    if (!categoryName || categoryName === "All") return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => 
      p.category.toLowerCase() === categoryName.toLowerCase() || 
      p.categorySlug.toLowerCase() === categoryName.toLowerCase()
    );
  },
  
  getRelated: (currentId, category, limit = 4) => {
    return PRODUCTS_DATA
      .filter(p => p.id !== currentId && p.category === category)
      .slice(0, limit);
  },

  getCategories: () => [
    "All",
    "Lipsticks",
    "Foundations",
    "Concealers",
    "Blushes",
    "Highlighters",
    "Eyeshadow Palettes",
    "Mascaras",
    "Eyeliners",
    "Makeup Brushes",
    "Beauty Essentials"
  ],

  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.ProductService = ProductService;
}

