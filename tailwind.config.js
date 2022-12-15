module.exports = {
  content: ["./views/**/*.ejs", "./node_modules/tw-elements/dist/js/**/*.js"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#008a62",
          "accent": "#c86003",
          "neutral": "#424656",
          // "base-100": "#E0E0E5",
          "base-100": "#f3f4f6",
          "info": "#82A3D9",
          // "info": "#0D0630",
          "success": "#00984c",
          "warning": "#F2A63A",
          "error": "#ea580c",
          "darken": "#0D0630",

        },
        container: {
          center: true,
        }
      },
    ],
  },

  plugins: [require("daisyui", "tw-elements/dist/plugin")],
}