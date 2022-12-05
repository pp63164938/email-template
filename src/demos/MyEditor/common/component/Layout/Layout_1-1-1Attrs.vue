<template>
  <div class="text-attrs">
    <el-form
      ref="form"
      inline
      :model="formData"
      label-width="80px"
      label-position="top"
    >
      栅栏布局属性
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
  name: "Layout_1-1-1Attrs",
  mixins: [attrsMixin],
  data() {
    return {
      // 默认表单值的数据
      defaultFormData: {
        text: "文字内容1",
        style: {
          // height: "500px",
        },
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