<template>
  <div>
    <header id="header" class="fixed-header">
      <nav class="main-nav">
        <h3>Example of a simple layout</h3>
      </nav>
    </header>
    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
/* Blog layout
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'blog',
};
</script>

<style scoped lang="scss">
@import '../assets/scss/style.scss';

.main-nav {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: none;

  h3 {
    margin: $base-padding;
  }
}
</style>
