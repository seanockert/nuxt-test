<template>
	<footer id="footer" class="section section-primary">
		<div class="text-center">
			<small
				><a href="#" title="">&copy; {{ thisYear }} Teach Starter Pty Ltd</a> &nbsp;·&nbsp;
				<a href="#" title="">Privacy Policy</a> &nbsp;·&nbsp;
				<a href="#" title="">Terms &amp; Conditions</a>
			</small>
		</div>
	</footer>
</template>

<script>
/* MainFooter
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
	name: 'MainFooter',
	data() {
		return {
			thisYear: new Date().getFullYear(),
		};
	},
};
</script>

<style scoped lang="scss">
footer {
	margin-top: 10rem;
}
</style>
