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
      backgroundColor: {
        hover: "hsl(240, 19%, 24%)",
        mercury: "hsl(194, 48%, 49%)",
        venus: "hsl(33, 82%, 61%)",
        earth: "hsl(263, 67%, 51%)",
        mars: "hsl(10, 63%, 51%)",
        jupiter: "hsl(2, 68%, 53%)",
        saturn: "hsl(17, 73%, 46%)",
        uranus: "hsl(169, 73%, 44%)",
        neptune: "hsl(222, 87%, 56%)",
        pluto: "hsl(0, 100%, 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
