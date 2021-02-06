<template>
	<header id="header" class="fixed-header">
		<div class="main-nav">
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

			<nav class="main-nav-links hidden-small">
				<nuxt-link to="/about/" title="">
					About
				</nuxt-link>
				<nuxt-link :to="localePath('/teaching-resources/')" title="">
					Resources
				</nuxt-link>
				<nuxt-link :to="localePath('/blog/')" title="">
					Blog
				</nuxt-link>
				<nuxt-link v-if="!isAuthenticated" to="/feed/" title="">
					Feed
				</nuxt-link>
				<!--<span class="main-nav-links-divider hidden-medium"></span> -->
				<nuxt-link v-if="!isAuthenticated" to="/login/" title="Log in to your account">
					Login
				</nuxt-link>

				<template v-if="isAuthenticated">
					<dropdown-menu type="button-basic button-small" position="left">
						<template v-slot:label>
							<svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Notifications">
								<use xlink:href="~/assets/images/fa-icons.svg#bell"></use>
							</svg>

							<span v-if="unread > 0" class="label label-notification">{{
								unread > 99 ? '99+' : unread
							}}</span>
						</template>

						<ul class="link-list">
							<li class="notifications-actions">
								<div>Notifications</div>
								<!--<button @click.prevent="deleteNotifications" class="button-link">
							Clear all
						</button>-->
							</li>
							<!--<Notification
						v-for="notification in localNotifications"
						:notification="notification"
						:key="notification.id"
					/>-->
						</ul>
					</dropdown-menu>

					<dropdown-menu type="profile" position="left" url="/feed/">
						<template v-slot:label>
							<template v-if="loggedInUser">
								<div v-if="loggedInUser.photo" class="profile-wrapper">
									<img
										:src="loggedInUser.photo.url"
										:alt="loggedInUser.displayName"
										height="32"
										width="32"
										class="profile"
									/>
									<div class="profile-outline"></div>
								</div>
								<template v-else>{{ loggedInUser.displayName }}</template>
							</template>
							<div v-else class="profile-empty"></div>
						</template>

						<ul class="link-list">
							<li>
								<nuxt-link to="/feed/" title="">Home feed</nuxt-link>
							</li>
							<li>
								<button @click="logout" class="button-negative" title="Log out of account">
									Log Out
								</button>
							</li>
						</ul>
					</dropdown-menu>
				</template>
			</nav>
		</div>
	</header>
</template>

<script>
/* MainHeader
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

//import MainNav from './MainNav.vue';
import DropdownMenu from './DropdownMenu.vue';
import GlobalSearch from './GlobalSearch.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'MainHeader',
	components: {
		DropdownMenu,
		GlobalSearch,
		//MainNav,
	},
	data() {
		return {
			unread: 0,
			error: null,
		};
	},
	computed: {
		...mapGetters(['isAuthenticated', 'loggedInUser']),
	},
	methods: {
		async logout() {
			try {
				await this.$auth.logout();
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
			}
		},
	},
};
</script>

<style lang="scss">
.label-notification {
	color: #fff;
	background-color: $brilliant-amaranth-500;
	border: 2px solid #fff;
	border-radius: 10px;
	left: 20px;
	line-height: 1;
	height: 1.25rem;
	min-width: 1.25rem;
	padding: 2px 3px;
	position: absolute;
	top: 3px;
}

.notifications-actions {
	align-items: center;
	display: flex;
	color: $color-text-lightest;
	font-size: $font-size-200;

	> * {
		padding: $base-padding;
	}

	button {
		flex: 0;
		margin-left: auto;

		&:hover,
		&:focus {
			background-color: transparent;
			color: $color-link;
		}
	}
}

.profile-wrapper {
	position: relative;
}

.profile {
	display: block;
	border-radius: 50%;
}

.profile-outline {
	border-radius: 50%;
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}

.profile-empty {
	background-color: $grey-100;
	border-radius: 50%;
	height: 1.8rem;
	width: 1.8rem;
}
</style>
