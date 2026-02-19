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
        bg: "#F7F5F0",
        surface: "#FFFFFF",
        ink: "#141414",
        muted: "#5A5A5A",
        accent: "#2F3A2E",
        border: "rgba(20,20,20,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px",
      },
      boxShadow: {
        soft: "0 2px 16px rgba(20,20,20,0.06)",
        card: "0 4px 24px rgba(20,20,20,0.07)",
        lift: "0 8px 32px rgba(20,20,20,0.10)",
      },
      spacing: {
        section: "7rem",
        "section-sm": "4rem",
      },
    },
  },
  plugins: [],
};

export default config;
