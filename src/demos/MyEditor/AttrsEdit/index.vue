<template>
  <div class="attrs-edit">
    <keep-alive>
      <!-- :attrsData="allRenderAttrs[currentRenderId]?.attrsFormData || {}" -->
      <component
        @updateForm="onUpdateForm"
        :ref="`compRef_${currentRenderInfo.compId}_${currentRenderInfo.renderId}}`"
        :attrsData="
          (currentRenderInfo && currentRenderInfo.attrsFormData) || {}
        "
        :is="currentAttrsComp"
        :key="`${currentRenderInfo.compId}_${currentRenderInfo.renderId}}`"
      />
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import EditoroPeration from "@/demos/MyEditor/common/EditoroPeration.js";
export default {
  name: "AttrsEdit",
  computed: {
    ...mapState("MyEditor", ["currentRenderInfo"]),
    ...mapGetters("MyEditor", ["allRenderAttrs"]),
    // 当前渲染组件对应的属性组件
    currentAttrsComp() {
      let compId = this.currentRenderInfo.compId;
      return (EditoroPeration.getComponentInfo(compId) || {}).attrsComponent;
      // return this.currentRenderInfo.attrsComponent;
    },
    // 当前属性表单数据
    currentFormData() {
      const { renderId } = this.currentRenderInfo;
      const refName = `compRef_${renderId}`;
      // return this.$refs.compRef;
      return [
        renderId,
        refName,
        this.$refs[refName],
        this.$refs[refName] && this.$refs[refName].formData,
      ];
    },
    // // 当前渲染组件的 渲染Id
    currentRenderId() {
      return this.currentRenderInfo.renderId;
    },
  },
  methods: {
    ...mapActions("MyEditor", ["updateAllRenderList"]),
    // 表单更新
    onUpdateForm(formData) {
      this.asyncToRenderAttrs(formData);
    },
    // 同步至store的allRenderAttrs(所有渲染内容的属性)
    asyncToRenderAttrs(formData) {
      this.updateAllRenderList({
        renderId: this.currentRenderId,
        attrsFormData: formData,
        rowRenderId: this.currentRenderInfo.rowRenderId,
      });
    },
  },
  mounted() {},
  components: {
    // AttrsContainer,
  },
};
</script>

<style lang="scss" scoped>
.attrs-edit {
  width: 500px;
  padding: 20px;
  form {
    display: flex;
    justify-content: center;
  }
  background: rgb(241, 241, 241);
}
</style>