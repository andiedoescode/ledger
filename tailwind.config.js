module.exports = {
  content: ["./views/**/*.ejs"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1a7de5",
          "secondary": "#008a62",
          "accent": "#c86003",
          "neutral": "#424656",
          "base-100": "#F2F2F8",
          "info": "#82A3D9",
          "success": "#00984c",
          "warning": "#F2A63A",
          "error": "#F17165",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}