<template>
  <div class="email-editor-demo">
    <DesignEdit></DesignEdit>
  </div>
</template>

<script>
import DesignEdit from "./DesignEdit.vue";
export default {
  components: {
    DesignEdit,
  },
};
</script>

<style>
.email-editor-demo {
  height: calc(100% - 120px);
}
</style>