import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // ← tells Vuetify to use Material Design Icons font
  },
  theme: {
    dark: false,
    default: "light",
    themes: {
      light: {
        primary:   "#0d9488",
        secondary: "#4f46e5",
        accent:    "#0891b2",
        error:     "#ef4444",
        warning:   "#f59e0b",
        info:      "#4f46e5",
        success:   "#22c55e",
        teal:      "#0d9488",
      },
    },
  },
});
