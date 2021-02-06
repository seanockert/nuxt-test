<template>
  <div>
    <div v-if="resourceError" class="callout">{{ resourceError }}</div>
    <div v-if="!resource" class="section skeleton">
      <h3></h3>
      <h2></h2>
      <figure></figure>
      <p></p>
      <p></p>
    </div>
    <template v-else>
      <div :class="['row', 'type-' + resource.type]">
        <div class="columns small-12 medium-8 large-7">
          <header>
            <h2>
              <nuxt-link :to="localePath('/teaching-resources')" title="">
                &larr;
              </nuxt-link>
              {{ resource.typeFormatted }}
            </h2>
            <h1>{{ resource.name }}</h1>
          </header>

          <section class="section section-actions flex">
            <download-button :id="8958" :files="resource.files" />

            <div class="pull-right">
              <ul class="inline-list">
                <li>
                  <button
                    @click="like"
                    :class="{ button: true, 'button-link': true, active: resource.like.checked }"
                    title="Like this resource"
                  >
                    <svg class="icon" role="img" aria-hidden="true">
                      <use xlink:href="~/assets/images/fa-icons.svg#heart-empty"></use>
                    </svg>
                    {{ resource.like.count }}
                  </button>
                </li>
                <li>
                  <button
                    @click="bookmark"
                    :class="{
                      button: true,
                      'button-link': true,
                      active: resource.bookmark.checked,
                    }"
                    title="Bookmark this resource"
                  >
                    <svg class="icon" role="img" aria-hidden="true">
                      <use xlink:href="~/assets/images/fa-icons.svg#bookmark-empty"></use>
                    </svg>
                    {{ resource.bookmark.count }}
                  </button>
                </li>
                <li>
                  <a href="#comments" class="button button-link" title="Scroll to comments">
                    <svg class="icon" role="img" aria-hidden="true">
                      <use xlink:href="~/assets/images/fa-icons.svg#comment"></use>
                    </svg>
                    {{ resource.commented.count }}
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section class="callout callout-details">
            <a
              href="https://www.teachstarter.com/publisher/teachstarter/"
              title="View resources from this publisher"
              ><img
                src="https://www.teachstarter.com//wp-content/uploads/2020/01/TS_logo_3000px-150x150.png"
                alt="Teach Starter Publishing"
                height="32"
                width="32"
            /></a>
            <div>PDF <span>|</span> 7 pages<span>|</span>Years: <strong>F - 4</strong></div>
          </section>

          <section class="section section-content">
            <p>
              <strong>{{ resource.excerpt }}</strong>
            </p>
            <pre v-if="resource.content" v-html="resource.content"></pre>
          </section>

          <section v-if="resource.curriculum.length > 0" class="section section-curriculum">
            <h3>Curriculum</h3>
            <ul v-for="code in resource.curriculum" :key="code.id" class="curriculum-list">
              <li>
                <a :href="code.link" title="View other resources in this curriculum code">
                  <h4>{{ code.name }}</h4>
                  <div v-html="code.description"></div>
                  <small class="breadcrumbs">Breadcrumb: {{ code.breadcrumb }}</small>
                </a>
              </li>
            </ul>
          </section>

          <section v-if="resource.author" class="section section-author">
            <h3>Author</h3>

            <div class="flex">
              <figure>
                <img :src="resource.author.photo.url" class="circle" height="42" width="42" />
              </figure>

              <span>{{ resource.author.displayName }}</span>
            </div>
          </section>

          <section v-if="resource.categories.length > 0" class="section section-categories">
            <h3>Categories</h3>
            <ul v-for="category in resource.categories" :key="category.id">
              <li>
                <a :href="'/category/' + category.slug" title="">{{ category.name }}</a>
              </li>
            </ul>
          </section>

          <section class="section section-categories">
            <h3>Related resources</h3>
            <ul v-for="resource in related" :key="resource.id">
              <li>
                <card :content="resource" :url="'/teaching-resources/' + resource.id" />
              </li>
            </ul>
          </section>
        </div>

        <aside class="columns small-12 medium-4 large-5">
          <ul class="gallery">
            <li v-for="(item, index) in sanitiseMedia(resource.media)" :key="item.id">
              <figure>
                <img
                  :src="item.src"
                  :alt="item.alt"
                  :height="item.h"
                  :width="item.w"
                  loading="lazy"
                  class="preview-img-item"
                  @click="$photoswipe.open(index, sanitiseMedia(resource.media))"
                />
              </figure>
            </li>
          </ul>
        </aside>
      </div>

      <section class="section" id="comments">
        <div class="row">
          <div class="columns small-12 medium-6 large-6">
            <h2>Comments</h2>
            <comment-form :id="8958" />

            <div v-if="commentsError" class="callout">{{ commentsError }}</div>
            <ul v-else class="no-list">
              <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
            </ul>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
