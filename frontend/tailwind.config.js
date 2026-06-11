/** @type {import('tailwindcss').Config} */
// Tailwind v4: most configuration has moved to CSS (@theme in index.css).
// This file is kept for any remaining JS-based config (e.g. content paths for
// older integrations) but is NOT required by the v4 PostCSS plugin.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
