<template>
  <div class="text-attrs">
    <el-form
      ref="form"
      inline
      :model="formData"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="文字">
        <el-input
          v-model="formData.text"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import attrsMixin from "@/demos/MyEditor/common/component/attrsMixin";
export default {
  name: "TextAttrs",
  mixins: [attrsMixin],
  data() {
    return {
      // 默认表单值的数据
      defaultFormData: {
        text: "文字内容",
      },
    };
  },
};
</script>
<style>
.text-attrs {
  text-align: left;
}
</style>