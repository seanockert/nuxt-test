<template>
  <div>Downloading... {{ id }} {{ filename }} {{ url }}</div>
</template>

<script>
/* Download form
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'Download',
  async asyncData({ params, store, $axios }) {
    console.log('jere');
    console.log(params);

    try {
      const response = await $axios.$get($axios.defaults.baseURL + '/v1/file', {
        params: { id: parseInt(params.id) },
      });

      if (response.url) {
        location.href = response.url;
      }

      return {
        filename: response.filename,
        url: response.url,
      };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  },
  head() {
    return {
      title: 'Downloading...',
      meta: [
        { hid: 'title', name: 'title', content: 'Downloading...' },
        { hid: 'description', name: 'description', content: 'Downloading...' },
      ],
    };
  },
};
</script>

<style lang="scss">
//
</style>
