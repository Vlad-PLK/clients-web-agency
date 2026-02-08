# Café Fino — Design Moodboard & Wireframes

**Reference Site:** [leclay.fr](https://leclay.fr) (Webflow)
**Created:** 2026-02-08
**Status:** Design Phase

---

## 🎨 Design Analysis: Clay (leclay.fr)

### Site Architecture
- **Platform:** Webflow
- **Pages:** Home (single-page feel), Contact
- **Style:** Full-screen hero, scroll-triggered animations, horizontal slider

### Key Features to Replicate

#### 1. Opening Animation
- Full-screen loading overlay
- Title: "Dealer de Good Vibes" with subtitle
- Lottie animation (scroll indicator)
- Fades out on scroll to reveal hero

#### 2. Navigation Bar
- Fixed/sticky navbar
- Centered logo (SVG)
- Minimal links: Commander | Coffee | [LOGO] | Brunch | Contact
- Burger menu for mobile
- Dropdown animation on mobile

#### 3. Hero Section
- Large typography headline
- Toggle buttons (Coffee / Brunch) to switch content
- Dynamic footer info (hours, days, address) changes based on selection
- Full-viewport height

#### 4. Horizontal Image Slider
- Multiple rows of food images
- Alternating scroll directions (left/right)
- Continuous infinite scroll animation
- Images link to ordering page
- Text overlay on each item

#### 5. Typography
- **Font:** Montserrat (100-900 weights)
- Large, bold headlines
- Clean, readable body text
- All caps for navigation and buttons

#### 6. Color Scheme
```css
--chocolate: #5C4033 (dark brown)
--brown: #8B7355 (medium brown)
--white: #FFFFFF
--cream: #FAF8F5 (off-white background)
```

#### 7. Interactions
- Scroll-triggered animations (fade, slide)
- Hover effects on buttons and images
- Smooth scroll behavior
- Custom scrollbar styling

---

## 🎯 Café Fino Design System

### Color Palette (Adapted for Café Fino)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary** | Powder Pink | `#F5E6E0` | Backgrounds, accents |
| **Secondary** | Warm White | `#FDFBF9` | Main background |
| **Accent Dark** | Terracotta | `#C4A484` | Buttons, highlights |
| **Text Primary** | Charcoal | `#2D2D2D` | Headlines, body |
| **Text Secondary** | Warm Gray | `#6B6B6B` | Subtle text |
| **Accent Light** | Sage Green | `#B8C9B8` | Secondary accents |

### Typography

```css
/* Primary Font - Headlines */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

/* Secondary Font - Body & UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

/* Accent Font - Taglines (optional) */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
```

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero Title | Playfair Display | 72px / 4.5rem | 600 |
| Hero Subtitle | Inter | 18px / 1.125rem | 400 |
| Section Heading | Playfair Display | 48px / 3rem | 500 |
| Body Text | Inter | 16px / 1rem | 400 |
| Navigation | Inter | 14px / 0.875rem | 500 |
| Buttons | Inter | 14px / 0.875rem | 600 |
| Caption | Inter | 12px / 0.75rem | 400 |

### Component Styles

#### Buttons
```css
.btn-primary {
  background: #C4A484;
  color: #FFFFFF;
  padding: 12px 32px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #2D2D2D;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1px solid #2D2D2D;
  color: #2D2D2D;
}
```

#### Cards (Menu Items)
```css
.menu-card {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-8px);
}
```

---

## 📐 Wireframes

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      LOADING OVERLAY                        │
│                                                             │
│                    "Café Fino"                              │
│               Coffee Shop & Restaurant                      │
│                                                             │
│                    [scroll arrow]                           │
└─────────────────────────────────────────────────────────────┘
                           ↓ (fades on scroll)

┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                                        [MENU ICON]  │  ← Navbar (sticky)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                     CAFÉ FINO                               │  ← Hero Section
│              Quality Food & Creative Drinks                 │
│                                                             │
│              [ NICE ]        [ PARIS ]                      │  ← Location Toggle
│                                                             │
│   ─────────────────────────────────────────────────────    │
│   9h-18h  •  Lun-Sam  •  39 Rue Gioffredo, Nice            │  ← Dynamic Info
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FOOD SLIDER                              │
│  ←←← [Brinos] [Avocat Toast] [Pancakes] [Granola] →→→      │  ← Row 1 (left)
│  →→→ [Latte] [Cappuccino] [Matcha] [Fresh Juice] ←←←       │  ← Row 2 (right)
│  ←←← [Tiramisu] [Cookies] [Cake] [Salad] →→→               │  ← Row 3 (left)
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    NOTRE HISTOIRE                           │  ← About Section
│                                                             │
│  ┌──────────────────┐    Dans la restauration depuis       │
│  │                  │    plus de 12 ans, nous sommes       │
│  │   [PHOTO]        │    d'abord et avant tout des         │
│  │                  │    passionnés du café...             │
│  └──────────────────┘                                       │
│                                                             │
│              En collaboration avec un                       │
│              torréfacteur historique                       │
│              de Nice depuis 1925                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       LA CARTE                              │  ← Menu Section
│                                                             │
│   [Petit Déj]  [Brunch]  [Déjeuner]  [Boissons]            │  ← Tabs
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │ [IMG]   │  │ [IMG]   │  │ [IMG]   │  │ [IMG]   │       │
│   │ Brinos  │  │ Avocat  │  │ Granola │  │ Salad   │       │
│   │ €12     │  │ €7.50   │  │ €8      │  │ €14     │       │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    NOS CAFÉS                                │  ← Coffee Section
│                                                             │
│   "En étroite collaboration avec un torréfacteur           │
│    historique de Nice établi depuis 1925"                  │
│                                                             │
│   ┌───────────────┐   ┌───────────────┐                    │
│   │   ESPRESSO    │   │    FILTRE     │                    │
│   │   [beans]     │   │    V60        │                    │
│   │   Guatemala   │   │   Ethiopie    │                    │
│   │   Brésil      │   │   Single      │                    │
│   └───────────────┘   └───────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    NOS ADRESSES                             │  ← Locations Section
│                                                             │
│   ┌─────────────────────┐   ┌─────────────────────┐        │
│   │      NICE           │   │      PARIS          │        │
│   │   39 Rue Gioffredo  │   │  59 Rue Mathurins   │        │
│   │   06000 Nice        │   │   75008 Paris       │        │
│   │                     │   │                     │        │
│   │   Lun-Sam: 9h-18h   │   │   Lun-Sam: 8h-18h   │        │
│   │   Dim: 9h-17h       │   │   Dim: 9h-17h       │        │
│   │                     │   │                     │        │
│   │   [MAP]             │   │   [MAP]             │        │
│   │                     │   │                     │        │
│   │   04 93 79 58 17    │   │   01 XX XX XX XX    │        │
│   └─────────────────────┘   └─────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│               INSTAGRAM @cafefinofrance                     │  ← Instagram Feed
│                                                             │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐         │
│   │     │ │     │ │     │ │     │ │     │ │     │         │
│   │ IG  │ │ IG  │ │ IG  │ │ IG  │ │ IG  │ │ IG  │         │
│   │     │ │     │ │     │ │     │ │     │ │     │         │
│   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘         │
│                                                             │
│                  [SUIVEZ-NOUS]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       FOOTER                                │
│                                                             │
│   [LOGO]                                                    │
│                                                             │
│   Nice                    Paris                   Contact   │
│   39 Rue Gioffredo        59 Rue Mathurins       Email     │
│   04 93 79 58 17          01 XX XX XX XX         [form]    │
│                                                             │
│   ─────────────────────────────────────────────────────    │
│                                                             │
│   [IG]  [FB]  [TW]                © 2026 Café Fino         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile Wireframes

```
┌─────────────────────┐
│ [≡]    [LOGO]   [☰] │  ← Header
├─────────────────────┤
│                     │
│     CAFÉ FINO       │
│  Quality Food &     │
│  Creative Drinks    │
│                     │
│   [NICE] [PARIS]    │
│                     │
│  ─────────────────  │
│  9h-18h • Lun-Sam   │
│  39 Rue Gioffredo   │
│                     │
├─────────────────────┤
│  ←← [Food Slider]   │
│     [Images]    ←←  │
├─────────────────────┤
│                     │
│   NOTRE HISTOIRE    │
│                     │
│   [PHOTO]           │
│                     │
│   Dans la           │
│   restauration...   │
│                     │
├─────────────────────┤
│                     │
│      LA CARTE       │
│                     │
│ [Tabs: horizontal   │
│  scroll]            │
│                     │
│ ┌─────┐ ┌─────┐    │
│ │     │ │     │    │
│ │Card │ │Card │    │
│ │     │ │     │    │
│ └─────┘ └─────┘    │
│                     │
├─────────────────────┤
│                     │
│   NOS ADRESSES      │
│                     │
│   ┌───────────────┐ │
│   │     NICE      │ │
│   │   [Details]   │ │
│   │   [Map]       │ │
│   └───────────────┘ │
│                     │
│   ┌───────────────┐ │
│   │     PARIS     │ │
│   │   [Details]   │ │
│   │   [Map]       │ │
│   └───────────────┘ │
│                     │
├─────────────────────┤
│   [@cafefinofrance] │
│   [IG Grid 3x2]     │
├─────────────────────┤
│      FOOTER         │
│   [Logo] [Social]   │
│   © 2026            │
└─────────────────────┘
```

---

## 🔧 Technical Implementation

### React Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingOverlay.jsx
│   │   └── MobileMenu.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── FoodSlider.jsx
│   │   ├── About.jsx
│   │   ├── Menu.jsx
│   │   ├── Coffee.jsx
│   │   ├── Locations.jsx
│   │   └── InstagramFeed.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── LocationCard.jsx
│   │   ├── MenuCard.jsx
│   │   └── Toggle.jsx
│   └── common/
│       ├── SectionTitle.jsx
│       └── AnimatedElement.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   └── useLocationToggle.js
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
├── data/
│   ├── menu.json
│   └── locations.json
└── pages/
    ├── Home.jsx
    └── Contact.jsx
```

### Key Libraries

```json
{
  "dependencies": {
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x",
    "framer-motion": "^12.x",
    "lucide-react": "^0.x",
    "zustand": "^5.x"
  },
  "devDependencies": {
    "vite": "^7.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x"
  }
}
```

### Animation Examples (Framer Motion)

```jsx
// Loading Overlay fade out
const loadingVariants = {
  visible: { opacity: 1 },
  hidden: { 
    opacity: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Scroll-triggered section animation
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Infinite slider
const sliderVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear"
      }
    }
  }
};
```

---

## 📸 Visual References (from research)

### Food Photography Style
- Bright, natural lighting
- Overhead/45° angles
- Minimal props, focus on food
- Consistent color grading (warm, slightly desaturated)
- White/neutral backgrounds

### Interior Photography Style
- Wide shots showing full space
- Detail shots (coffee machine, plants, chairs)
- Lifestyle shots (people enjoying food)
- Morning light preferred

### Image Sources (from research)
- Love Spots Nice gallery: multiple high-quality shots
- Restaurant Guru: 225 photos
- Instagram @cafefinofrance: 540 posts

---

## ✅ Next Steps

1. [ ] Set up React + Vite project structure
2. [ ] Configure TailwindCSS with custom theme
3. [ ] Build core components (Navbar, Footer, Button, Card)
4. [ ] Implement loading overlay with animation
5. [ ] Create Hero section with location toggle
6. [ ] Build infinite food slider
7. [ ] Develop menu section with tabs
8. [ ] Add locations with embedded maps
9. [ ] Integrate Instagram feed
10. [ ] Mobile responsiveness pass
11. [ ] Performance optimization
12. [ ] Content population (menu data, images)

---

_Design by Jarvis for Vlad-PLK / MySmartTech Consulting_
