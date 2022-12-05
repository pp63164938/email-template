<template>
  <div class="top-button">
    <div>
      <el-button type="danger" @click="$emit('clearAll')">一键清空</el-button>
    </div>
    <div>
      <el-tooltip
        class="item"
        effect="light"
        content="显示上一次保存的内容"
        placement="top-start"
      >
        <el-button type="warning" @click="onLoadJSON"
          >回显数据
          <i class="el-icon-info"></i>
        </el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        content="可刷新回显已保存的内容"
        placement="top-start"
      >
        <el-button type="primary" @click="$emit('exportJSON')"
          >保存JSON <i class="el-icon-info"></i> </el-button
      ></el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        content="开发中"
        placement="top-start"
      >
        <el-button type="success" @click="$emit('exportHTML')"
          >导出HTML
          <i class="el-icon-info"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import showData from "./showData.js";
export default {
  name: "TopButton",
  methods: {
    onLoadJSON() {
      this.$emit("loadJSON", showData);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-button {
  height: 80px;
  background: #2f333c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin: 0 10px;
  }
}
</style>
