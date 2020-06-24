<template>
  <div>
    <div v-if="!resource" class="section skeleton">
      <h3></h3>
      <h2></h2>
      <figure></figure>
      <p></p>
      <p></p>
    </div>
    <template v-else>
      <section :class="['section', 'type-' + resource.type]">
        <div class="row">
          <div class="columns small-12 medium-8 large-7">
            <h2>
              <nuxt-link :to="localePath('/resources')" title="">
                &larr;
              </nuxt-link>
              {{ resource.type | formatSlug }}
            </h2>
            <h1>{{ resource.title }}</h1>
            <small> by {{ resource.author.displayName }} &middot; ID: {{ resource.id }}</small>

            <ul class="inline-list">
              <li>
                <button @click="like" class="button button-link">
                  <svg class="icon" role="img" aria-hidden="true">
                    <use xlink:href="~/assets/images/fa-icons.svg#heart-empty"></use>
                  </svg>
                  {{ resource.like.count }}
                </button>
              </li>
              <li>
                <button @click="bookmark" class="button button-link">
                  <svg class="icon" role="img" aria-hidden="true">
                    <use xlink:href="~/assets/images/fa-icons.svg#bookmark-empty"></use>
                  </svg>
                  {{ resource.bookmark.count }}
                </button>
              </li>
              <li>
                <button @click="comment" class="button button-link">
                  <svg class="icon" role="img" aria-hidden="true">
                    <use xlink:href="~/assets/images/fa-icons.svg#comment"></use>
                  </svg>
                  {{ resource.comment.count }}
                </button>
              </li>
            </ul>

            <div class="content">
              <pre v-if="resource.content" v-html="resource.content"></pre>
              <p v-else>{{ resource.excerpt }}</p>
            </div>
          </div>

          <div class="columns small-12 medium-4 large-5">
            <figure v-if="resource.image">
              <img
                :src="resource.image.url"
                :height="resource.image.height"
                :width="resource.image.width"
                alt=""
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="row">
          <div class="columns small-12 medium-6 large-6">
            <ul class="inline-list">
              <li v-for="topic in resource.topics" :key="topic.id">
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
/* Resource
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import axios from 'axios';
const apiResource = 'https://staging-api.teachstarter.com/v1/resource/';

export default {
  name: 'Resource',
  data() {
    return {
      title: null,
    };
  },
  async asyncData({ params, store, payload }) {
    if (payload) return { resource: payload };

    try {
      let resource = await axios.get(apiResource, {
        params: { name: params.name },
      });
      const { data: { list = [] } = {} } = resource;
      return { resource: list[0] };
    } catch (error) {
      console.log(error);
    }
  },
  validate({ params }) {
    return true;
    // return /\s/g.test(params.name);
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
      return string.replace('-', ' ');
    },
  },
};
</script>

<style scoped lang="scss">
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

figure {
  img {
    border-radius: $border-radius;
  }
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
