<template>
  <div id="designEdit">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <!-- <router-link to="/dashboard">Dashboard</router-link> -->
        <button v-on:click="saveDesign">Save Design</button>
        <button v-on:click="exportHtml">Export HTML</button>
      </div>

      <EmailEditor
        ref="emailEditor"
        v-on:load="editorLoaded"
        v-on:ready="editorReady"
      />
    </div>
  </div>
</template>

<script>
import EmailEditor from "./components/EmailEditor.vue";
// import { EmailEditor } from '../components'
// import sample from "./data/sample.js";

export default {
  name: "designEdit",
  components: {
    EmailEditor,
  },
  methods: {
    // called when the editor is created
    // 根据使用的模块和属性进行回显
    editorLoaded() {
      // this.$refs.emailEditor.editor.loadDesign(sample);
      console.log("editorLoaded");
    },
    // called when the editor has finished loading
    // 编辑器加载完成
    editorReady() {
      console.log("editorReady");
    },
    // 获取当前使用的模块和属性对象---用于回显编辑页面
    saveDesign() {
      this.$refs.emailEditor.editor.saveDesign((design) => {
        console.log("saveDesign", design);
      });
    },
    // 获取当前模块和属性所生成的HTML字符串---用于回显预览页面，渲染html
    exportHtml() {
      this.$refs.emailEditor.editor.exportHtml((data) => {
        console.log("exportHtml", data);
      });
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

/* #app, */
#designEdit {
  height: 100%;
}

#designEdit .container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

#bar {
  flex: 1;
  background-color: #40b883;
  color: #fff;
  padding: 10px;
  display: flex;
  max-height: 40px;
}

#bar h1 {
  flex: 1;
  font-size: 16px;
  text-align: left;
}

#bar button {
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #000;
  color: #fff;
  border: 0px;
  max-width: 150px;
  cursor: pointer;
}

#bar a {
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: 0px;
  cursor: pointer;
  text-align: right;
  text-decoration: none;
  line-height: 160%;
}
</style>
