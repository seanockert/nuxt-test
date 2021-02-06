<template>
	<ol class="notifications">
		<li v-if="error" class="error">{{ error }}</li>
		<li v-else-if="loading" class="skeleton"><div></div></li>
		<template v-else>
			<li
				v-for="notification in notifications"
				:key="notification.id"
				:class="{ read: notification.read }"
			>
				<a href="#">
					<time pubdate :datetime="notification.time" :title="notification.time | simpleDate">{{
						notification.time | relativeTime
					}}</time>
					<div v-if="notification.action == 'update'">
						{{ notification.user.displayName }} {{ notification.message }}
					</div>
					<div v-else>{{ notification.message }}</div>
				</a>
			</li>
		</template>
	</ol>
</template>

<script>
/* Notifications
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default {
	name: 'Notifications',
	props: {
		load: Boolean,
	},
	data() {
		return {
			notifications: [],
			loading: true,
			error: null,
		};
	},
	created() {
		dayjs.extend(relativeTime);
		this.loadNotifications();
	},
	watch: {
		load() {
			console.log('loading!');
			this.loadNotifications();
		},
	},
	methods: {
		async loadNotifications() {
			this.loading = true;

			try {
				const response = await this.$axios.$get(
					this.$axios.defaults.baseURL + '/v1/user/notifications'
				);
				this.loading = false;
				this.notifications = response.list;
			} catch (error) {
				this.loading = false;
				this.error = error.response ? error.response.data.error : error;
			}
		},
	},
	filters: {
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
.notifications {
	min-width: 320px;
	max-width: 460px;
	max-height: 400px;
	overflow-y: auto;

	a {
		display: block;
		padding: $base-padding $base-padding;
		white-space: normal;
	}
}

div {
	line-height: 1.5;
}

time {
	color: $color-text-lightest;
	font-size: $font-size-300;
	margin-bottom: $base-padding/2;
}
</style>
