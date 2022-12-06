<template>
  <div class="my-editor">
    <NavModule />
    <RenderContent />
    <AttrsEdit />
  </div>
</template>

<script>
import NavModule from "./NavModule";
import RenderContent from "./RenderContent";
import AttrsEdit from "./AttrsEdit";

import { mapActions, mapState } from "vuex";
import EditoroPeration from "./common/EditoroPeration";

export default {
  name: "MyEditor",
  methods: {
    ...mapActions("MyEditor", ["updateAllRenderList"]),
    // 清空所有渲染内容
    clearAllRender() {
      this.updateAllRenderList({ renderList: [] });
    },
    // 获取加载渲染内容并挂载
    getLoadJSON(data) {
      let res = EditoroPeration.getLoadJSON(data);
      this.updateAllRenderList({ renderList: res });
      return res;
    },
    // 导出渲染内容为JSON
    getExportJSON() {
      let res = EditoroPeration.getExportJSON(this.allRenderList);
      console.log("exportJSON", res);
      return res;
    },
    // 导出渲染内容为HTML字符串
    getExportHTML() {
      let res = EditoroPeration.getExportHTML(this.allRenderList);
      console.log("exportHTML", res);
      return res;
    },
  },
  computed: {
    ...mapState("MyEditor", ["allRenderList"]),
  },
  components: {
    NavModule,
    RenderContent,
    AttrsEdit,
  },
};
</script>

<style lang="scss" scoped>
.my-editor {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
}
</style>