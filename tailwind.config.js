/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "lg1-bg": "hsl(280, 87%, 65%)",
        "lg2-bg": "hsl(192, 100%, 67%)",
        lt: "hsl(0, 0%, 100%)",
        "lt-1": "hsl(0, 0%, 98%)",
        "lt-2": "hsl(236, 33%, 92%)",
        "lt-3": "hsl(233, 11%, 84%)",
        "lt-4": "hsl(236, 9%, 61%)",
        "lt-5": "hsl(235, 19%, 35%)",
        "lt-blue": "hsl(220, 98%, 61%)",
        "dt-1": "hsl(235, 21%, 11%)",
        "dt-2": "hsl(235, 24%, 19%)",
        "dt-3": "hsl(234, 39%, 85%)",
        "dt-4": "hsl(236, 33%, 92%)",
        "dt-5": "hsl(234, 11%, 52%)",
        "dt-6": "hsl(233, 14%, 35%)",
        "dt-7": "hsl(237, 14%, 26%)",
      },
      maxWidth: {
        sm: "20.4375rem",
        md: "33.75rem",
      },
      minWidth: {
        sm: "20.4375rem",
        md: "33.75rem",
      },
      padding: {
        "14px": "0.875rem",
      },
      backgroundImage: {
        "mobile-img": "url('./images/bg-mobile-light.jpg')",
        "desktop-img": "url('./images/bg-desktop-light.jpg')",
      },
    },
  },
  plugins: [],
};
