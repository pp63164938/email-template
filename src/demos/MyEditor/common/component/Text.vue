<template>
  <div class="nav-button">
    {{ text }}
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "NavButton",
  props: {
    text: {
      type: String,
    },
  },
};
</script>