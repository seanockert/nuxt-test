<template>
	<li>
		<div class="comment">
			<img
				v-if="comment.author.photo"
				:src="comment.author.photo.url"
				:alt="comment.author.displayName"
				class="circle"
				height=""
				width=""
			/>
			<div>
				<header>
					<strong rel="author">{{ comment.author.displayName || 'Anonymous' }}</strong>
					&middot;
					<time pubdate :datetime="comment.date" :title="comment.date | simpleDate">{{
						comment.date | relativeTime
					}}</time>
					&middot;
					<button>Reply</button>
				</header>
				<p>{{ comment.content }}</p>
			</div>
		</div>
		<ul v-if="comment.comments" class="no-list">
			<comment v-for="subcomment in comment.comments" :key="subcomment.id" :comment="subcomment" />
		</ul>
	</li>
</template>

<script>
/* Comment
 *
 * @parent:
 * @requests:
 * @events:
 * @props: Object comment
 * @components:
 * @methods:
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Comment from '~/components/Comment.vue';

export default {
	name: 'Comment',
	components: {
		Comment,
	},
	props: {
		comment: { type: Object, default: null },
	},
	created() {
		dayjs.extend(relativeTime);
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
@import '../assets/scss/components/_comment.scss';
</style>
