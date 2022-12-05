<template>
  <div class="rich-text" v-html="text"></div>
</template>

<script>
export default {
  name: "RichText",
  inheritAttrs: false,
  props: {
    text: {
      type: String,
    },
  },
};
</script>