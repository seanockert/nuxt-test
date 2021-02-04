<template>
  <section class="section">
    <header v-if="title" class="row">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </header>

    <div class="row">
      <div v-if="error" class="callout">{{ error }}</div>

      <ul v-else-if="!resources" class="row block-grid small-up-1 medium-up-4 large-up-4">
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
      </ul>

      <ul v-else-if="resources.length > 0" class="row block-grid small-up-1 medium-up-4 large-up-4">
        <li v-for="resource in resources" :key="resource.id">
          <card :content="resource" :url="'/resources/' + resource.id" />
        </li>
      </ul>

      <div v-else class="callout">No resources found</div>

      <template v-if="loadMore">
        <div v-if="moreResourcesError" class="callout">{{ moreResourcesError }}</div>
        <div v-else-if="!moreResources" class="text-center">
          <button @click="loadResources(2)" class="button button-block">
            Load more
          </button>
        </div>
        <ul v-else class="row block-grid small-up-1 medium-up-2 large-up-3">
          <li v-for="resource in moreResources" :key="resource.id">
            <card :content="resource" />
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script>
/* List of resources
 *
 * @parent: /resources/index
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import Card from '~/components/Card.vue';

export default {
  name: 'ResourcesList',
  components: {
    Card,
  },
  props: {
    error: { type: String },
    loadMore: { type: Boolean, default: false },
    params: {
      type: Object,
      default() {
        return { types: 'teaching-resource', perPage: 30 };
      },
    },
    resources: {
      type: Array,
    },
    title: { type: String },
    subtitle: { type: String },
  },
  data() {
    return {
      moreResources: null,
      moreResourcesError: null,
    };
  },
  methods: {
    async loadResources(page = 1) {
      let params = this.params;
      params.page = page;

      try {
        let response = await this.$axios.get(this.$axios.defaults.baseURL + '/public/v2/resource', {
          params: params,
          headers: { 'Country-Code': this.i18n.locale },
        });
        const { data: { list = [] } = {} } = response;
        this.moreResources = list;
      } catch (error) {
        console.log(error);
        this.moreResourcesError = error;
      }
    },
  },
  filters: {
    pluralise(string, count = 1) {
      return count != 1 ? (string += 's') : string;
    },
  },
};
</script>
