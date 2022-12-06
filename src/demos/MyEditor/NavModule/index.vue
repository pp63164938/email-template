<template>
  <div class="nav-module">
    <!-- handle=".move" -->
    <Draggable
      :group="groupConf"
      v-model="componentsList"
      forceFallback="true"
      :clone="onClone"
      :move="onMove"
      @start="onStart"
      @end="onEnd"
    >
      <transition-group style="min-height: 120px; display: block">
        <div
          data-compId
          class="module"
          v-for="item in componentsList"
          :key="item.compId"
        >
          <!-- <span class="move">+</span> -->
          {{ `${item.compName}` }}
        </div>
      </transition-group>
    </Draggable>
  </div>
</template>

<script>
import { v4 } from "uuid";
import { list as componentsList } from "../common/ComponentsList";
export default {
  name: "NavModule",
  data() {
    return {
      componentsList,
      groupConf: {
        name: "element",
        pull: "clone", //可以拖出
        put: false, //可以拖入
        sort: true,
      },
    };
  },
  computed: {
    // 当前导航所有模块的compId
    allModuleIdList() {
      return this.componentsList.map((item) => item.compId);
    },
  },
  methods: {
    // 获取配置项---move事件不支持
    getConfItem(e) {
      return e.item._underlying_vm_ || {};
    },
    onStart(e) {
      return e;
      // console.log(e, "start");
    },
    onEnd(e) {
      return e;
      // console.log(e, "end");
    },
    // 拖动时触发---返回Boolean，是否可做为落脚点
    // 拖动时触发---返回Boolean，是否可停靠
    onMove(e) {
      return e;
      // let dragInfo = e.draggedContext.element;
      // let res = ["layout"].includes(dragInfo.type)
      // return ["layout"].includes(dragInfo.type);

      // 落脚点信息
      // let dropInfo = e.relatedContext.element;
      // // 不允许当前导航区所有模块之间停靠，仅可被拖进渲染内容区
      // let isDrop = !dropInfo || dropInfo.renderId;
      // return true;
      // return !!isDrop;
    },
    // 递归重置renderId与rowRenderId
    resetDeepRenderId(renderInfo, rowRenderId, childrenStr = "columnsList") {
      let newRenderInfo = renderInfo;
      if (Array.isArray(newRenderInfo)) {
        for (const info of newRenderInfo) {
          this.resetDeepRenderId(info, rowRenderId, childrenStr);
        }
      } else if (
        Object.prototype.toString.call(newRenderInfo) === "[object Object]"
      ) {
        for (const key in newRenderInfo) {
          // 替换原有的renderId
          if (key === "renderId") newRenderInfo.renderId = v4();
          // 替换行数据的renderId
          if (rowRenderId) newRenderInfo.rowRenderId = rowRenderId;

          // 有子项则递归---带上横数据renderId，在列数据赋值至rowRenderId
          if (key === childrenStr) {
            newRenderInfo[childrenStr] = this.resetDeepRenderId(
              newRenderInfo[childrenStr],
              newRenderInfo.renderId
            );
          }
        }
      }
      return newRenderInfo;
    },
    // 复制时触发---拖拽到另一片区域
    onClone({ compId, type = "feature", props = {} } = {}) {
      // 若为模板模块，则重置内部所有的renderId与rowRenderId并返回
      if (type === "template") {
        return this.resetDeepRenderId(
          JSON.parse(JSON.stringify(props.templateConfig))
        );
      }

      // 常规返回（非模板）
      // 将在在渲染页面(RenderContent)生成的配置项
      return {
        renderId: v4(),
        compId,
        type,
        props,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-module {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(224, 224, 224);
}
.module {
  width: 150px;
  height: 50px;
  margin: 10px;
  line-height: 50px;
  background: rgb(252, 255, 255);
}
</style>
