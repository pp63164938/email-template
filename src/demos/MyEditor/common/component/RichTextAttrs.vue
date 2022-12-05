<template>
  <div class="rich-text-attrs">
    <el-form
      ref="form"
      inline
      :model="formData"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="段落">
        <EditorWapper v-model="formData.text" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import attrsMixin from "@/demos/MyEditor/common/component/attrsMixin";
import EditorWapper from "./EditorWapper";

export default {
  name: "RichTextAttrs",
  mixins: [attrsMixin],
  data() {
    return {
      // 默认表单值的数据
      defaultFormData: {
        text: "富文本框内容",
      },
    };
  },
  components: {
    EditorWapper,
  },
};
</script>
