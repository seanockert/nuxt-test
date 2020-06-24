<template>
	<header id="header" class="fixed-header">
		<main-nav />
	</header>
</template>

<script>
/* MainHeader
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

import MainNav from './MainNav.vue';

export default {
	name: 'MainHeader',
	components: {
		MainNav,
	},
};
</script>

<style lang="scss">
//
</style>
