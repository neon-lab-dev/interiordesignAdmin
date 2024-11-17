/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          10: "#1C1C1C",
          20: "#202020",
          30: "#353434",
          40: "#3B3B3B",
          50: "#2F2F36",
        },
        accent: {
          10: "#8881EA",
          20: "#42A4FF",
          30: "#60AFBD",
          40: "#805AD6",
        },
        text: {
          primary: "#A8A7A7",
          secondary: "A6A6A6",
          tertiary: "#D9D9D9",
          tertiary10: "#D8D8D8",
          accent: "#C8C8C8",
          accent10: "#7E7E7E",
          muted: "#969696",
        },
        error: "#FD5454",
        process: "#FCBE2D",
        success: "#00B69B",
        border: {
          10: "#505050",
          20: "#979797",
          30: "#585555",
          40: "#C3C3C3",
        },
        icons: {
          purlpe: "#8280FF",
          yellow: "#FEC53D",
          green:"#19AE8A",
          red:"#FF6C6C",
          lightGreen:"#4AD991",
          orange:"#FF9066",
          gray:"#A9A9A9",
          blue:"#0047AB"
        },
      },
      letterSpacing: {
        "-0.11": "-0.11px",
      },
      boxShadow: {
        statusCard: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* Hides scrollbar for WebKit browsers */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
