<template>
  <div>
    <section class="section section-hero">
      <div class="row align-middle">
        <div class="columns small-12 medium-6 large-5">
          <h1 v-if="$i18n.locale === 'us'">Hey US people, make your classroom buzz!</h1>
          <h1 v-else>Make your classroom buzz!</h1>
          <p class="intro">
            Easily download ready-to-use, curriculum aligned teaching resources expertly designed
            for primary school teachers and their students.
          </p>
          <p>
            <nuxt-link :to="localePath('/resources')" title="" class="button button-primary"
              >View some resources</nuxt-link
            >

            <nuxt-link to="/feed" title="" class="button button-outlined">Or homefeed</nuxt-link>
          </p>

          <!--<Netlify1 />-->
        </div>

        <div class="columns small-12 medium-6 large-7">
          <img src="https://placekitten.com/800/400" alt="" />
        </div>
      </div>
    </section>

    <br /><br />
  </div>
</template>

<script>
/* Homepage
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import Netlify1 from '~/components/Netlify1.vue';

export default {
  name: 'Homepage',
  components: {
    Netlify1,
  },
  data() {
    return {
      title: 'Home',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'Teach Starter home' },
        { hid: 'description', name: 'description', content: 'My custom description' },
      ],
    };
  },
};
</script>

<style lang="scss">
//
</style>
