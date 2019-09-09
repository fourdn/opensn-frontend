<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Login</h1>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          label="Login"
          :class="{ 'has-error': submitting && invalidLogin }"
          v-model="user.login"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          :class="{ 'has-error': submitting && invalidPassword }"
          v-model="user.password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
      <p v-if="error.length" class="error-message">
        Login and password must be 3 chars or more.
      </p>
      <p v-else></p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="handleRegisterMode">Register </v-btn>
      <v-btn
        ref="submit"
        :color="invalidPassword || invalidLogin ? '#BBDEFB' : 'info'"
        @click="handleSubmit"
        >Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "../router";

export default {
  name: "Login",
  data() {
    return {
      user: {
        login: "",
        password: ""
      },
      showPassword: false,
      error: {
        login: false,
        password: false,
        message: "",
        length: false
      },
      submitting: false
    };
  },
  props: {
    currentUser: Object
  },
  mounted() {
    this.$nextTick(function() {
      if (
        this.currentUser &&
        (this.currentUser.login !== "" || this.currentUser.password !== "")
      ) {
        this.user.login = this.currentUser.login;
        this.user.password = this.currentUser.password;
      }
    });
  },
  computed: {
    invalidLogin() {
      return this.user.login.length < 3;
    },
    invalidPassword() {
      return this.user.password.length < 3;
    }
  },
  methods: {
    submitEvent: async function() {
      let formData =
        "login=" + this.user.login + "&password=" + this.user.password;

      let response = await fetch("/login", {
        method: "POST",
        body: formData
      });
      let result = await response.json();
      if (result && result.success === true) {
        this.$emit("contentMode", this.user, result);
      } else if (result) {
        this.error.message = result.message;
      } else {
        console.log(result);
      }
    },
    handleRegisterMode: function() {
      router.push({ name: "registration" });
    },
    handleSubmit() {
      this.clearStatus();
      this.submitting = true;
      if (this.invalidLogin || this.invalidPassword) {
        this.error.length = true;
        return;
      }
      this.submitEvent();
      this.error.login = false;
      this.error.password = false;
      this.submitting = false;
    },
    clearStatus() {
      this.error.message = "";
      this.error.length = false;
    }
  }
};
</script>
<style scoped>
.has-error {
  background-color: #ffebee;
}
.error-message {
  color: #d33e15;
}
</style>
