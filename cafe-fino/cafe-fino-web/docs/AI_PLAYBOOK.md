# AI Playbook

This guide defines how AI agents should work on this project.

## Allowed Change Types

- Content updates: menu items, descriptions, pricing, hours, social links.
- Design iteration: Tailwind tokens, section layout, animation tuning.
- Code changes: new sections, refactors, API integration.

## Guardrails

- Keep data in JSON files under [src/data](../src/data).
- Update both locales for any user-facing text.
- Preserve stable ids for menu items and locations.
- Prefer small, reversible changes.

## Common Tasks

### Update Menu Items

1. Edit [src/data/menu.json](../src/data/menu.json).
2. Add translations in both locale files for names and descriptions.
3. Confirm category id exists.

### Update Location Info

1. Edit [src/data/config.json](../src/data/config.json).
2. If adding a new location, update i18n shortName and days.

### Add a New Section

1. Create a component in [src/components/sections](../src/components/sections).
2. Add it to [src/App.jsx](../src/App.jsx) in the correct order.
3. Add any i18n keys and update styles as needed.

## Quality Checklist

- Run lint and build.
- Check translations for missing keys.
- Validate image paths under /images.
- Verify keyboard focus order and button labels.
