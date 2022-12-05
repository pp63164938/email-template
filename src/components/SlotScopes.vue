<template>
  <div>
    *****************
    <!-- <RenderDom></RenderDom> -->
    <template v-for="(slotFn, slotName) in slotList">
      <template v-for="(vnode, vnodeInd) in slotFn()">
        <RenderDom :vnode="vnode" :key="slotName + vnodeInd"></RenderDom>
      </template>
    </template>
    ******************
  </div>
</template>
<script>
export default {
  name: "SlotScopes",
  data() {
    return {
      a: 123,
      slotList: [],
    };
  },
  mounted() {
    this.$scopedSlots;
    // this.$nextTick(() => {
    this.slotList = this.$scopedSlots;
    // console.log(this.slotList, "this.vnode");
    // });
  },
  components: {
    RenderDom: {
      props: ["vnode"],
      name: "RenderDom",
      render() {
        // return (<template>123</template>)
        return this.vnode || false;
      },
    },
  },
};
</script>