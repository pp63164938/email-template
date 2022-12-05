<template>
  <div
    v-bind:id="id"
    class="unlayer-editor"
    v-bind:style="{ minHeight: minHeight }"
  ></div>
</template>

<script>
// import { loadScript } from "./loadScript";

// import str from "./abc.js";
// console.log(str, 'str');
// eval(str)
// console.log(abc, '-------------');
// import  "./embed";
// import pkg from "@/../package.json";
// console.log(unlayer.createEditor(), "unlayer");

let lastEditorId = 0;

export default {
  name: "EmailEditor",
  props: {
    editorId: String,
    options: Object,
    projectId: Number,
    tools: Object,
    appearance: Object,
    locale: String,
    minHeight: {
      type: String,
      default: "500px",
    },
  },
  computed: {
    id() {
      return this.editorId || `editor-${++lastEditorId}`;
    },
  },
  mounted() {
    this.loadEditor();
    // loadScript(this.loadEditor.bind(this));
  },
  methods: {
    loadEditor() {
      const options = this.options || {};

      if (this.projectId) {
        options.projectId = this.projectId;
      }

      if (this.tools) {
        options.tools = this.tools;
      }

      if (this.appearance) {
        options.appearance = this.appearance;
      }

      if (this.locale) {
        options.locale = this.locale;
      }

      /* global unlayer */
      // let obj = {
      //   ...options,
      //   id: this.id,
      //   displayMode: "email",
      //   source: {
      //     name: pkg.name,
      //     version: pkg.version,
      //   },
      // };
      // this.editor = unlayer.createEditor(obj);
      this.editor = unlayer.createEditor({
        ...options,
        id: this.id,
        displayMode: "email",
        source: {
          // name: pkg.name,
          // version: pkg.version,
        },
      });

      this.$emit("load");

      this.editor.addEventListener("editor:ready", () => {
        this.$emit("ready");
      });
    },
    loadDesign(design) {
      this.editor.loadDesign(design);
    },
    saveDesign(callback) {
      this.editor.saveDesign(callback);
    },
    exportHtml(callback) {
      this.editor.exportHtml(callback);
    },
  },
};
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>
