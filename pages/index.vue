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
            <nuxt-link
              :to="localePath('/teaching-resources/')"
              title=""
              class="button button-primary"
              >View some resources</nuxt-link
            >
          </p>
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

export default {
  name: 'Homepage',
  data() {
    return {
      title: 'Home',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'Teach Starter' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Teach Starter offers a range of time-saving, educational teaching resources for primary school teachers. Download unit and lesson plans, educational posters, classroom games and activities, worksheets and more!',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
//
</style>
