<template>
  <div class="layout_1-1-1">
    <div
      v-for="(cell, cellIndex) in currentCells"
      :key="cellIndex"
      :style="{ width: getPercentage(cell) }"
      class="column"
    >
      <div v-show="!columnsList[cellIndex].length">请拖入</div>
      <Draggable
        draggable-class="draggable-class"
        v-model="columnsList[cellIndex]"
        :group="groupConf"
        animation="300"
        @add="onAdd"
      >
        <transition-group style="min-height: 120px; display: block">
          <template v-for="columnRnderInfo in columnsList[cellIndex]">
            <!-- @copyRender="copyRender" -->
            <!-- @deleteRender="deleteRender" -->
            <ColumnContainer
              :renderInfo="columnRnderInfo"
              :key="columnRnderInfo.renderId"
            />
          </template>
        </transition-group>
      </Draggable>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ColumnContainer from "./ColumnContainer.vue";
export default {
  inheritAttrs: false,
  name: "Layout_1-1-1",
  props: {
    text: String,
    renderInfo: Object,
  },
  data() {
    return {
      // 当前单元格各自的渲染内容
      columnsList: [],
      groupConf: {
        name: "element",
        pull: true, //可以拖出
        put: true,
        // put: (...arg) => {
        //   // 功能组件放进画布里的容器
        //   let isLayout = arg[2]._underlying_vm_.isLayout;
        //   return false
        //   // return !isLayout;
        // }, //可以拖出
      },
    };
  },
  computed: {
    // 当前布局规格---[1,2,3]
    currentCells() {
      return this.renderInfo.cells;
    },
  },
  methods: {
    ...mapActions("MyEditor", ["updateColumnsList"]),
    onAdd(e) {
      let renderInfo = e.item._underlying_vm_;
      this.setRowRenderId(renderInfo, this.renderInfo.renderId);
    },
    // 为column列数据渲染内容，设置row行数据渲染Id
    setRowRenderId(rowInfo, rowRenderId) {
      this.$set(rowInfo, "rowRenderId", rowRenderId);
    },
    // 获取百分比
    getPercentage(currCell, cells = this.currentCells) {
      // 分母---累加所有cell的总数
      let allBase = cells.reduce((b1, b2) => b1 + b2);
      // 当前cell / 分母
      let res = currCell / allBase;
      // 取整数百分比
      return Math.round(res * 100) + "%";
    },
    // 同步至store里，设置allRenderList行数据里相应的列数据
    syncStoreColumnsList(columnsList = this.columnsList) {
      this.updateColumnsList({
        rowRenderId: this.renderInfo.renderId,
        columnsList,
      });
    },
  },
  mounted() {},
  watch: {
    getPercentage: {
      handler() {
        this.columnsList = this.currentCells.map((item) => []);
      },
      immediate: true,
    },
    columnsList: {
      handler(value) {
        this.syncStoreColumnsList(value);
      },
      immediate: true,
    },
  },
  components: { ColumnContainer },
};
</script>

<style lang="scss" scoped>
.layout_1-1-1 {
  .draggable-class {
    min-height: 100px;
  }
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .row {
    background: rgb(255, 245, 246);
    border: 1px solid #000;
    // height: 100px;
  }
  .column {
    display: inline-block;
    box-sizing: border-box;
    min-height: 100px;
    background: rgb(255, 245, 246);
    border: 1px solid #000;
    // height: 100px;
  }
}
</style>