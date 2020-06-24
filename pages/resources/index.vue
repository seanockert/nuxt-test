<template>
  <div>
    <!-- Free resources -->
    <section class="section">
      <header class="row">
        <h2>Free Resources in {{ region }}</h2>
      </header>

      <ul class="row block-grid small-up-1 medium-up-4 large-up-4">
        <template v-if="!freeResources">
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
          <li v-for="resource in freeResources" :key="resource.id">
            <card :content="resource" :url="'/resources/' + resource.name" />
          </li>
        </template>
      </ul>
    </section>

    <!-- Unit plans -->
    <section class="section">
      <header class="row">
        <h2>Unit Plans in {{ region }}</h2>
      </header>

      <ul class="row block-grid small-up-1 medium-up-4 large-up-4">
        <template v-if="!unitPlans">
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
          <li v-for="resource in unitPlans" :key="resource.id">
            <card :content="resource" :url="'/resources/' + resource.name" />
          </li>
        </template>
      </ul>
    </section>

    <!-- All resources -->
    <section class="section">
      <header class="row">
        <div>
          <h2>
            Latest Resources in {{ region }}

            <span v-if="resources">
              (
              <strong>{{
                moreResources ? resources.length + moreResources.length : resources.length
              }}</strong>
              {{ 'resource' | pluralise(resources.length) }})
            </span>
          </h2>
        </div>
      </header>

      <ul class="row block-grid small-up-1 medium-up-2 large-up-3">
        <template v-if="!resources">
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
          <li v-for="resource in resources" :key="resource.id">
            <card :content="resource" :url="'/resources/' + resource.name" />
          </li>
        </template>
      </ul>
      <p v-if="!moreResources" class="text-center" style="width:100%">
        <button @click="loadMore(2)" class="button button-block">
          Load 30 more
        </button>
      </p>
      <ul v-else class="row block-grid small-up-1 medium-up-2 large-up-3">
        <li v-for="resource in moreResources" :key="resource.id">
          <card :content="resource" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
/* Resources
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
const types = ['teaching-resource', 'resource-pack'];

export default {
  name: 'Resources',
  components: {
    Card,
  },
  data() {
    return {
      title: 'Resources',
      moreResources: null,
    };
  },
  async asyncData({ app, params }) {
    if (process.browser) {
      console.log('Client side load for ' + app.i18n.locale);
    }
    try {
      // Proxy: '/api/v1/resource/'
      let resources = await axios.get(apiResource, {
        params: { type: types, perPage: 30 },
        //headers: { 'Country-Code': app.i18n.locale },
      });

      let freeResources = await axios.get(
        'https://staging-api.teachstarter.com/v1/dashboard/teaching-resource/free',
        {
          params: { type: types, perPage: 4 },
          //headers: { 'Country-Code': app.i18n.locale },
        }
      );

      let unitPlans = await axios.get(apiResource, {
        params: { type: ['unit-plan'], perPage: 4 },
        //headers: { 'Country-Code': app.i18n.locale },
      });

      return {
        resources: resources.data.list,
        freeResources: freeResources ? freeResources.data.list : null,
        unitPlans: unitPlans ? unitPlans.data.list : null,
        region: app.i18n ? app.i18n.t('name') : null,
      };
    } catch (error) {
      console.log(error);
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'Resources' },
        { hid: 'description', name: 'description', content: 'Description' },
      ],
    };
  },
  methods: {
    async loadMore(page = 1) {
      try {
        let response = await axios.get(apiResource, { params: { perPage: 30, page: page } });
        const { data: { list = [] } = {} } = response;
        this.moreResources = list;
      } catch (error) {
        console.log(error);
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

<style lang="scss">
//
</style>
