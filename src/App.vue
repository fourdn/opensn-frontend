<template>
    <v-app style="background: url('./assets/background.svg') no-repeat; background-size: cover">
        <v-app-bar app>
            <!-- -->
        </v-app-bar>

        <v-content>
            <Login
                    v-if="mode === 'login'"
                    class="action"
                    @registerMode="toggleRegisterMode"
                    @contentMode="toggleContentMode"
                    v-bind:currentUser="this.user"
            />
            <Registration
                    v-else-if="mode === 'register'"
                    class="action"
                    @loginMode="toggleLoginMode"
                    v-bind:currentUser="this.user"
            />
            <ContentList
                    v-else-if="mode === 'content'"
                    class="content"
                    v-bind:currentUser="this.user"
            />
            <div v-else>
                <!-- empty -->
            </div>
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
  import Login from '@/components/Login';
  import Registration from '@/components/Registration';
  import ContentList from '@/components/ContentList';

  export default {
    name: 'App',
    components: {
      Login,
      Registration,
      ContentList,
    },
    data() {
      return {
        showPassword: false,
        mode: 'login',
        user: {
          login: '',
          password: '',
        },
      };
    },
    methods: {
      toggleLoginMode: function(user) {
        this.mode = 'login';
        this.user = user;
      },
      toggleRegisterMode: function(user) {
        this.mode = 'register';
        this.user = user;
      },
      toggleContentMode: function(user) {
        this.mode = 'content';
        this.user = user;
      },
    },
  };
</script>

<style scoped>
    body, html {
        height: 100%;
        width: 100%;
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .content {

    }
</style>
