/** @type {import('tailwindcss').Config} */
// ChurroManía - Tailwind config. Compiled locally to css/styles.css (no Play CDN).
// Rebuild after markup changes:  npx tailwindcss@3 -i css/tailwind.in.css -o css/styles.css --minify
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'cm-blue': '#116BCE',
        'cm-blue-dark': '#11345A',
        'cm-blue-deep': '#135495',
        'cm-blue-light': '#28B2FF',
        'cm-blue-pale': '#D8F3FF',
        'cm-blue-bg': '#EDFAFF',
        'cm-yellow': '#FFDC10',
        'cm-yellow-warm': '#F9B406',
        'cm-orange': '#F79200',
        'cm-cream': '#FAFAF7',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Lexend Deca"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
