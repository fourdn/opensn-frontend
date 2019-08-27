<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title class="pb-0">
                <h1>Registration</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                    <v-text-field
                            label="Login"
                            :class="{ 'has-error': submitting && invalidLogin }"
                            prepend-icon="mdi-account-circle"
                            type="text"
                            v-model="user.login"
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
                <p
                        v-if="error && submitting"
                        class="error-message"
                >Login and password must be 3 chars or more.</p>
                <p
                        v-if="errorMessage.length > 0"
                        class="error-message"
                >{{this.errorMessage}}</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="success" @click="handleLoginMode">Login</v-btn>
                <v-btn color="info" @click="handleSubmit">Register</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>

  export default {
    name: 'Registration',
    data() {
      return {
        user: {
          login: '',
          password: '',
        },
        error: false,
        errorMessage: '',
        submitting: false,
        showPassword: false,
        poolData: null,
      };
    },
    props: {
      currentUser: Object,
    },
    mounted() {
      this.$nextTick(function () {
        if (this.currentUser && (this.currentUser.login !== "" || this.currentUser.password !== "")) {
          this.user.login = this.currentUser.login;
          this.user.password = this.currentUser.password;
        }
      })
    },
    computed: {
      invalidLogin() {
        return this.user.login.length < 3;
      },
      invalidPassword() {
        return this.user.password.length < 3;
      },
    },
    methods: {
      async submitEvent() {

        let formData = 'login=' + this.user.login + '&password=' + this.user.password;

        let response = await fetch('/registration', {
          method: 'POST',
          body: formData,
        });
        let result = await response.json();
        if (result && result.success === true) {
          this.$emit('loginMode', this.user, 'Registration successful. Now you may login');
        } else if (result && result.statusCode === 1) {
          this.errorMessage = "Username is already taken. Try another one";
        } else {
          console.log(result);
        }
      },
      handleLoginMode() {
        this.$emit('loginMode', {login: this.user.login, password: this.user.password});
      },
      handleSubmit() {
        this.clearStatus();
        this.submitting = true;
        if (this.invalidLogin || this.invalidPassword) {
          this.error = true;
          return;
        }
        this.submitEvent();
        this.error = false;
        this.submitting = false;
      },
      clearStatus() {
        this.error = false;
        this.errorMessage = '';
      },
    },
  };
</script>

<style scoped>
    .has-error {
        background-color: #FFEBEE;
    }
    .error-message {
        color: #d33e15;
    }
</style>
