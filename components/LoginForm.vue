<template>
	<div>
		<div v-if="error" class="callout callout-error">{{ error }}</div>
		<form @submit.prevent="login" action="#" method="post">
			<div class="form-item">
				<label for="username">Username / Email</label>
				<input
					type="text"
					id="username"
					v-model="username"
					inputmode="email"
					autofocus
					autocomplete="username"
					required
				/>
			</div>
			<div class="form-item">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					v-model="password"
					autocomplete="current-password"
					required
				/>
			</div>

			<div class="flex" style="align-items:center;">
				<button v-if="loggingIn" type="submit" class="button button-default" disabled="true">
					Logging In...
				</button>
				<button v-else type="submit" class="button button-primary">Log In</button>
				<small class="pull-right"
					><nuxt-link to="/password-reset/" title="Reset your password"
						>Forgot password?</nuxt-link
					></small
				>
			</div>

			<div>
				<hr />
				<button @click.prevent="loginFacebook" class="button button-small button-facebook">
					<svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Facebook">
						<use xlink:href="~/assets/images/fa-icons.svg#facebook"></use></svg
					>&nbsp; Facebook
				</button>
			</div>
		</form>
	</div>
</template>

<script>
/* LoginForm
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
	props: {
		from: String,
	},
	data() {
		return {
			username: '',
			password: '',
			error: null,
			redirect: '/',
			loggingIn: false,
		};
	},
	methods: {
		async login() {
			if (this.username && this.password) {
				this.loggingIn = true;

				try {
					const response = await this.$auth.loginWith('local', {
						data: {
							username: this.username,
							password: this.password,
						},
					});

					this.$auth.setUser(response.data.user);
					this.error = null;

					if (this.from) {
						// Return to previous page after login
						this.redirect = this.from.fullPath;
					}

					this.$emit('logged-in', true);
					this.$router.push(this.redirect);
				} catch (error) {
					this.error = error.response ? error.response.data.error : error;
					this.loggingIn = false;
					this.$emit('logged-in', false);
				}
			} else {
				this.error = 'Please enter your username and password';
			}
		},
		async loginFacebook() {
			try {
				const response = await this.$auth.loginWith('facebook');
				console.log(response);
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
			}
		},
	},
};
</script>
