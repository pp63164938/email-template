<template>
  <div
    class="nav-button"
    v-bind="$attrs"
    style="
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    "
  >
    <a>{{ text }}</a>
    <!-- <el-button v-bind="$attrs">{{ text }}</el-button> -->
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