<template>
  <div class="Layout">
    <div
      v-for="(cell, cellIndex) in currentCells"
      :key="cellIndex"
      :style="{ width: getPercentage(cell) }"
      class="column"
    >
      <div
        v-show="
          !columnsList ||
          !columnsList[cellIndex] ||
          !columnsList[cellIndex].length
        "
      >
        请拖入
      </div>
      <Draggable
        draggable-class="draggable-class"
        v-if="columnsList[cellIndex]"
        v-model="columnsList[cellIndex]"
        :group="groupConf"
        animation="300"
        @add="onAdd"
      >
        <transition-group style="min-height: 120px; display: block">
          <template
            v-for="(columnRnderInfo, columnRnderIndex) in columnsList[
              cellIndex
            ]"
          >
            <ColumnContainer
              :renderInfo="columnRnderInfo"
              :key="columnRnderInfo.renderId"
              @copyRender="
                copyColumnRender(
                  columnRnderIndex,
                  columnRnderInfo,
                  columnsList[cellIndex]
                )
              "
              @deleteRender="
                deleteColumnRender(
                  columnRnderIndex,
                  columnRnderInfo,
                  columnsList[cellIndex]
                )
              "
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
function isArraySame(arr1, arr2) {
  // 若都为空，则视为相同
  if (!arr1 && !arr2) return true;
  // 长度不相等
  if (arr1.length !== arr2.length) return false;

  // 内容不相等
  for (const [value1, index] of arr1.entries()) {
    if (value1 !== arr2[index]) return false;
  }
  return true;
}
export default {
  inheritAttrs: false,
  name: "Layout",
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
        sort: true,
        pull: true, //可以拖出
        put: (...arg) => {
          // 功能组件放进画布里的容器
          let info = arg[2]._underlying_vm_;
          return info && ["feature"].includes(info.type);
        }, //可以拖出
      },
    };
  },
  computed: {
    // 当前布局规格---[1,2,3]
    currentCells() {
      return this.renderInfo.props.cells;
    },
  },
  methods: {
    ...mapActions("MyEditor", ["updateColumnsList", "spliceColumnsListItem"]),
    // 复制列渲染内容
    copyColumnRender(columnRnderIndex, columnRnderInfo, columnsListItem) {
      this.spliceColumnsListItem({
        actType: "copy",
        columnRnderIndex, // 列内部渲染项的位置
        columnRnderInfo, // 列内部渲染项的信息
        columnsListItem, // 当前列所有渲染信息
      });
      // this.$set(columnsListItem);
    },
    // 删除列渲染内容
    deleteColumnRender(columnRnderIndex, columnRnderInfo, columnsListItem) {
      this.spliceColumnsListItem({
        actType: "delete",
        columnRnderIndex, // 列内部渲染项的位置
        columnRnderInfo, // 列内部渲染项的信息
        columnsListItem, // 当前列所有渲染信息
      });
    },
    // 拖拽新增模块，生成后后回调
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
    // 同步至当前组件columnsList
    syncLocalColumnsList(columnsList) {
      this.columnsList = columnsList;
    },
  },
  watch: {
    // 监听并初始化每一列的渲染内容
    currentCells: {
      handler(value, oldValue) {
        if (value && oldValue && !isArraySame(value, oldValue)) return;
        this.columnsList = value.map(
          // 若有内容则优先以回显内容为主，没有则初始化为空数组
          (item, index) =>
            this.columnsList && this.columnsList.length
              ? this.columnsList[index]
              : []
        );
      },
      immediate: true,
    },

    columnsList: {
      handler(value) {
        this.syncStoreColumnsList(value);
      },
      deep: true,
      // immediate: true,  // 监听renderInfo的优先级需要高于columnsList，故不使用immediate
    },
    renderInfo: {
      handler(rowInfo) {
        // 若rowInfo.columnsList，则说明无需回显，直接取已有的columnsList
        let columnsList = rowInfo.columnsList || this.columnsList;
        this.$nextTick(() => this.syncLocalColumnsList(columnsList));
      },
      deep: true,
      immediate: true,
    },
  },
  components: { ColumnContainer },
};
</script>

<style lang="scss" scoped>
.Layout {
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