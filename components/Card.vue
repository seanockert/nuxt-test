<template>
	<div :class="['card', 'type-' + content.type]" @click="gotoLink">
		<figure class="card-img">
			<span v-if="content.isFree" class="label label-primary">Free</span>
			<span v-if="content.isNew" class="label label-secondary">New</span>
			<span v-if="content.type === 'post'">
				<div
					v-for="category in content.categories"
					:key="category.id"
					:class="['label', 'category-' + category.slug]"
				>
					{{ category.name }}
				</div>
			</span>

			<nuxt-link :to="url" title="View this resource">
				<img
					v-if="content.media && content.media[0]"
					:src="content.media[0].cdn"
					alt=""
					height="300"
					width="600"
					loading="lazy"
				/>
			</nuxt-link>
		</figure>
		<div class="card-content">
			<h4>{{ content.typeFormatted }}</h4>
			<h3>
				<nuxt-link :to="url" title="View this resource" class="line-clamp">{{
					content.title || content.name
				}}</nuxt-link>
			</h3>
			<small
				v-if="content.type === 'post'"
				class="card-meta"
				rel="author"
				:data-tooltip="content.created | simpleDate('dddd, MMM DD [at] h:mma')"
			>
				Posted
				<time :datetime="content.created | simpleDate('dddd, MMM DD [at] h:mma')">{{
					content.created | relativeTime
				}}</time>
				by
				{{ content.author.displayName }}
			</small>

			<p class="line-clamp">{{ content.excerpt }}</p>
		</div>
		<footer v-if="content.type !== 'post'">
			<!--<span
				v-for="category in content.categories"
				:key="category.id"
				:class="['label', 'category-' + category.slug]"
			>
				{{ category.name }}
			</span>-->
		</footer>
	</div>
</template>

<script>
/* Card
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
	name: 'Card',
	props: {
		content: { type: Object, default: null },
		url: { type: String, default: '' },
	},
	created() {
		dayjs.extend(relativeTime);
	},
	methods: {
		gotoLink() {
			if (this.url) {
				this.$router.push(this.url);
			}
		},
	},
	filters: {
		formatSlug(string) {
			return string ? string.replace('-', ' ').replace('post', 'blog') : string;
		},
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
.card {
	cursor: pointer;
}

.type-teaching-resource,
.type-resource-pack {
	h4 {
		color: $sea-green-500;
	}
}

.type-unit-plan,
.type-lesson-plan {
	h4 {
		color: $strong-fuchsia-500;
	}
}

.type-post {
	h4 {
		color: $moderate-purple-500;
	}
}

figure {
	background-color: $grey-0;
	border-radius: $border-radius;
	padding-bottom: 52.333%;
	position: relative;

	img {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transition: transform 0.5s ease-out;
		width: 100%;
	}

	&:hover {
		img {
			transform: scale(1.05);
		}
	}

	span {
		line-height: 1;
	}

	.label {
		//background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(4px);
		margin-bottom: 0;
		margin-right: 0;
	}
}
</style>
