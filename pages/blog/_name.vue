<template>
  <div>
    <div v-if="!post" class="section skeleton">
      <h3></h3>
      <h2></h2>
      <figure></figure>
      <p></p>
      <p></p>
    </div>
    <template v-else>
      <section :class="['section', 'type-' + post.type]">
        <div class="row">
          <div class="columns small-12 medium-12 large-9">
            <h2>
              <nuxt-link :to="localePath('/blog')" title="">
                &larr;
              </nuxt-link>
              {{ post.type | formatSlug }}
            </h2>
            <h1>{{ post.title }}</h1>

            <figure v-if="post.image">
              <img
                :src="post.image.url"
                :height="post.image.height"
                :width="post.image.width"
                alt=""
                loading="lazy"
              />
            </figure>

            <small class="flex" :data-tooltip="post.date | simpleDate('dddd, MMM DD [at] h:mma')">
              <img
                v-if="post.author.photo"
                :src="post.author.photo.url"
                :alt="'Photo of ' + post.author.displayName"
                class="circle"
                height="30"
                width="30"
              />
              <span
                >Posted&nbsp;
                <time :datetime="post.date | simpleDate('dddd, MMM DD [at] h:mma')">{{
                  post.date | relativeTime
                }}</time
                >&nbsp; by {{ post.author.displayName }}</span
              >
            </small>

            <ul class="inline-list">
              <li>
                <button @click="like" class="button button-link">
                  <svg class="icon" role="img" height="20" width="20">
                    <use xlink:href="~/assets/images/fa-icons.svg#heart-empty"></use>
                  </svg>
                  {{ post.like.count }}
                </button>
              </li>
              <li>
                <button @click="bookmark" class="button button-link">
                  <svg class="icon" role="img" height="20" width="20">
                    <use xlink:href="~/assets/images/fa-icons.svg#bookmark-empty"></use>
                  </svg>
                  {{ post.bookmark.count }}
                </button>
              </li>
              <li>
                <button @click="comment" class="button button-link">
                  <svg class="icon" role="img" height="20" width="20">
                    <use xlink:href="~/assets/images/fa-icons.svg#comment"></use>
                  </svg>
                  {{ post.comment.count }}
                </button>
              </li>
            </ul>

            <div class="content">
              <div v-if="content" v-html="content"></div>
              <p v-else>{{ post.excerpt }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="row">
          <div class="columns small-12 medium-6 large-6">
            <ul class="inline-list">
              <li v-for="topic in post.topics" :key="topic.id">
                <span class="label">{{ topic.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
/* Blog post
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const apiResource = 'https://staging-api.teachstarter.com/v1/resource/';

export default {
  name: 'BlogPost',
  data() {
    return {
      title: null,
    };
  },
  layout: 'blog',
  async asyncData({ route, params, store, payload }) {
    if (payload) return { post: payload };

    try {
      let post = await axios.get(apiResource, {
        params: { name: params.name },
      });
      const { data: { list = [] } = {} } = post;

      // Need the ID to load the content as a block of HTML
      let content = route.query.id
        ? await axios.get(apiResource + 'contents', {
            params: { id: route.query.id },
          })
        : { data: null };

      return { post: list[0], content: content.data };
    } catch (error) {
      console.log(error);
    }
  },
  validate({ params }) {
    return true;
  },
  created() {
    dayjs.extend(relativeTime);
  },
  data() {
    return {
      title: 'Blog post',
      slug: this.params,
      loading: true,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'Category' },
        { hid: 'description', name: 'description', content: 'Description' },
      ],
    };
  },
  nuxtI18n: false,
  methods: {
    like() {
      console.log('like');
    },
    bookmark() {
      console.log('bookmark');
    },
    comment() {
      console.log('comment');
    },
  },
  filters: {
    formatSlug(string) {
      return string.replace('-', ' ').replace('post', 'blog');
    },
    relativeTime(date) {
      if (!date) return null;
      return dayjs(date).fromNow();
    },
    simpleDate(date, format = 'YYYY-MM-DD h:mma') {
      if (!date) return null;

      return dayjs(date).format(format);
    },
  },
};
</script>

<style scoped lang="scss">
figure {
  margin-bottom: $base-padding * 2;

  img {
    border-radius: $border-radius;
  }
}

.circle {
  background-color: $grey-0;
  flex: 0 0 auto;
  margin-right: $base-padding/2;
  width: 2rem;
}

h2 {
  font-size: $font-size-500;
  text-transform: uppercase;

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

.content {
  padding: 1.5rem 0;
}
</style>
