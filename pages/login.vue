<template>
  <div>
    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <header>
          <h1>Login</h1>
          <br />
        </header>

        <login-form :from="from" />
      </div>
    </section>
  </div>
</template>

<script>
/* Login form
 *
 *
 * @parent: /login
 * @requests: /v1/login
 * @events:
 * @props:
 * @components:
 * @methods: login
 */

import LoginForm from '~/components/LoginForm.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
  },
  data() {
    return {
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
  asyncData({ from }) {
    // Get last route
    return { from: from };
  },
  nuxtI18n: false,
};
</script>

<style lang="scss" scoped></style>
