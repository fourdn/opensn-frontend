import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        "v-application": {
          background: ""
        }
      },
      dark: {
        background: ""
      }
    }
  },
  icons: {
    iconfont: "mdi"
  }
});
