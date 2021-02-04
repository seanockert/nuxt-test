<template>
  <div>
    <!-- Free resources -->
    <resources-list
      :title="'Latest free resources in ' + region"
      :resources="freeResources"
      :error="freeResourcesError"
    />

    <!-- Unit plans -->
    <resources-list
      :title="'Unit Plans in ' + region"
      :resources="unitPlans"
      :error="unitPlansError"
    />

    <!-- All resources -->
    <resources-list
      :title="'Latest Resources in ' + region"
      :resources="resources"
      :loadMore="true"
      :error="resourcesError"
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
const resourceCount = 30;
const freeCount = 4;
const unitCount = 4;

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
    let data = {
      region: app.i18n ? app.i18n.t('name') : null,
    };

    // Indicate if this is loading client or serverside
    if (process.browser) {
      console.log('Client side load for ' + app.i18n.locale);
    }

    try {
      const paramsResources = {
        type: types,
        perPage: resourceCount,
        orderBy: 'viewCount',
      };
      const resources = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: paramsResources,
        headers: { 'Country-Code': app.i18n.locale },
      });

      data.resources = resources.data.list;
      data.resourcesError = null;
    } catch (error) {
      data.resourcesError = error;
    }

    try {
      const freeResources = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: { type: types, perPage: freeCount, free: 1 },
        headers: { 'Country-Code': app.i18n.locale },
      });

      data.freeResources = freeResources.data.list;
      data.freeResourcesError = null;
    } catch (error) {
      data.freeResourcesError = error;
    }

    try {
      const unitPlans = await $axios.get($axios.defaults.baseURL + '/public/v2/resource', {
        params: { type: 'unit-plan', perPage: unitCount },
        headers: { 'Country-Code': app.i18n.locale },
      });

      data.unitPlans = unitPlans.data.list;
      data.unitPlansError = null;
    } catch (error) {
      data.unitPlansError = error;
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
