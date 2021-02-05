<template>
  <div>
    <main-header />
    <main role="main">
      <nuxt />
    </main>
    <main-footer />
  </div>
</template>

<script>
/* Default layout
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import MainHeader from '~/components/MainHeader.vue';
import MainFooter from '~/components/MainFooter.vue';

export default {
  name: 'default',
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
</style>
