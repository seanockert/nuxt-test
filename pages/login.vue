<template>
  <section class="section row align-middle">
    <div class="columns small-12 medium-6 large-6">
      <header>
        <h1>Login</h1>
      </header>

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
          <button type="submit" class="button button-primary">Log In</button>
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
  nuxtI18n: false,
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        });
        console.log(response);
        //this.$auth.setUser(response.data);

        this.$router.push(this.redirect);
      } catch (error) {
        console.log('error', error);
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
