<template>
  <!-- 渲染容器---在RenderContent使用，将组件包裹起来，统一拥有删除编辑功能 -->
  <div
    class="render-container"
    :class="{
      'active-render': isActiveCurrent,
    }"
    @click="handleClick(renderInfo)"
  >
    <component
      :is="getComponentInfo(renderInfo.compId)"
      :renderInfo="renderInfo"
      v-bind="renderInfo.attrsFormData"
    />
    <div class="button-box">
      <i @click="copyContainer" class="move el-icon-circle-plus-outline"></i>
      <i @click="copyContainer" class="el-icon-copy-document"></i>
      <i @click="deleteContainer" class="el-icon-delete"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditoroPeration from "@/demos/MyEditor/common/EditoroPeration.js";
import "element-ui/lib/theme-chalk/index.css";

export default {
  name: "RenderContainer",
  props: {
    renderInfo: {
      require: true,
      type: Object,
      default: () => {},
    },
    // renderId: {
    //   require: true,
    //   type: [Number, String],
    // },
    // component: {
    //   require: true,
    //   type: [Function, Object],
    // },
  },
  computed: {
    ...mapState("MyEditor", ["currentRenderInfo"]),
    // 当前是否为编辑状态
    isActiveCurrent() {
      return this.currentRenderInfo.renderId === this.renderInfo.renderId;
    },
  },
  methods: {
    ...mapActions("MyEditor", ["updateCurrentRender"]),
    // 获取组件函数
    getComponentInfo(compId) {
      let info = EditoroPeration.getComponentInfo(compId) || {};
      return info.component;
    },
    // 点击当前模块时，同步至store的 当前选中-渲染内容
    handleClick(renderInfo = this.renderInfo) {
      this.updateCurrentRender(renderInfo);
    },
    // 复制容器
    copyContainer() {
      this.$emit("copyRender");
    },
    // 删除容器
    deleteContainer() {
      this.$emit("deleteRender");
    },
  },
  mounted() {
    // 渲染此组件时，同步store里的，当前选中-渲染内容
    this.updateCurrentRender(this.renderInfo);
  },
};
</script>

<style lang="scss" scoped>
.render-container {
  position: relative;
  padding: 20px;
  border: 4px solid rgba(105, 184, 229, 0);
  // 鼠标移至容器上，周围有边悬浮
  &:hover {
    border-color: rgba(105, 184, 229, 0.4);
  }
  // 按钮
  .button-box {
    position: absolute;
    font-size: 24px;
    right: 0;
    bottom: 0;
    visibility: hidden;
    color: rgba(105, 184, 229, 1);
  }
  // 移入-按钮
  &:hover .button-box {
    visibility: visible;
  }
}
// 编辑当前渲染模块
.active-render {
  border-color: rgba(105, 184, 229, 0.8) !important;
}
</style>
