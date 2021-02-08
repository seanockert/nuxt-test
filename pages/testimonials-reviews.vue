<template>
  <div>
    <section class="section row align-middle">
      <header class="columns small-12 medium-8">
        <img
          src="~/assets/images/banners/section-testimonials.png"
          alt="Teaching Resources"
          title="Teaching Resources"
          width="1680"
           height="596"
        />

        <h1>
          Testimonials &amp; Reviews
        </h1>
        <p>Our members are passionate about our resources and service. Find out why...</p>
      </header>

      <div class="columns small-12 medium-6 large-6">
        <div id="reviews-widget" style="width:100%;"></div>
      </div>
    </section>
    <script src="https://widget.reviews.io/rich-snippet-reviews-widgets/dist.js"></script>
    <script>
      richSnippetReviewsWidgets('reviews-widget', {
        store: 'teachstarter-com',
        widgetName: 'vertical',
        primaryClr: '#78bc3a',
        layout: 'fullWidth',
        height: 1000,
        numReviews: 200,
      });
    </script>
  </div>
</template>

<script>
/* Search
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'Search',
  data() {
    return {
      title: 'Search site',
    };
  },
  created() {},
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        {
          hid: 'description',
          name: 'description',
          content: '.',
        },
      ],
    };
  },
  nuxtI18n: false,
};
</script>

<style scoped lang="scss">
#reviews-widget,
#reviews-widget_frame {
  min-height: 1000px;
}
</style>
