export const state = () => ({
	region: 'au',
	resource: null,
});

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		// Check for the user's region on every route and update state
		let region = this.$cookies.get('ts_country');
		if (region) {
			commit('setRegion', region);
		}
	},
	likeResource({ commit }, params) {
		return '';

		/*
		try {
			const response = await $axios.$put($axios.defaults.baseURL + '/v1/user/action', {
				params: { type: 'add', action: 'like', id: params.id, isActive: params.isActive },
			});
			commit('likeResource', response);
		} catch {
			throw new Error(error.response ? error.response.data.error : error);
		}
		*/
	},
	bookmarkResource({ commit }, params) {
		return {
			count: params.isActive ? params.count-- : params.count++,
			checked: !params.isActive,
		};
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
	likeResource(state, params) {
		//state.resource = { like: params };
	},
};

export const getters = {
	isAuthenticated(state) {
		return state.auth.loggedIn;
	},
	loggedInUser(state) {
		return state.auth.user;
	},
	getResource(state) {
		return state.resource;
	},
};
