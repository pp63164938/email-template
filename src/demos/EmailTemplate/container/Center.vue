<template>
  <div @dragover.prevent @drop.prevent="handleDrop">
    <template v-for="renderInfo in renderList">
      <RenderContainer :key="renderInfo.renderId">
        <component
          :is="componentsJson[renderInfo.compName].component"
          :renderId="renderInfo.renderId"
        ></component>
      </RenderContainer>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import componentsJson from "../customComponents/componentsJson";
import RenderContainer from "./RenderContainer";

export default {
  data() {
    return {
      componentsJson,
    };
  },
  computed: {
    ...mapState("emailTemplate", ["renderList"]),
  },
  methods: {
    ...mapActions("emailTemplate", ["updateRenderList"]),
    handleDragover(e) {
      console.log(e);
    },
    handleDrop(e) {
      this.updateRenderList({ actType: "add" });
      console.log(e);
    },
  },
  mounted() {
    console.log(this.$store.state.emailTemplate.currentLeft);
  },
  components: {
    RenderContainer,
  },
};
</script>

<style>
</style>