/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
        tooSmall: "320px",
      },
      backgroundImage: {
        "text-gradient":
          "linear-gradient(94.49deg, #F8F8F8 33.29%, #E5AF0D 67.01%)",
      },
      boxShadow: {
        "custom-black": "0px 7.51px 15.03px 0px #00000014",
        "custom-gold": "0px 0px 3.76px 0px #E9BD36",
        "combined-hover":
          "0px 7.51px 15.03px 0px #00000014, 0px 0px 3.76px 0px #E9BD36",
        newOne: "-4px 4px 4px 0px #0000001A",
        "gold-combined":
          "4px 4px 1px 1px #E5AF0D1A, -4px -4px 1px 1px #E5AF0D1A",
        "custom-merged": `
          0px 22px 13px -18px #8774571A,
          0px 10px 9px -4px #8774571A,
          0px 1px 3px 0px #8774571A,
          0px 1px 2px 0px #8774571A,
          0px -1px 15px 0px #8774571A
        `,
      },
      colors: {
        d36: "#E9BD36",
        f0d: "#E5AF0D",
        ea: "#EAEAEA",
        bf: "#BFBFBF",
        color14: "#141414",
        e7: "#FCF7E7",
        zeroD: "#1018280D",
        oneA: "#1A1A1A",
        zeroA: "#A0A0A0",
        seven4: "#747474",
        five9: "#595959",
        a0: "#A0A0A0",
        twoC: "#2C2C2C",
        twoCA: "#2CCA2C",
        fc: "#FCF7E7",
        three0: "#303030",
        two2: "#222222",
        f9: "#F9FAFB",
        zero3: "#030712",
        fourB: "#4B5563",
        two2: "#222222",
        Dc: "#DC2626",
        two8: "#283C46",
        f4: "#F4DE9C",
      },
    },
  },
  plugins: [],
};
