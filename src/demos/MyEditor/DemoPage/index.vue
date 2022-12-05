<template>
  <div>
    <TopButton
      @clearAll="clearAll"
      @exportJSON="exportJSON"
      @exportHTML="exportHTML"
      @loadJSON="loadJSON"
    />
    <MyEditor ref="MyEditor" />
  </div>
</template>

<script>
import TopButton from "./TopButton";
import MyEditor from "@/demos/MyEditor";
import showData from "./showData.js";
export default {
  name: "DemoPage",
  methods: {
    clearAll() {
      this.$refs.MyEditor.clearAllRender();
    },
    loadJSON(data) {
      let cache = this.localStorage("get");
      this.$refs.MyEditor.getLoadJSON(cache || data);
    },
    exportJSON() {
      let res = this.$refs.MyEditor.getExportJSON();
      this.localStorage("set", res);
      this.$message.success("保存成功！刷新即可回显");
    },
    exportHTML() {
      this.$refs.MyEditor.getExportHTML();
      this.$message.warning("功能正在开发中！");
    },
    localStorage(actType, data) {
      switch (actType) {
        case "set":
          localStorage.setItem("allRenderList", JSON.stringify(data));
          break;
        case "get":
          return JSON.parse(localStorage.getItem("allRenderList"));
      }
    },
  },
  mounted() {
    // 默认回显内容
    this.loadJSON(showData);
  },
  components: {
    TopButton,
    MyEditor,
  },
};
</script>

<style>
</style>