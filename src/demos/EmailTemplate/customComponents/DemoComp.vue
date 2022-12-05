<template>
  <!-- :style="{ left: `${50}px`, right: `${20}px` }" -->
  <div class="demo-comp">
    <div class="content">{{ `组件：${compName}` }}</div>
  </div>
</template>

<script>
export default {
  name: "DemoComp",
  props: {
    compName: {
      require: true,
      type: String,
    },
  },
};
</script>


<style lang="scss" scoped>
.demo-comp {
  display: flex;
  justify-content: center;
  align-items: center;
  // position: absolute;
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  margin: 10px 0 0;
  border: 1px solid rgb(209, 209, 209);
  border-radius: 10px;
  background: rgb(219, 242, 255);
  .content {
  }
}
</style>
