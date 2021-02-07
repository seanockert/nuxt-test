<template>
  <div>Loading...</div>
</template>

<script>
/* Comment form submit
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'Comment',
  layout: 'blank',
  async asyncData({ params, context, store, $axios }) {
    console.log('context', context);
    /*const postid = context.req.body.postid;
    const comment = context.req.body.comment;
    console.log('submit', context.req.body);
    return { id: id, comment: comment };*/
  },
  head() {
    return {
      title: 'Submitting comment...',
    };
  },
};
</script>

<style lang="scss">
//
</style>
