<template>
  <div>
    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <h3>Pricing Plans</h3>
        <h1>
          Resources your students will love.
        </h1>
        <p class="intro">
          Make your classroom buzz with thousands of inspiring, professional-grade teaching
          resources, and time-saving online learning tools.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
/* Plans
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'Plans',
  data() {
    return {
      title: 'Sign up to Teach Starter',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        {
          hid: 'description',
          name: 'description',
          content:
            'Join thousands of other teachers and gain access to a library of unique, high quality teaching resources to brighten your classroom and engage your students.',
        },
      ],
    };
  },
  nuxtI18n: false,
};
</script>

<style scoped lang="scss">
h1 {
  color: $ts-green-500;
}

h2 {
  font-size: $font-size-800;
}
</style>
