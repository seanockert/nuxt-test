<template>
	<nav class="main-nav">
		<h2 class="main-nav-logo">
			<a href="/" title="Back to homepage" aria-label="Teach Starter">
				<svg height="64" width="64" viewBox="0 0 107 107">
					<defs>
						<linearGradient id="a" x1="49.834%" x2="58.103%" y1="45.638%" y2="27.811%">
							<stop offset="0%" stop-color="#69A340"></stop>
							<stop offset="70%" stop-color="#78BC43"></stop>
						</linearGradient>
					</defs>
					<g fill="none">
						<path
							stroke="#78BC43"
							stroke-width="13"
							d="M53.721 99.97a46.3 46.3 0 0 0 38.82-21.168c11.49-17.783 9.45-41.095-4.953-56.613C73.185 6.67 50.088 2.903 31.5 13.039 12.91 23.176 3.57 44.631 8.813 65.144 14.056 85.657 32.549 99.998 53.72 99.97z"
						></path>
						<path
							fill="url(#a)"
							d="M89.024 69.432a39.69 39.69 0 0 0 1.83-28.4l13-1.66a52.65 52.65 0 0 1-6.72 42.07l-8.11-12.01z"
							transform="translate(.866 .888)"
						></path>
						<path
							fill="#78BC43"
							d="M102.28 67.47a21.18 21.18 0 0 0-12.22-18.06 21.43 21.43 0 0 0-22.24 2.94A34.3 34.3 0 0 0 62 59.07c-.7 1-1.37 1.88-2 2.69-1.73 2.08-4.57 4.46-8.31 4a8.76 8.76 0 0 1-5-2.54c-.83-.85-1.68-2.1-1.68-5v-8.06h7.64c2.66 0 4.13-1.41 4.13-4.13v-1.89c0-2.73-1.4-4.21-4.13-4.23h-7.72v-7.16c0-2.73-1.4-4.13-4.13-4.13h-4.68c-2.69 0-4.14 1.44-4.14 4.13v25.46c0 5.71 1.81 10.45 5.4 14.09A21.55 21.55 0 0 0 50 78.61c7.45.93 14.51-2.12 19.87-8.57 1-1.15 1.77-2.28 2.57-3.38a24.06 24.06 0 0 1 3.64-4.35 8.46 8.46 0 0 1 8.56-1.13 8.33 8.33 0 0 1 4.69 6.73A14 14 0 0 1 87 75.54l11 6.86a26.63 26.63 0 0 0 4.28-14.93z"
						></path>
					</g>
				</svg>
				<span class="sr-only">Teach Starter</span>
			</a>
		</h2>

		<div class="main-nav-search">
			<global-search />
		</div>

		<div class="main-nav-links">
			<nuxt-link to="/about" title="">
				About
			</nuxt-link>
			<nuxt-link :to="localePath('/resources')" title="">
				Resources
			</nuxt-link>
			<nuxt-link :to="localePath('/blog')" title="">
				Blog
			</nuxt-link>
			<nuxt-link to="/feed" title="">
				Feed
			</nuxt-link>
			<div v-if="isAuthenticated">{{ loggedInUser.id }}</div>
			<nuxt-link v-else to="/login" title="">
				Login
			</nuxt-link>

			<dropdown-menu position="drop-left" type="">
				<template v-slot:label>
					<small>{{ $i18n.locale.toUpperCase() }}</small>
				</template>
				<ul class="link-list">
					<li
						v-for="locale in $i18n.locales"
						:key="locale.code"
						v-if="locale.code !== $i18n.locale"
					>
						<nuxt-link :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
						<!--<button
							@click="changeRegion(country.slug)"
							:class="{
								button: true,
								'button-link': true,
								active: activeCountry === country.slug,
							}"
							:disabled="activeCountry === country.slug"
						>
							{{ country.name }}
						</button>-->
					</li>
				</ul>
			</dropdown-menu>
		</div>
	</nav>
</template>

<script>
/* Nav
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import DropdownMenu from './DropdownMenu.vue';
import GlobalSearch from './GlobalSearch.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'Nav',
	components: {
		DropdownMenu,
		GlobalSearch,
	},
	data() {
		return {
			activeCountry: 'au',
			countries: [
				{ name: 'Australia', slug: 'au' },
				{ name: 'United States', slug: 'us' },
				{ name: 'United Kingdom', slug: 'gb' },
			],
		};
	},
	computed: {
		...mapGetters(['isAuthenticated', 'loggedInUser']),
	},
	created() {
		this.activeCountry = this.$store.state.region;
	},
	methods: {
		changeRegion(region) {
			this.$store.commit('setRegion', region);
			location.reload();
		},
	},
};
</script>

<style scoped lang="scss">
//

.circle {
	background-color: $grey-0;
}

.nuxt-link-active {
	font-weight: bold;
}

.dropdown {
	display: inline-block;

	ul {
		color: $color-text;
	}

	.nuxt-link-active {
		font-weight: normal;
	}

	.nuxt-link-exact-active {
		font-weight: bold;
	}

	.button-link {
		color: $color-text;
		margin: 0;
		text-align: left;
		width: 100%;

		&:hover,
		&:focus {
			background-color: $grey-0;
		}

		&.active {
			color: $color-text !important;
		}
	}
}
</style>
