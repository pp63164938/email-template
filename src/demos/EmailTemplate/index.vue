<template>
  <div class="EmailTemplate">
    <Left class="left-container"></Left>
    <Center class="center-container"></Center>
    <Right class="right-container"></Right>
  </div>
</template>

<script>
import Left from "./container/Left.vue";
import Center from "./container/Center.vue";
import Right from "./container/Right.vue";
export default {
  name: "EmailTemplate",
  mounted() {},
  components: {
    Left,
    Center,
    Right,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.EmailTemplate {
  display: flex;
  width: 100vw;
  height: 100vh;

  .left-container {
    width: 200px;
    padding: 0 10px;
    background: rgb(233, 233, 233);
  }
  .center-container {
    flex: 1;
    overflow: auto;
    position: relative;
    background: rgb(238, 240, 255);
  }
  .right-container {
    width: 200px;
    background: rgb(253, 255, 231);
  }
}
</style>

