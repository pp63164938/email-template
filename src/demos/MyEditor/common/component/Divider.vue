<template>
  <div class="nav-divider">
    <el-divider v-bind="$attrs"></el-divider>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "NavDivider",
  props: {
    text: {
      type: String,
    },
  },
};
</script>