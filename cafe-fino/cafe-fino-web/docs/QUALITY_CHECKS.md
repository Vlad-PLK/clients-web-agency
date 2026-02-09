# Quality Checks

## Performance

- Lighthouse Performance >= 90 on mobile.
- Images are optimized and lazy-loaded where appropriate.
- Avoid long main-thread tasks from animation.

## Accessibility

- All interactive elements are keyboard reachable.
- Visible focus styles for buttons and links.
- Proper alt text for images used as content.
- Color contrast meets WCAG AA for text.

## SEO

- One H1 per page (hero logo or title).
- Meta title and description are defined in [index.html](../index.html).
- Use descriptive alt text and meaningful anchor labels.
- Add JSON-LD for Restaurant schema when content is stable.

## Regression Checks

- Navbar language switch updates text across sections.
- Menu filters still work after content updates.
- Click and Collect cart math remains accurate.
