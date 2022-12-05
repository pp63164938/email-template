<template>
  <!-- 渲染容器---在Center使用，将组件包裹起来，统一拥有删除编辑功能 -->
  <div class="render-container">
    <span @click="editContainer">编辑</span>
    <span @click="deleteContainer">删除</span>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RenderContainer",
  props: {
    renderId: {
      require: true,
      type: Number,
    },
  },
  // computed: {
  //   ...mapState("emailTemplate", ["renderList"]),
  // },
  methods: {
    ...mapActions("emailTemplate", ["updateRenderList"]),
    // 编辑容器
    editContainer() {},
    // 删除容器
    deleteContainer() {
      this.updateRenderList({ actType: "delete", renderId: this.renderId });
    },
  },
};
</script>

<style lang="scss" scoped>
.render-container {
  border: 4px solid rgba(255, 255, 255, 0);
  // 鼠标移至容器上，周围有边悬浮
  &:hover {
    border-color: rgb(161, 161, 161);
  }
}
</style>
