<template>
  <div>
    <section class="section section-feed">
      <header class="row">
        <h2>Homefeed</h2>
      </header>
      <client-only placeholder="Loading...">
        <home-feed />
      </client-only>
      <noscript>
        <p>Please enable JavaScript.</p>
      </noscript>
    </section>
  </div>
</template>

<script>
/* Homefeed
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import HomeFeed from '~/components/HomeFeed.vue';

export default {
  name: 'Homefeed',
  middleware: 'auth',
  components: { HomeFeed },
  data() {
    return {
      title: 'Homefeed',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'Homefeed' },
        { hid: 'description', name: 'description', content: 'My custom description' },
      ],
    };
  },
  nuxtI18n: false,
};
</script>

<style lang="scss">
//
</style>
