<template>
  <div>
    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <h1>
          Search results
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
/* Search
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'Search',
  data() {
    return {
      title: 'Search site',
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
          content: '.',
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
