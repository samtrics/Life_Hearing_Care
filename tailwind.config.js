import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "on-secondary-fixed": "#002020",
              "on-error-container": "#93000a",
              "error": "#ba1a1a",
              "tertiary-fixed-dim": "#ffb780",
              "tertiary-container": "#743b00",
              "outline": "#727780",
              "outline-variant": "#c2c7d1",
              "primary-fixed-dim": "#a0c9ff",
              "inverse-primary": "#a0c9ff",
              "on-secondary-fixed-variant": "#004f4f",
              "surface-container-low": "#f3f3f8",
              "secondary": "#006a6a",
              "on-primary": "#ffffff",
              "on-primary-fixed-variant": "#07497d",
              "on-surface": "#191c1f",
              "inverse-on-surface": "#f0f0f5",
              "on-primary-fixed": "#001c37",
              "primary-fixed": "#d2e4ff",
              "surface-container": "#ededf3",
              "on-tertiary-fixed-variant": "#6f3800",
              "secondary-fixed-dim": "#5bd9d8",
              "secondary-container": "#7af5f5",
              "inverse-surface": "#2e3034",
              "on-secondary": "#ffffff",
              "on-tertiary-container": "#f9a767",
              "primary-container": "#0f4c81",
              "on-tertiary-fixed": "#2f1400",
              "surface-bright": "#f9f9fe",
              "tertiary": "#532800",
              "surface-variant": "#e2e2e7",
              "on-primary-container": "#8ebdf9",
              "tertiary-fixed": "#ffdcc4",
              "on-background": "#191c1f",
              "surface-container-high": "#e7e8ed",
              "surface-dim": "#d9dadf",
              "background": "#f9f9fe",
              "secondary-fixed": "#7af5f5",
              "on-tertiary": "#ffffff",
              "surface-tint": "#2d6197",
              "surface": "#f9f9fe",
              "on-error": "#ffffff",
              "error-container": "#ffdad6",
              "surface-container-lowest": "#ffffff",
              "surface-container-highest": "#e2e2e7",
              "on-surface-variant": "#42474f",
              "on-secondary-container": "#007070",
              "primary": "#00355f"
          },
          "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
          },
          "spacing": {
              "xs": "4px",
              "gutter": "24px",
              "xl": "64px",
              "lg": "40px",
              "md": "24px",
              "sm": "12px",
              "base": "8px",
              "container-max": "1280px"
          },
          "fontFamily": {
              "headline-md-mobile": ["Plus Jakarta Sans"],
              "display-lg": ["Plus Jakarta Sans"],
              "title-lg": ["Plus Jakarta Sans"],
              "body-lg": ["Inter"],
              "headline-md": ["Plus Jakarta Sans"],
              "label-md": ["Inter"],
              "body-xl": ["Inter"],
              "display-lg-mobile": ["Plus Jakarta Sans"]
          },
          "fontSize": {
              "headline-md-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "700" }],
              "display-lg": ["48px", { "lineHeight": "60px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
              "title-lg": ["22px", { "lineHeight": "30px", "fontWeight": "600" }],
              "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
              "headline-md": ["30px", { "lineHeight": "38px", "fontWeight": "700" }],
              "label-md": ["16px", { "lineHeight": "24px", "letterSpacing": "0.01em", "fontWeight": "600" }],
              "body-xl": ["20px", { "lineHeight": "32px", "fontWeight": "400" }],
              "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
          }
      },
  },
  plugins: [
      forms,
      containerQueries,
  ],
}

