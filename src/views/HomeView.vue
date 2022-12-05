<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    --------------------------------
    <RenderDom :vnode="vnode?.[0]" />
    ------------------------------
    <slot name="b" bData="内部数据"></slot>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import RenderDom from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    RenderDom,
  },
  data() {
    return {
      vnode: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.vnode = this.$scopedSlots?.b();
      console.log(this.vnode[0], "this.vnode");
    });
  },
};
</script>
