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
        ink: {
          950: "#070b10",
          900: "#0c1219",
          800: "#121a24",
          700: "#1a2533",
          600: "#243142",
        },
        phosphor: {
          400: "#5eead4",
          500: "#2dd4bf",
          600: "#14b8a6",
        },
        amber: {
          signal: "#f59e0b",
          dim: "#b45309",
        },
        steel: {
          300: "#94a3b8",
          400: "#64748b",
          500: "#475569",
        },
        alert: {
          red: "#f87171",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(45, 212, 191, 0.12), 0 8px 32px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
