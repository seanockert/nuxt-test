<template>
	<div :class="['card', 'type-' + content.type]" @click="gotoLink">
		<figure class="card-img">
			<span v-if="content.type === 'post'">
				<div
					v-for="topic in content.topics"
					:key="topic.id"
					:class="['label', 'topic-' + topic.slug]"
				>
					{{ topic.name }}
				</div>
			</span>

			<img
				v-if="content.image"
				:src="content.image.url"
				alt=""
				height="300"
				width="600"
				loading="lazy"
			/>
		</figure>
		<div class="card-content">
			<h4>{{ content.type | formatSlug }}</h4>
			<h3>
				<nuxt-link :to="url" title="" class="line-clamp">{{ content.title }}</nuxt-link>
			</h3>
			<small
				v-if="content.type === 'post'"
				class="card-meta"
				rel="author"
				:data-tooltip="content.date | simpleDate('dddd, MMM DD [at] h:mma')"
			>
				Posted
				<time :datetime="content.date | simpleDate('dddd, MMM DD [at] h:mma')">{{
					content.date | relativeTime
				}}</time>
				by
				{{ content.author.displayName }}
			</small>

			<p class="line-clamp">{{ content.excerpt }}</p>
		</div>
		<footer v-if="content.type !== 'post'">
			<span
				v-for="topic in content.topics"
				:key="topic.id"
				:class="['label', 'topic-' + topic.slug]"
			>
				{{ topic.name }}
			</span>
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
			return string.replace('-', ' ').replace('post', 'blog');
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
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(4px);
		margin-bottom: 0;
		margin-right: 0;
	}
}
</style>
