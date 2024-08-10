import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        spartan: `"League Spartan", sans-serif`,
        antonio: `"Antonio", sans-serif`,
      },
      colors: {
        hover: "#323249",
        mercury: "#419db9",
        venus: "#eda44a",
        earth: "#6f2ed6",
        mars: "#d14e33",
        jupiter: "#d93b36",
        saturn: "#cb5020",
        uranus: "#1ec2a4",
        neptune: "#2d68f0",
      },
    },
  },
  safelist: [
    "bg-mercury",
    "bg-venus",
    "bg-earth",
    "bg-mars",
    "bg-jupiter",
    "bg-saturn",
    "bg-uranus",
    "bg-neptune",
    "border-b-mercury",
    "border-b-venus",
    "border-b-earth",
    "border-b-mars",
    "border-b-jupiter",
    "border-b-saturn",
    "border-b-uranus",
    "border-b-neptune",
    "text-mercury",
    "text-venus",
    "text-earth",
    "text-mars",
    "text-jupiter",
    "text-saturn",
    "text-uranus",
    "text-neptune",
  ],
  plugins: [],
};
export default config;