/* A resource
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import DownloadButton from '~/components/DownloadButton.vue';
import DropdownMenu from '~/components/DropdownMenu.vue';
import Card from '~/components/Card.vue';
import Comment from '~/components/Comment.vue';
import CommentForm from '~/components/CommentForm.vue';

export default {
  name: 'Resource',
  components: {
    Card,
    Comment,
    CommentForm,
    DownloadButton,
    DropdownMenu,
  },
  data() {
    return {
      title: null,
    };
  },
  async asyncData({ params, store, payload, $axios }) {
    const data = {
      resource: {},
      comments: [],
      related: [],
      resourceError: null,
      commentsError: null,
      relatedError: null,
      title: 'Resource',
      description: 'A teaching resource',
      featuredImage: '',
    };

    // From resource: https://www.teachstarter.com/au/teaching-resource/alphabet-handwriting-sheets-individual/
    const testId = 8958;

    try {
      const resource = await $axios.$get($axios.defaults.baseURL + '/public/v2/resource', {
        params: { id: parseInt(params.slug) },
      });

      data.resource = resource;
      data.title = resource.name;
      data.description = resource.excerpt;
      data.featuredImage = resource.media && resource.media[0] ? resource.media[0].cdn : '';
    } catch (error) {
      data.resourceError = error.response ? error.response.data.error : error;
    }

    try {
      const comments = await $axios.$get($axios.defaults.baseURL + '/v1/comment', {
        params: { id: testId },
      });

      data.comments = comments.list;
    } catch (error) {
      data.commentsError = error.response ? error.response.data.error : error;
    }

    try {
      const related = await $axios.$get($axios.defaults.baseURL + '/v1/resource/related', {
        params: { id: testId },
      });

      data.related = related.list;
    } catch (error) {
      data.relatedError = error.response ? error.response.data.error : error;
    }

    return data;
  },
  validate({ params }) {
    return true;
    // return /\s/g.test(params.slug);
  },
  data() {
    return {
      title: 'Resource',
      loading: true,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title },
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og-title', property: 'og:title', content: this.title },
        { hid: 'og-description', property: 'og:description', content: this.description },
        { hid: 'og-image', property: 'og:image', content: this.featuredImage || '' },
        { hid: 'og-image-width', property: 'og:image:width', content: '600' },
        { hid: 'og-image-height', property: 'og:image:height', content: '1200' },
        { hid: 'og-image-height', property: 'og:image:height', content: '630' },
        { hid: 'og-url', property: 'og:url', content: this.$route.path },
        { hid: 'og-site_name', property: 'og:site_name', content: 'Teach Starter' },
        { hid: 'og-type', property: 'og:type', content: 'Website' },
        { hid: 'og-fb-pages', property: 'og:fb-pages', content: '265997220134314' },
      ],
    };
  },
  nuxtI18n: false,
  methods: {
    async like() {
      try {
        const response = await this.$store.dispatch('likeResource', {
          id: this.resource.id,
          count: this.resource.like.count,
          checked: this.resource.like.checked,
        });
        this.resource.like = response;
      } catch (error) {
        error.response ? error.response.data.error : error;
      }
    },
    async bookmark() {
      try {
        const response = await this.$store.dispatch('bookmarkResource', {
          id: this.resource.id,
          count: this.resource.bookmark.count,
          checked: this.resource.bookmark.checked,
        });
        this.resource.bookmark = response;
      } catch (error) {
        error.response ? error.response.data.error : error;
      }
    },
    sanitiseMedia(media) {
      // This stuff should be fixed on server side
      const extractPreviews = media.filter(item => {
        if (item.filename.substring(item.filename.length - 9) == 'landscape') {
          return item;
        }
      });

      return extractPreviews.map(item => {
        return {
          src: item.cdn,
          w: item.width,
          h: item.height,
          alt: item.name,
        };
      });
    },
  },
  filters: {
    formatSlug(string) {
      return string.replace('-', ' ');
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin-top: 0;
}

.type-teaching-resource,
.type-resource-pack {
  h2 {
    color: $sea-green-500;
  }
}

.type-unit-plan,
.type-lesson-plan {
  h2 {
    color: $strong-fuchsia-500;
  }
}

.type-post {
  h2 {
    color: $moderate-purple-500;
  }
}

h2 {
  font-size: $font-size-500;
  text-transform: uppercase;

  // Back link
  a {
    background-color: $grey-0;
    border-radius: $border-radius;
    color: $color-text;
    display: inline-block;
    line-height: 1;
    margin-right: $base-padding/2;
    padding: $base-padding/2;

    &:hover,
    &:focus {
      background-color: $grey-100;
      text-decoration: none;
    }
  }
}

.callout-details {
  color: $color-text-lightest;

  > * {
    flex: 0 0 auto;
  }

  span {
    opacity: 0.5;
    padding: 0 $base-padding/2;
  }
}

.section {
  padding: $base-padding 0;
}

.section-actions {
  ul {
    .button {
      align-items: center;
      display: flex;
      color: $color-text-lightest;
      margin: 0;
      padding: $base-padding;
      text-decoration: none;

      .icon {
        bottom: 0;
        height: 1.25rem;
        margin-right: $base-padding/3;
        width: 1.25rem;
      }
    }
  }
}

.curriculum-list {
  a {
    border-radius: $border-radius;
    color: inherit;
    display: block;
    padding: $base-padding;

    &:hover,
    &:focus {
      background-color: $grey-0;
      text-decoration: none;

      h4 {
        color: $cobalt-blue-500;
      }
    }
  }

  h4 {
    margin: 0;
  }

  div {
    font-size: $font-size-300;
    margin: -$base-padding/2 0;
  }
}

.section-author {
  .flex {
    align-items: center;
    padding: $base-padding 0;

    img {
      margin-right: $base-padding;
    }
  }
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  margin: $base-padding 0;

  > * {
    flex: 1 0 auto;
    max-width: 33.33%;
  }

  > :first-child {
    flex: 1 0 100%;
    max-width: 100%;
  }

  figure {
    margin: $base-padding/2;
  }

  img {
    border-radius: $border-radius;
  }
}
</style>
