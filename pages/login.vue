<template>
  <section class="section row align-middle">
    <div class="columns small-12 medium-6 large-6">
      <header>
        <h1>Login</h1>
      </header>

      <div v-if="error" class="callout">{{ error }}</div>

      <form @submit.prevent="login" action="#" method="post">
        <div class="form-item">
          <label for="username">Username / Email</label>
          <input
            type="text"
            id="username"
            v-model="username"
            inputmode="email"
            autofocus
            autocomplete="username"
            required
          />
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="current-password"
            required
          />
        </div>

        <div>
          <button v-if="loggingIn" type="submit" class="button button-default" disabled="true">
            Logging In...
          </button>
          <button v-else type="submit" class="button button-primary">Log In</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
/* Login form
 *
 *
 * @parent: /login
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods: login
 */

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      redirect: '/',
      title: 'Login',
      loggingIn: false,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: 'Login to your Teach Starter account' },
      ],
    };
  },
  asyncData({ from }) {
    // Get last route
    return { from: from };
  },
  nuxtI18n: false,
  methods: {
    async login() {
      if (this.username && this.password) {
        this.loggingIn = true;

        try {
          const response = await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password,
            },
          });

          this.$auth.setUser(response.data.user);
          this.error = null;

          if (this.from) {
            // Return to previous page after login
            this.redirect = this.from.fullPath;
          }

          this.$router.push(this.redirect);
        } catch (error) {
          this.error = error.response ? error.response.data.error : error;
          this.loggingIn = false;
        }
      } else {
        this.error = 'Please enter your username and password';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
