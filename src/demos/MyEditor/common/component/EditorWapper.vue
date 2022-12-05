<template>
  <div id="editor—wrapper">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="editor-container"><!-- 编辑器 --></div>
  </div>
</template>

<script>
import { createEditor, createToolbar } from "@wangeditor/editor";
export default {
  name: "EditorWapper",
  props: {
    value: String,
  },
  data() {
    const { onChange } = this;
    return {
      editor: null,
      toolbar: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入...",
        onChange,
      },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    createWangeditor() {
      const editor = createEditor({
        selector: "#editor-container",
        html: "<p><br></p>",
        config: this.editorConfig,
        mode: this.mode, // or 'simple'
      });
      this.editor = Object.seal(editor);

      const toolbar = createToolbar({
        editor,
        selector: "#toolbar-container",
        config: this.toolbarConfig,
        mode: "default", // or 'simple'
      });
      this.toolbar = toolbar;
    },
    // 同步html的更新
    updateHtml(html) {
      this.$emit("input", html);
    },
    // 给编辑器设置html
    setHtml(html) {
      this.editor.setHtml(html);
    },
    onChange(editor) {
      const html = editor.getHtml();
      this.updateHtml(html);
    },
  },
  watch: {
    value: {
      handler(val) {
        console.log(val, "watch");
        this.$nextTick(() => this.editor.setHtml(val));
      },
      immediate: true,
    },
  },
  mounted() {
    this.createWangeditor();
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style>
.rich-text-attrs {
  text-align: left;
}

#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100; /* 按需定义 */
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}
#editor-container {
  height: 300px;
}
</style>