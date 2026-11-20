import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Institutional Forest Green ──
        surface: {
          DEFAULT: "#0E2018",   // deep background
          card:    "#132A1E",   // card/section surface
          hover:   "#1A3526",   // hover state surface
          border:  "#1E3D2A",   // hairline border default
        },
        // ── Brass Gold Accent ──
        gold: {
          DEFAULT: "#C9A227",
          light:   "#D4AF37",
          dim:     "#8A6E1A",
        },
        // ── Cream Text ──
        cream: {
          DEFAULT: "#EDEDE8",
          muted:   "#8A9E90",
          dim:     "#4A5E52",
        },
        // ── Legacy aliases (for old components that still use these) ──
        primary: {
          DEFAULT: "#C9A227",
          light:   "#D4AF37",
          dark:    "#8A6E1A",
        },
        dark: {
          DEFAULT: "#0E2018",
          card:    "#132A1E",
          border:  "#1E3D2A",
          hover:   "#1A3526",
        },
        text: {
          DEFAULT: "#EDEDE8",
          muted:   "#8A9E90",
          dim:     "#4A5E52",
        },
      },
      fontFamily: {
        serif:   ["Fraunces", "Georgia", "serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Menlo", "monospace"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
        widest3: "0.22em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "surface-gradient": "linear-gradient(160deg, #0E2018 0%, #132A1E 50%, #0A1A12 100%)",
        "gold-gradient":    "linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #C9A227 100%)",
        "header-gradient":  "linear-gradient(180deg, #132A1E 0%, #0E2018 100%)",
      },
      animation: {
        "fade-in":    "fadeIn 0.7s ease-out",
        "slide-up":   "slideUp 0.7s ease-out",
        "float":      "float 7s ease-in-out infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4,0,0.6,1) infinite",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
      boxShadow: {
        card:       "0 1px 0 0 rgba(201,162,39,0.12), 0 4px 24px rgba(0,0,0,0.5)",
        "card-hover":"0 0 0 1px rgba(201,162,39,0.35), 0 8px 40px rgba(0,0,0,0.6)",
        "gold-glow": "0 0 20px rgba(201,162,39,0.3)",
        "gold-sm":   "0 0 10px rgba(201,162,39,0.2)",
        inner:       "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
