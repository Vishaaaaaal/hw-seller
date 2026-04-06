import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        silver: "var(--color-silver)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        panel: "0 18px 50px rgba(47, 91, 255, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(47, 91, 255, 0.16), transparent 30%), linear-gradient(135deg, rgba(47, 91, 255, 0.08), rgba(201, 211, 225, 0.2))",
      },
    },
  },
  plugins: [],
};

export default config;
