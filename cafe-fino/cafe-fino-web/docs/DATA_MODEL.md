# Data Model

This project uses file-based content for fast iteration and easy AI updates.

## Config Data

File: [src/data/config.json](../src/data/config.json)

Shape:

- locations: object keyed by location id (nice, paris)
- social: object with social links and handles
- brand: object with tagline, description, story

Location fields:

- name: string
- image: string (public path)
- address: string
- city: string
- phone: string
- hours: object { weekdays, sunday }
- days: string
- mapUrl: string
- coordinates: object { lat, lng }

Rules:

- Use stable location ids because they are referenced in i18n keys.
- Keep image paths under /images.

## Menu Data

File: [src/data/menu.json](../src/data/menu.json)

Shape:

- categories: array of { id, name, nameEn }
- items: array of menu items
- specials: array of daily specials
- brunch: object with price and includes list

Menu item fields:

- id: string (stable key, also used for i18n)
- name: string
- description: string
- price: number
- category: one of category ids
- tags: array of strings (signature, chef-special)
- featured: boolean
- dietary: array of strings (vegetarian, vegan, gluten-free)
- allergens: array of strings (gluten, dairy, eggs, nuts, fish, shellfish, sesame, soy)
- image: string (public path) or images: array of strings

Rules:

- Keep ids stable to preserve translation keys.
- Prefer numeric prices, use decimals for .50 values.
- Use images array when multiple visuals are needed.

## i18n Overrides

Translation keys override name and description fields if provided.

- menu.items.<id>.name
- menu.items.<id>.description
- menu.specials.<id>.name
- menu.specials.<id>.description

If a key is missing, the UI falls back to the JSON value.
