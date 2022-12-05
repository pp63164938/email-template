<template>
  <div>
    <DemoComp
      v-for="(compInfo, compName) in componentsJson"
      draggable
      @dragstart.native="handleDragstart($event, compName)"
      :compName="compInfo.showName"
      :key="compName"
    ></DemoComp>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { v4 } from "uuid";
import DemoComp from "../customComponents/DemoComp.vue";
import componentsJson from "../customComponents/componentsJson";

export default {
  data() {
    return { componentsJson };
  },
  methods: {
    ...mapActions("emailTemplate", ["updateCurrentLeft"]),
    handleDragstart(e, compName) {
      let currInfo = { compName, renderId: v4(), event: e };
      this.updateCurrentLeft(currInfo);
    },
  },
  components: {
    DemoComp,
  },
};
</script>

<style>
</style>