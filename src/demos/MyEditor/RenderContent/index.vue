<template>
  <div class="render-content">
    <!-- 若当前没有可渲染内容，则展示此行，防止 -->
    <!-- handle=".move" -->
    <div v-show="!renderList || !renderList.length" key="0">请拖入组件模块</div>
    <Draggable
      class="draggable-class"
      :group="groupConf"
      v-model="renderList"
      animation="300"
      delay="100"
      forceFallback="true"
      @add="onAdd"
      @start="onStart"
      @end="onEnd"
    >
      <transition-group style="min-height: 120px; display: block">
        <template v-for="(renderInfo, renderIndex) in renderList">
          <RenderContainer
            :renderInfo="renderInfo"
            :key="renderInfo.renderId"
            @copyRender="copyRender(renderIndex, renderInfo, renderList)"
            @deleteRender="deleteRender(renderIndex, renderInfo, renderList)"
          />
        </template>
      </transition-group>
    </Draggable>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import RenderContainer from "./RenderContainer.vue";
import { list as componentsList } from "../common/ComponentsList";
export default {
  name: "RenderContent",
  data() {
    return {
      // 当前页面渲染列表
      renderList: [
        // { renderId: 1, component: () => import("@/components/HelloWorld.vue") },
      ],
      // 导航模块组件列表
      componentsList,
      groupConf: {
        // name: "block",
        // pull: true, //可以拖出
        // put: true, //可以拖入
        name: "element",
        pull: true, //可以拖出
        put: (...arg) => {
          let info = arg[2]._underlying_vm_;
          return ["layout", "tempalte"].includes(info.type);
        }, //可以拖出
      },
    };
  },
  computed: {
    ...mapState("MyEditor", ["allRenderList"]),
    ...mapGetters("MyEditor", ["allRenderAttrs"]),
  },
  methods: {
    ...mapActions("MyEditor", ["updateAllRenderList", "spliceAllRenderList"]),
    // 拷贝渲染模块
    copyRender(renderIndex, renderInfo, renderList) {
      this.spliceAllRenderList({
        actType: "copy",
        renderIndex,
        renderInfo,
        renderList,
      });
    },
    // 删除渲染模块
    deleteRender(renderIndex, renderInfo, renderList) {
      this.spliceAllRenderList({
        actType: "delete",
        renderIndex,
        renderInfo,
        renderList,
      });
    },
    // 同步渲染列表至本地
    asyncToLocalData(value) {
      this.renderList = value;
    },
    // 同步渲染列表至store的allRenderList
    asyncToAllRenderList(renderList) {
      this.updateAllRenderList({ renderList });
    },
    // 新增模块时触发
    onAdd(e) {
      // return e;
      console.log(e, "onAdd");
    },
    onStart(e) {
      return e;
      // console.log(e, "start");
    },
    onEnd(e) {
      return e;
      // console.log(e, "end");
    },
  },
  watch: {
    allRenderList: {
      handler(value) {
        this.asyncToLocalData(value);
      },
      deep: true,
      immediate: true,
    },
    renderList: {
      handler(value) {
        this.asyncToAllRenderList(value);
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    RenderContainer,
  },
};
</script>

<style lang="scss" scoped>
.render-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  overflow: scroll;
  flex: 1;
  min-width: 300px;
  margin: 0 10px;
  padding: 10px 0;
  background: rgb(232, 227, 236);
  .draggable-class {
    box-sizing: border-box;
    // box-sizing: content-box;
    text-align: left;
    width: 90%;
    min-height: 200px;
    // background: rgb(235, 235, 235);
  }
  .empty-module {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: rgb(224, 224, 224);
  }
}
</style>