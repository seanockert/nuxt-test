<template>
	<div class="button-group">
		<form
			@submit.prevent="download()"
			action="/fn/download/"
			method="GET"
			v-if="isAuthenticated && id"
		>
			<input type="hidden" name="id" :value="id" />
			<button class="button button-primary button-single" :disabled="downloading">
				<svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Download">
					<use xlink:href="~/assets/images/fa-icons.svg#download"></use>
				</svg>
				<template v-if="downloading">Downloading...</template><template v-else>Download</template>
			</button>
			<template v-if="files && files.length > 0">
				<dropdown-menu type="button button-primary">
					<template v-slot:label>
						&#x25BE;
					</template>
					<ul class="link-list">
						<li v-for="file in files" :key="file.id">
							<a :href="'/fn/download/' + file.id">{{ file.name }}</a>
						</li>
					</ul>
				</dropdown-menu>
			</template>
		</form>
		<template v-else>
			<a href="/plans/" title="View pricing plans" class="button button-primary button-single"
				><svg class="icon icon-small" role="img" aria-hidden="true" aria-label="Download">
					<use xlink:href="~/assets/images/fa-icons.svg#download"></use>
				</svg>
				Upgrade to Download</a
			>
		</template>
	</div>
</template>

<script>
/* DownloadButton
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import DropdownMenu from '~/components/DropdownMenu.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'DownloadButton',
	props: {
		id: { type: Number, default: null },
		files: { type: Array },
	},
	data() {
		return {
			downloading: false,
			error: null,
		};
	},
	components: {
		DropdownMenu,
	},
	computed: {
		...mapGetters(['isAuthenticated']),
	},
	methods: {
		async download() {
			this.downloading = true;

			try {
				const resource = await this.$axios.$get(this.$axios.defaults.baseURL + '/v1/file', {
					params: { id: this.id },
				});

				// Download the returned file link
				if (resource.url) {
					location.href = resource.url;
				}

				console.log('resource', resource);
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
			}
		},
	},
};
</script>

<style scoped lang="scss">
//
</style>
