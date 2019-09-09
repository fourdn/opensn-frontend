<template>
  <v-app>
    <v-app-bar app>
      <router-link :to="{ name: 'login' }" class="r-link">Login</router-link>
      <router-link :to="{ name: 'registration' }" class="r-link"
        >Registration</router-link
      >
      <router-link
        :to="{ name: 'user', params: { id: this.id } }"
        class="r-link"
        >User</router-link
      >
    </v-app-bar>

    <v-content class="content">
      <router-view class="view"></router-view>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      login: state => state.user.login,
      password: state => state.user.password,
      id: state => state.user.id
    })
  },
  methods: {
    ...mapActions("user", ["setLogin", "setPassword", "setId"])
  }
};
</script>

<style scoped>
body,
html {
  height: 100%;
  width: 100%;
}

.r-link {
  margin-left: 100px;
}
.content {
  background: url("./assets/background.svg") no-repeat;
  background-size: cover;
}
</style>
