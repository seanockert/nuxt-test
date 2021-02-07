<template>
	<div>
		<div v-if="error" class="callout">{{ error }}</div>
		<form v-if="isAuthenticated" action="/fn/comment" method="post" class="comment-form flex">
			<!--@submit.prevent="addComment"-->
			<div v-if="loggedInUser.photo" class="profile-wrapper">
				<img
					:src="loggedInUser.photo.url"
					:alt="loggedInUser.displayName"
					height="32"
					width="32"
					class="profile"
				/>
				<div class="profile-outline"></div>
			</div>
			<div>
				<label for="comment" class="hidden">Add a comment</label>
				<textarea
					name="comment"
					id="comment"
					v-model="comment"
					placeholder="Add your comment"
				></textarea>
				<input type="hidden" name="postid" id="postid" :value="id" />
				<button v-if="addingComment" type="submit" class="button button-default" disabled="true">
					Adding...
				</button>
				<button v-else type="submit" class="button button-secondary" :disabled="!comment">
					Add comment
				</button>
			</div>
		</form>
		<div v-else class="callout">Login to comment</div>
	</div>
</template>

<script>
/* CommentForm
 *
 * @parent:
 * @requests:
 * @events:
 * @props: Number id, Number parent
 * @components:
 * @methods: addComment
 */

import { mapGetters } from 'vuex';

export default {
	name: 'CommentForm',
	props: {
		id: {
			type: Number,
		},
		parent: {
			type: Number,
		},
	},
	data() {
		return {
			comment: '',
			addingComment: false,
			error: null,
		};
	},
	computed: {
		...mapGetters(['isAuthenticated', 'loggedInUser']),
	},
	methods: {
		async addComment() {
			if (!this.comment || !this.id) return;

			this.addingComment = true;

			try {
				const response = await this.$axios.$post(this.$axios.defaults.baseURL + '/v1/comment', {
					id: this.id,
					parent: this.parent,
					comment: this.comment,
				});

				// Add comment
				console.log('resource', response);
				this.addingComment = false;
				this.$emit('add-comment', response);
			} catch (error) {
				this.error = error.response ? error.response.data.error : error;
				this.addingComment = false;
			}
		},
	},
};
</script>

<style scoped lang="scss">
form {
	background: $grey-0;
	border-radius: $border-radius;
	margin-bottom: $base-padding;
	padding: $base-padding;
}

textarea {
	margin-bottom: $base-padding/2;
}

.profile-wrapper {
	align-self: flex-start;
	margin-right: $base-padding;
	margin-top: $base-padding/2;
}
</style>
