<template>
  <div>
    <section class="section">
      <header>
        <h2>The Chalkboard</h2>
      </header>
      <div class="row collapse">
        <ul class="row block-grid small-up-1 medium-up-2 large-up-2">
          <template v-if="!posts">
            <li>
              <div class="card skeleton">
                <div></div>
                <h4></h4>
                <h3></h3>
                <p></p>
              </div>
            </li>
            <li>
              <div class="card skeleton">
                <div></div>
                <h4></h4>
                <h3></h3>
                <p></p>
              </div>
            </li>
          </template>
          <template v-else>
            <li v-for="post in posts" :key="post.id">
              <card :content="post" :url="'/blog/' + post.name + '?id=' + post.id" />
            </li>
          </template>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
/* Blog
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import Card from '~/components/Card.vue';
import axios from 'axios';
const apiResource = 'https://staging-api.teachstarter.com/v1/resource/';
const types = ['post'];

export default {
  name: 'Blog',
  components: {
    Card,
  },
  data() {
    return {
      title: 'The Chalkboard',
      error: null,
    };
  },
  async asyncData({ app, params, store }) {
    try {
      let response = await axios.get(apiResource, {
        params: { type: types, perPage: 10 },
        //headers: { 'Country-Code': app.i18n.locale },
      });
      const { data: { list = [] } = {} } = response;
      return { posts: list };
    } catch (error) {
      this.error = error.response ? error.response.data.error : error;
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'The Chalkboard' },
        { hid: 'description', name: 'description', content: 'Description' },
      ],
    };
  },
};
</script>

<style lang="scss">
//
</style>
