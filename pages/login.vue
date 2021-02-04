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
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        });

        this.$router.push('/');
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
