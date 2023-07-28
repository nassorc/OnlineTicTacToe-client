/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-100": "var(--base-color-100)",
        "base-200": "var(--base-color-200)",
        "base-300": "var(--base-color-300)",
        "base-400": "var(--base-color-400)",
        "base-500": "var(--base-color-500)",
        "base-600": "var(--base-color-600)",
        "base-700": "var(--base-color-700)",

        "primary-400": "var(--primary-color-400)",
        "secondary-400": "var(--secondary-color-400)",

        "input-bg": "var(--input-bg)",

        "light-400": "#e8e8e8",

        "mute-400": "var(--mute-color-400)",

        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        // "primary-300": "var(--color-primary-300)",
        // "primary-400": "var(--color-primary-400)",
        // "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "primary-700": "var(--color-primary-700)",
        // "secondary-400": "var(--color-secondary-400)",
        "danger-100": "var(--color-danger-100)",
        "danger-200": "var(--color-danger-200)",
        "danger-300": "var(--color-danger-300)",
        "danger-400": "var(--color-danger-400)",
        "danger-500": "var(--color-danger-500)",
        "danger-600": "var(--color-danger-600)",
        "success-100": "var(--color-success-100)",
        "success-200": "var(--color-success-200)",
        "success-300": "var(--color-success-300)",
        "success-400": "var(--color-success-400)",
        "success-500": "var(--color-success-500)",
        "success-600": "var(--color-success-600)",
      },
      padding: {
        "header-size": "var(--header-size)",
      },
      width: {
        "header-size": "var(--header-size",
      },
      height: {
        "body-height": "var(--body-height)"
      }
    },
  },
  plugins: [],
}

