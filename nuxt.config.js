import axios from 'axios';
export default {
  ssr: true,
  // If you provide a version, it will be stored inside cache.
  // Later when you deploy a new version, old cache will be
  // automatically purged.
  version: 1,
  /*
   ** Headers of the page
   */
  env: {
    baseURL: process.env.BASE_URL,
  },
  head: {
    titleTemplate: '%s | Teach Starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Main description',
      },
    ],
    // Add Museo font here
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#78bc3a' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/vue-shortkey.js', mode: 'client' },
    { src: '@/plugins/vue-photoswipe.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module', // Uncomment to enable eslint
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    '@nuxtjs/dayjs',
    'nuxt-ssr-cache',
    'cookie-universal-nuxt',
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'au', name: 'Australia' },
          { code: 'us', name: 'United States' },
          { code: 'gb', name: 'England' },
        ],
        defaultLocale: 'au',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'ts_region',
        },
        vueI18n: {
          fallbackLocale: 'au',
          messages: {
            au: {
              name: 'Australia',
            },
            us: {
              name: 'United States',
            },
            gb: {
              name: 'England',
            },
          },
        },
        onLanguageSwitched: (previous, current) => {
          // Set a new cookie
          /*if (process.client) {
            const DATE = new Date();
            DATE.setTime(DATE.getTime() + 365 * 24 * 3600 * 1000);
            document.cookie = 'ts_region=' + current + '; path=/; expires=' + DATE.toUTCString();
          }*/
        },
      },
    ],
    '@nuxtjs/sitemap',
  ],
  /*
   ** Auto-load our SCSS variables file so it's accessible in all components
   */
  styleResources: {
    scss: ['~assets/scss/_variables.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    baseURL: process.env.API_URL || 'https://staging-api.teachstarter.com',
    /* Unused - not using global Axios */
    /*baseURL: 'https://staging-api.teachstarter.com',
    credentials: false,
    debug: true,
    retry: {
      retries: 3,
    },
    requestInterceptor: (config, { store }) => {
      config.headers.common['Access-Control-Allow-Origin'] = '*';
      config.headers.common['Accept-Encoding'] = '*';
      config.headers.common['Country-Code'] = 'us';

      //config.headers.common['Authorization'] = '';
      //config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
      return config;
    },*/
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL || 'https://staging-api.teachstarter.com',
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL || 'https://staging-api.teachstarter.com',
    },
  },
  proxy: {
    '/api/': process.env.API_URL || 'https://staging-api.teachstarter.com',
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL
              ? process.env.API_URL + '/v1/user/login/'
              : 'https://staging-api.teachstarter.com/v1/user/login/',
            method: 'post',
            propertyName: 'data.token',
          },
          user: {
            url: process.env.API_URL
              ? process.env.API_URL + '/v1/user/info-nuxt/'
              : 'https://staging-api.teachstarter.com/v1/user/info-nuxt/',
            method: 'get',
            propertyName: 'user',
          },
          logout: {
            url: process.env.API_URL
              ? process.env.API_URL + '/v1/user/logout/'
              : 'https://staging-api.teachstarter.com/v1/user/logout/',
            method: 'get',
          },
        },
        tokenRequired: true,
        tokenType: 'bearer',
        tokenName: 'Authorization',
        //globalToken: true,
        //autoFetchUser: false,
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    //extend(config, ctx) {},

    // Don't minify CSS/JS twice: https://www.voorhoede.nl/en/blog/10x-faster-nuxt-builds-on-netlify/
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },
  generate: {
    // Grab all the resources from API when running 'generate'
    // Can you see the problem?
    /*routes: function() {
      let resources = axios
        .get('https://staging-api.teachstarter.com/v1/resource/', {
          params: { type: ['teaching-resource', 'resource-pack'], perPage: 30 },
        })
        .then(response => {
          return response.data.list.map(resource => {
            return {
              route: '/resources/' + resource.name,
              payload: resource,
            };
          });
        });

      let posts = axios
        .get('https://staging-api.teachstarter.com/v1/resource/', {
          params: { type: ['post'], perPage: 10 },
        })
        .then(response => {
          return response.data.list.map(post => {
            return {
              route: '/blog/' + post.name,
              payload: post,
            };
          });
        });

      let freeResources = axios
        .get('https://staging-api.teachstarter.com/v1/dashboard/teaching-resource/free', {
          params: { perPage: 4 },
        })
        .then(response => {
          return response.data.list.map(resource => {
            return {
              route: '/resources/' + resource.name,
              payload: resource,
            };
          });
        });

      let unitPlans = axios
        .get('https://staging-api.teachstarter.com/v1/resource/', {
          params: { type: ['unit-plan'], perPage: 4 },
        })
        .then(response => {
          return response.data.list.map(resource => {
            return {
              route: '/resources/' + resource.name,
              payload: resource,
            };
          });
        });

      return Promise.all([resources, posts, freeResources, unitPlans]).then(values => {
        return [...values[0], ...values[1], ...values[2], ...values[3]];
      });
    },*/
  },
  dayjs: {
    //locales: ['en', 'es'],
    //defaultLocale: 'en',
  },
  sitemap: {
    hostname: 'https://nuxt-test-nu.now.sh',
    path: '/sitemap.xml',
    gzip: true,
    exclude: ['/admin/**'],
    routes: () => {
      return axios
        .get('https://staging-api.teachstarter.com/v2/resource/', {
          params: { type: ['teaching-resource', 'resource-pack'], perPage: 30 },
        })
        .then(response => {
          return response.data.list.map(resource => {
            return '/resources/' + resource.name;
          });
        });
    },
  },
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      '/',
    ],

    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
    },

    store: {
      type: 'memory',

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60,

      /*
      Or use redis instead:
      type: 'redis',
      host: 'localhost',
      ttl: 10 * 60,
      configure: [
        // these values are configured
        // on redis upon initialization
        ['maxmemory', '200mb'],
        ['maxmemory-policy', 'allkeys-lru'],
      ],
      */
    },
  },
};
