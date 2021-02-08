<template>
  <div>
    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <header>
          <h1>Reset your password</h1>
          <br />
        </header>
        ...
      </div>
    </section>
  </div>
</template>

<script>
/* Reset password form
 *
 *
 * @parent: /
 * @requests: /v1/
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'PasswordReset',
  data() {
    return {
      title: 'Reset your password',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: '' },
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
