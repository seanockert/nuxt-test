<template>
	<div :class="{ modal: true, show: show }" v-shortkey="['esc']" @shortkey="close">
		<h2>Login to your account</h2>

		<login-form :from="from" @logged-in="loggedIn" />

		<button @click="close" class="button button-close top-right">
			<svg role="img" width="24" height="24" viewBox="0 0 24 24">
				<title>Cancel</title>
				<path
					fill="currentColor"
					d="M16.55 12l6.822-6.823a2.145 2.145 0 000-3.033L21.856.628a2.145 2.145 0 00-3.033 0L12 7.451 5.177.628a2.145 2.145 0 00-3.033 0L.628 2.144a2.145 2.145 0 000 3.033L7.451 12 .628 18.823a2.145 2.145 0 000 3.033l1.516 1.516a2.145 2.145 0 003.033 0L12 16.549l6.823 6.823a2.145 2.145 0 003.033 0l1.516-1.516a2.145 2.145 0 000-3.033L16.549 12z"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
/* LoginModal
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import LoginForm from '~/components/LoginForm.vue';

export default {
	name: 'LoginModal',
	components: {
		LoginForm,
	},
	props: {
		show: Boolean,
	},
	data() {
		return {
			from: this.$route.path,
		};
	},
	methods: {
		close() {
			this.$emit('toggle-modal', false);
		},
		loggedIn(success) {
			if (success) {
				this.close();
			}
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/scss/components/_modal.scss';

.modal {
	box-shadow: $box-shadow;
	overflow: hidden;
	padding: $base-padding;
}

#header {
	h2 {
		margin: 0 0 $base-padding 0;
		text-transform: none;
	}
}
</style>
