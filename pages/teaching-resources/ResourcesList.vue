<template>
  <section class="section">
    <header v-if="title" class="row">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
        <p>
          <small v-if="size > 0" class="text-mute"
            >{{ size | numberWithCommas }} {{ 'resource' | pluralise(size) }}</small
          >
        </p>
      </div>
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
          <card :content="resource" :url="'/teaching-resources/' + resource.id" />
        </li>
      </ul>

      <div v-else class="callout">No resources found</div>

      <template v-if="loadMore">
        <div v-if="moreResourcesError" class="callout">{{ moreResourcesError }}</div>
        <ul
          v-else-if="moreResources.length > 0"
          class="row block-grid small-up-1 medium-up-4 large-up-4"
        >
          <li v-for="resource in moreResources" :key="resource.id">
            <card :content="resource" />
          </li>
        </ul>
        <div class="text-center">
          <button @click="loadResources(page)" class="button button-block">
            Load more
          </button>
        </div>
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
 * @props: String error, Boolean loadMore, Object params, Array resources
 * @components: Card
 * @methods: loadResources
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
        return {
          types: 'teaching-resource',
          perPage: 30,
        };
      },
    },
    resources: {
      type: Array,
    },
    size: {
      type: Number,
    },
    title: { type: String },
    subtitle: { type: String },
  },
  data() {
    return {
      moreResources: [],
      moreResourcesError: null,
      page: 2,
    };
  },
  methods: {
    async loadResources(page = 1) {
      let params = this.params;
      params.page = page;

      try {
        let response = await this.$axios.get(this.$axios.defaults.baseURL + '/public/v2/resource', {
          params: params,
        });
        const { data: { list = [] } = {} } = response;
        this.moreResources = list;
        this.page++; // Increment page
      } catch (error) {
        this.moreResourcesError = error;
      }
    },
  },
  filters: {
    numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    pluralise(string, count = 1) {
      return count != 1 ? (string += 's') : string;
    },
  },
};
</script>
