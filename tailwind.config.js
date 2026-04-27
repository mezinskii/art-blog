/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--bg)',
        ink: 'var(--fg)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [],
}
