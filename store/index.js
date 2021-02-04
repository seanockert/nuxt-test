export const state = () => ({
	region: 'au',
});

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		// Check for the user's region on every route and update state
		let region = this.$cookies.get('ts_country');
		if (region) {
			commit('setRegion', region);
		}
	},
};

export const mutations = {
	setRegion(state, value) {
		state.region = value;
		if (process.browser) {
			this.$cookies.set('ts_country', state.region, {
				path: '/',
			});
		}
	},
};

export const getters = {
	isAuthenticated(state) {
		return state.auth.loggedIn;
	},

	loggedInUser(state) {
		return state.auth.user;
	},
};
