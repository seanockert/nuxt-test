<template>
  <div :data-position="position" :class="{ dropdown: true, show: isOpen }">
    <button
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
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    if (process.browser) {
      let self = this;
      window.addEventListener('click', function(e) {
        // close dropdown when clicked outside
        if (self.$el.children[0] !== e.target) {
          self.onClose();
        }
      });
    }
  },
  methods: {
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
