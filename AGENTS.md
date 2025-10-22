# Agents Guide

## Commands

### Initial Setup
```bash
npm install
```

### Build
```bash
npm run build
```

### Lint
No linter configured.

### Test
No test framework configured.

### Dev Server
Open `index.html` in a browser, or use a local server like `python -m http.server` or `npx serve`.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Google Fonts (Tomorrow)
- **Forms**: FormSubmit for contact form submissions

## Architecture
Static multi-page website with client-side JavaScript for interactivity. Pages include: index, about, contact, FAQ, privacy, terms, and under-construction. CSS animations and IntersectionObserver for scroll effects.

## Code Conventions
- No semicolons in CSS (some inconsistency exists)
- Double quotes for HTML attributes
- camelCase for JavaScript variables/functions
- CSS uses custom properties (CSS variables) in `:root`
- Italian language default with English translation via data attributes
