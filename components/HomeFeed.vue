<template>
	<div class="row">
		<div class="columns small-12 medium-3 large-3">
			Sidebar
		</div>
		<div class="columns small-12 medium-6 large-6 feed">
			<ul v-if="loading" class="no-list">
				<li>
					<div class="card skeleton">
						<div></div>
						<h4></h4>
						<h3></h3>
						<p></p>
					</div>
				</li>
				<li>
					<div class="card skeleton">
						<div></div>
						<h4></h4>
						<h3></h3>
						<p></p>
					</div>
				</li>
			</ul>
			<ul v-else class="no-list">
				<li v-for="item in feed" :key="item.id">
					<div v-if="item.type !== 'carousel'" class="card">
						<figure v-if="item.image" class="card-img">
							<img :src="item.image" alt="" height="300" width="600" />
						</figure>
						<div class="card-content">
							<h4>{{ item.type }}</h4>
							<h3>
								<nuxt-link :to="'/resources/' + item.slug" title="" class="line-clamp">{{
									item.title
								}}</nuxt-link>
							</h3>
							<p class="line-clamp">{{ item.content }}</p>
						</div>
					</div>
					<div v-else class="card-container">
						<header class="card-header">
							<span>
								<h4>{{ item.title }}</h4></span
							>
						</header>
						<ul>
							<li v-for="item in item.items" :key="item.id">
								<div class="card shadow">
									<figure v-if="item.image" class="card-img">
										<img :src="item.image" alt="" height="300" width="300" />
									</figure>
									<div class="card-content">
										<h3>
											<nuxt-link :to="'/resources/' + item.slug" title="" class="line-clamp">{{
												item.title
											}}</nuxt-link>
										</h3>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</li>
			</ul>

			<p v-if="!feed">
				<button @click="loadData" class="button">Load the feed</button> or<button
					@click="populateData"
					class="button button-link"
				>
					Populate some data
				</button>
			</p>
		</div>

		<div class="columns small-12 medium-3 large-3">
			Sidebar
		</div>
	</div>
</template>

<script>
/* HomeFeed
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import axios from 'axios';
const feedEndpoint =
	'https://www.jsonstore.io/060d7dcb2d34d96fc57f5413494d2c471b7cbae882796937fc868710fabad524';

export default {
	name: 'HomeFeed',
	data() {
		return {
			feed: null,
			loading: false,
			error: null,
		};
	},
	created() {
		//this.loadData();
	},
	methods: {
		test() {
			alert('test');
		},
		async loadData() {
			this.loading = true;
			try {
				let response = await axios.get(feedEndpoint + '/feed');
				this.feed = response.data.result;
				this.loading = false;

				document.title = this.feed.length + ' new items | ' + document.title;
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
			}
		},
		async populateData() {
			// Populate once with some dummy data
			let data = {
				feed: [
					{
						id: 0,
						title: 'Item 1 with a long name',
						image: 'https://placekitten.com/800/400',
						type: 'resource',
						slug: '#',
						content: 'Description of item 1',
					},
					{
						id: 1,
						title: 'Item 2 Multi',
						type: 'carousel',
						items: [
							{
								id: 3,
								title: 'Item 3-1',
								image: 'https://placekitten.com/800/400',
								type: 'resource',
								slug: '#',
							},
							{
								id: 4,
								title: 'Item 3-2 with a really long title',
								image: 'https://placekitten.com/800/400',
								type: 'resource',
								slug: '#',
							},
							{
								id: 5,
								title: 'Item 3-4',
								image: 'https://placekitten.com/800/400',
								type: 'resource',
								slug: '#',
							},
						],
					},
					{
						id: 2,
						title: 'Item 3',
						image: 'https://placekitten.com/800/400',
						type: 'resource',
						slug: '#',
						content: 'Description of item 2',
					},
				],
			};

			try {
				let response = await axios.post(feedEndpoint, data);
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
			}
		},
	},
};
</script>

<style scoped lang="scss">
.feed {
	ul {
		background-color: $grey-0;
		padding: $base-padding;
	}
}

.button {
	margin-bottom: $base-padding * 2;
}
</style>
