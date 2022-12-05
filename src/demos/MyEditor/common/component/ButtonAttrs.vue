<template>
  <div class="nav-button-attrs">
    <el-form
      ref="form"
      inline
      :model="formData"
      label-width="80px"
      label-position="top"
    >
      <!-- 按钮文本 -->
      <el-form-item label="按钮文本">
        <el-input
          v-model="formData.text"
          placeholder="请输入按钮文本"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 按钮类型 -->
      <el-form-item label="按钮类型">
        <el-select
          v-model="formData.type"
          placeholder="请选择按钮类型"
          clearable
          filterable
        >
          <el-option
            v-for="item in typeList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import attrsMixin from "@/demos/MyEditor/common/component/attrsMixin";
export default {
  name: "NavButtonAttrs",
  mixins: [attrsMixin],
  data() {
    return {
      // 当前组件表单数据
      formData: {},
      // 默认表单值的数据
      defaultFormData: {
        text: "按钮名称",
        type: "primary",
      },
      typeList: [
        {
          label: "默认按钮",
          value: "default",
          color: "#606266",
          "background-color": "#FFF",
          "border-color": "#DCDFE6",
        },
        {
          label: "主要按钮",
          value: "primary",
          color: "#FFF",
          "background-color": "#409EFF",
          "border-color": "#409EFF",
        },
        {
          label: "成功按钮",
          value: "success",
          color: "#FFF",
          "background-color": "#67C23A",
          "border-color": "#67C23A",
        },
        {
          label: "信息按钮",
          value: "info",
          color: "#FFF",
          "background-color": "#909399",
          "border-color": "#909399",
        },
        {
          label: "警告按钮",
          value: "warning",
          color: "#FFF",
          "background-color": "#E6A23C",
          "border-color": "#E6A23C",
        },
        {
          label: "危险按钮",
          value: "danger",
          color: "#FFF",
          "background-color": "#F56C6C",
          "border-color": "#F56C6C",
        },
      ],
    };
  },
  methods: {
    // 按钮类型改变，则给style赋值相应的样式
    typeChange(value) {
      let typeItem = this.typeList.find((item) => item.value === value) || {};
      let getItemStyle = this.deleteObjectKey(typeItem, [
        "label",
        "value",
        "name",
      ]);
      let setStyle = { ...(this.formData.style || {}), ...getItemStyle };
      this.$set(this.formData, "style", setStyle);
      // // 含有样式调整，避免数据更新但未渲染情况
      // this.$nextTick(() => this.$set(this.formData, "style", setStyle));
    },
    // 剔除对象中的字段
    deleteObjectKey(source, exclude = []) {
      let res = {};
      for (const key in source) {
        // 不为剔除字段，则拷贝
        if (!exclude.includes(key)) res[key] = source[key];
      }
      return res;
    },
  },
  watch: {
    "formData.type": {
      handler(val) {
        this.typeChange(val);
        // 含有样式调整，避免数据更新但未渲染情况
        // this.$nextTick(() => this.typeChange(val));
      },
      immediate: true,
    },
  },
};
</script>
<style>
.nav-button-attrs {
  text-align: left;
}
</style>