<template>
	<footer id="footer" class="section section-primary">
		<div class="row">
			<div class="columns small-6 medium-6 large-3">
				<h3>About Us</h3>
				<ul class="link-list">
					<li><a href="/about/">About Us</a></li>
					<li><a href="https://medium.com/teachstarter/media/home/">News &amp; Media</a></li>
					<li><a href="one-million-trees-project/">One Million Trees Project</a></li>
					<li><a href="https://medium.com/teachstarter/">Creating Teach Starter</a></li>
					<li><a href="/testimonials-reviews/">Testimonials &amp; Reviews</a></li>
					<li><a href="https://teachstarter.bamboohr.com/jobs/">Careers</a></li>
				</ul>
			</div>
			<div class="columns small-6 medium-6 large-3">
				<h3>More</h3>
				<ul class="link-list">
					<li><a href="/plans/">Plans &amp; Pricing</a></li>
					<li><a href="https://shop.teachstarter.com">Teach Starter Shop</a></li>
					<li><a href="/gift-cards/">Gift Cards</a></li>
					<li><a href="/app/">Download Free App</a></li>
					<li><a href="/curriculums/">Curriculums</a></li>
				</ul>
			</div>
			<div class="columns small-6 medium-6 large-3">
				<h3>Ways to Connect</h3>
				<ul class="link-list">
					<li><a href="https://support.teachstarter.com">Help Desk</a></li>
					<li>
						<a href="https://support.teachstarter.com/general/contact-teach-starter">Contact Us</a>
					</li>
					<li><a href="/request-a-resource/">Request a Resource</a></li>
				</ul>
			</div>
			<div class="columns small-6 medium-6 large-3">
				<h3>Keep in Touch</h3>
				<ul class="link-list">
					<li><a href="/newsletter/">Weekly Newsletter</a></li>
					<li><a href="/for-the-love-of-teaching-podcast/">For The Love of Teaching</a></li>
					<li><a href="/love-learning-podcast/">Love Learning</a></li>
				</ul>

				<a href="https://www.facebook.com/teachstarter" title="Like us on Facebook"
					><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Facebook">
						<use xlink:href="~/assets/images/fa-icons.svg#facebook"></use></svg
				></a>

				<a href="https://www.instagram.com/teachstarter" title="Follow us on Instagram"
					><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Instagram">
						<use xlink:href="~/assets/images/fa-icons.svg#instagram"></use></svg
				></a>

				<a href="https://www.pinterest.com/teachstarter" title="Get inspired on our Pinterest"
					><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Pinterest">
						<use xlink:href="~/assets/images/fa-icons.svg#pinterest"></use></svg
				></a>

				<a href="https://www.youtube.com/teachstarter" title="View our videos on YouTuve"
					><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="YouTube">
						<use xlink:href="~/assets/images/fa-icons.svg#youtube"></use></svg
				></a>

				<a href="https://www.twitter.com/teachstarter" title="Follow us on Twitter"
					><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Twitter">
						<use xlink:href="~/assets/images/fa-icons.svg#twitter"></use></svg
				></a>
			</div>
		</div>
		<div class="section sub-footer flex">
			<dropdown-menu position="top" type="country-selector">
				<template v-slot:label>
					<div class="flex">
						<img
							:src="
								'https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/icons/flags/' +
									$i18n.locale +
									'.gif'
							"
							alt=""
							height="11"
							width="16"
						/>
						{{ $i18n.locales.find(l => l.code == $i18n.locale).name }}
					</div>
				</template>
				<ul class="link-list">
					<li
						v-for="locale in $i18n.locales"
						:key="locale.code"
						v-if="locale.code !== $i18n.locale"
					>
						<nuxt-link :to="switchLocalePath(locale.code)"
							><img
								:src="
									'https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/icons/flags/' +
										locale.code +
										'.gif'
								"
								alt=""
								height="11"
								width="16"
							/>
							{{ locale.name }}</nuxt-link
						>
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
				</ul> </dropdown-menu
			>&nbsp;&nbsp;·&nbsp;&nbsp;
			<a
				href="/about/terms-and-conditions/"
				title="Read the Terms & Conditions of using Teach Starter"
				>Terms &amp; Conditions</a
			>&nbsp;&nbsp;·&nbsp;&nbsp;
			<a href="/about/privacy-policy" title="Read Teach Starter Privacy Policy">Privacy Policy</a>

			<div class="pull-right">
				<a href="/" title="Return home">&copy; {{ thisYear }} Teach Starter Pty Ltd</a>
			</div>
		</div>
	</footer>
</template>

<script>
/* MainFooter
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components: DropdownMenu
 * @methods:
 */

import DropdownMenu from './DropdownMenu.vue';

export default {
	name: 'MainFooter',
	components: {
		DropdownMenu,
	},
	data() {
		return {
			thisYear: new Date().getFullYear(),
			activeCountry: 'au',
			countries: [
				{ name: 'Australia', slug: 'au' },
				{ name: 'United States', slug: 'us' },
				{ name: 'United Kingdom', slug: 'gb' },
			],
		};
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
footer {
	margin-top: 10rem;
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

.sub-footer {
	align-items: center;
	border-top: 1px solid $ts-green-300;
	font-size: $font-size-300;
	padding-bottom: 0;

	.dropdown {
		margin-bottom: -3px;

		.flex {
			margin: 0;
		}

		img {
			height: 1rem;
			margin-right: $base-padding/2;
			width: auto;
		}
	}
}
</style>
