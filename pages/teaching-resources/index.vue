<template>
  <div>
    <!-- Free resources -->
    <resources-list
      :title="'Latest free resources in ' + region"
      :resources="free.resources"
      :size="free.size"
      :error="free.error"
    />

    <!-- Unit plans -->
    <resources-list
      :title="'Unit Plans in ' + region"
      :resources="unitPlans.resources"
      :size="unitPlans.size"
      :error="unitPlans.error"
    />

    <!-- All resources -->
    <resources-list
      :title="'Latest Resources in ' + region"
      :resources="latest.resources"
      :size="latest.size"
      :error="latest.error"
      :params="latest.params"
      :loadMore="true"
    />
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

import ResourcesList from './ResourcesList.vue';

const types = 'teaching-resource'; //['teaching-resource', 'resource-pack'];

export default {
  name: 'Resources',
  components: {
    ResourcesList,
  },
  data() {
    return {
      title: 'Teaching Resources',
      description: 'Teaching Resources, Printables, Games, Activities & Worksheets | Teach Starter',
    };
  },
  async asyncData({ app, $axios }) {
    const data = {
      latest: {
        resources: [],
        params: {
          country: app.i18n.locale,
          type: types,
          perPage: 32,
          orderBy: 'viewCount',
        },
        size: 0,
        error: null,
      },
      free: {
        params: {
          country: app.i18n.locale,
          type: types,
          perPage: 4,
          free: 1,
        },
        size: 0,
        error: null,
      },
      unitPlans: {
        params: {
          country: app.i18n.locale,
          type: 'unit-plan',
          perPage: 4,
        },
        size: 0,
        error: null,
      },
      region: app.i18n ? app.i18n.t('name') : null,
    };

    // Indicate if this is loading client or serverside
    if (process.browser) {
      console.log('Client side load for ' + app.i18n.locale);
    }

    try {
      const latest = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: data.latest.params,
      });

      data.latest.resources = latest.data.list;
      data.latest.size = latest.data.size;
    } catch (error) {
      data.latest.error = error.response ? error.response.data.error : error;
    }

    try {
      const free = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: data.free.params,
      });

      data.free.resources = free.data.list;
      data.free.size = free.data.size;
    } catch (error) {
      data.free.error = error.response ? error.response.data.error : error;
    }

    try {
      const unitPlans = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: data.unitPlans.params,
      });

      data.unitPlans.resources = unitPlans.data.list;
      data.unitPlans.size = unitPlans.data.size;
    } catch (error) {
      data.unitPlans.error = error.response ? error.response.data.error : error;
    }

    return data;
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og-site_name', property: 'og:site_name', content: 'Teach Starter' },
        { hid: 'og-type', property: 'og:type', content: 'Website' },
        { hid: 'og-fb-pages', property: 'og:fb-pages', content: '265997220134314' },
      ],
    };
  },
};
</script>

<style lang="scss">
//
</style>
