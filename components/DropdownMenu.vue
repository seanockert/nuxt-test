<template>
  <div :data-position="position" :class="{ dropdown: true, show: isOpen }">
    <a
      v-if="url"
      :href="url"
      :class="['dropdown-toggle', type]"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      ref="dropdown-toggle"
      @click.prevent="toggleOpen()"
    >
      <template v-if="$slots.label">
        <slot name="label"></slot>
      </template>
    </a>
    <button
      v-else
      :class="['dropdown-toggle', type]"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      ref="dropdown-toggle"
      @click.prevent="toggleOpen()"
    >
      <template v-if="$slots.label">
        <slot name="label"></slot>
      </template>
    </button>
    <div class="dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*
 *
 * @parent: /
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods: toggleOpen, onClose
 */

export default {
  name: 'DropdownMenu',
  props: {
    position: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    url: {
      type: String,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    //window.addEventListener('click', this.close);
  },
  beforeDestroy() {
    //window.removeEventListener('click', this.close);
  },
  methods: {
    close(e) {
      if (process.browser) {
        // close dropdown when clicked outside
        if (this.$el.children[0] !== e.target) {
          this.onClose();
        }
      }
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    onClose() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/components/_dropdown.scss';
</style>
