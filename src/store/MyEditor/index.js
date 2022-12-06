import Vue from 'vue'
import { v4 } from 'uuid'
import EditoroPeration from "@/demos/MyEditor/common/EditoroPeration.js";

export default {
  namespaced: true,
  state: {
    // 当前选中-渲染内容
    currentRenderInfo: {},
    // 所有渲染内容的属性List
    allRenderList: []
  },
  getters: {
    // 所有渲染内容的属性
    allRenderAttrs({ allRenderList }) {
      let obj = {}
      for (const item of allRenderList || []) {
        obj[item.renderId] = item
      }
      return obj
    }
  },
  mutations: {
    UPDATE_CURRENT_RENDER(state, renderInfo) {
      state.currentRenderInfo = renderInfo
    },
    UPDATE_ALL_RENDER_LIST(state, { attrsFormData, renderList, renderId, rowRenderId }) {
      // 有rowRenderId时，则给某一行数据，里对应的列数据设置属性编辑表单
      if (rowRenderId) {
        let rowRenderInfo = state.allRenderList.find(item => item.renderId === rowRenderId) || {}
        let columnRenderInfo = getColumnInfo(rowRenderInfo, renderId)
        Vue.set(columnRenderInfo, 'attrsFormData', attrsFormData)
      }
      // 有renderId时，则单独赋值 所编辑的表单数据；无则整体List更新
      else if (renderId) {
        let current = state.allRenderList.find(item => item.renderId === renderId) || {}
        Vue.set(current, 'attrsFormData', attrsFormData)
      } else {
        state.allRenderList = renderList
      }
    },
    // 切割allRenderList---对横向数据进行添加删除
    SPLICE_ALL_RENDER_LIST(state, { actType, renderIndex, renderInfo, renderList, }) {
      let allRenderList = renderList
      // 操作渲染数据索引
      let currentIndex = renderIndex
      // 新的渲染数据---用于复制
      let newRenderInfo
      switch (actType) {
        // 复制渲染模块 
        case 'copy':
          newRenderInfo = EditoroPeration.resetDeepRenderId(renderInfo)
          allRenderList.splice(currentIndex, 0, newRenderInfo)
          // 当前编辑属性面板置更新为当前新渲染信息
          state.currentRenderInfo = newRenderInfo
          break;
        // 删除渲染模块
        case 'delete':
          allRenderList.splice(currentIndex, 1)
          // 当前编辑属性面板置为空
          state.currentRenderInfo = {}
          break;
      }
    },
    // 为allRenderList更新columnsList属性
    UPDATE_COLUMNS_LIST(state, { rowRenderId, columnsList = [] }) {
      let rowIndex = state.allRenderList.findIndex(f => f.renderId === rowRenderId)
      Vue.set(state.allRenderList[rowIndex], 'columnsList', columnsList)
    },
    // 切割columnList里，某一项的渲染数据---对纵向渲染数据进行添加删除
    SPLICE_COLUMNS_LIST_ITEM(state, { actType, columnRnderIndex, columnRnderInfo, columnsListItem }) {
      // 操作渲染数据索引
      let currentIndex = columnRnderIndex
      // 新的渲染数据---用于复制
      let newColumnRnderInfo
      switch (actType) {
        // 复制列内部渲染模块
        case 'copy':
          newColumnRnderInfo = {
            ...columnRnderInfo,
            renderId: v4(),  // 新的id
            attrsFormData: deepCopy(columnRnderInfo.attrsFormData)  // 属性表单需要深拷贝
          }
          columnsListItem.splice(currentIndex, 0, newColumnRnderInfo)
          // 当前编辑属性面板置更新为当前新渲染信息
          state.currentRenderInfo = newColumnRnderInfo
          break;
        // 删除列内部渲染模块
        case 'delete':
          columnsListItem.splice(currentIndex, 1)
          // 当前编辑属性面板置为空
          state.currentRenderInfo = {}
          break;
      }
    },
  },
  actions: {
    updateCurrentRender({ commit }, payload) { commit('UPDATE_CURRENT_RENDER', payload) },
    updateAllRenderList({ commit }, payload) { commit('UPDATE_ALL_RENDER_LIST', payload) },
    spliceAllRenderList({ commit }, payload) { commit('SPLICE_ALL_RENDER_LIST', payload) },
    updateColumnsList({ commit }, payload) { commit('UPDATE_COLUMNS_LIST', payload) },
    spliceColumnsListItem({ commit }, payload) { commit('SPLICE_COLUMNS_LIST_ITEM', payload) },
  },
}

// 根据renderId，获取行数据里相应的列数据---在若干个数组里的数组查询
function getColumnInfo(row, renderId) {
  return row.columnsList
    .find(item => {
      return item.find(citem => citem.renderId === renderId)
    })
    .find(item => item.renderId === renderId)
}
// 获取复制的渲染信息---需新的renderId
function getDeepCopyColumnsList(columnsList) {
  let newClumnsList = deepCopy(deepCopy)
  newClumnsList.forEach(item => {
    item.forEach(info => {
      info.renderId = v4()  // 新的id
    })
  });
  return newClumnsList
}
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}
