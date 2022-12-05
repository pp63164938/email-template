import { v4 } from 'uuid'
import Vue from 'vue'
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
        let columnRenderInfo = geColumnInfo(rowRenderInfo, renderId)
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
    // 切割allRenderList---对一维数据进行添加删除
    SPLICE_ALL_RENDER_LIST(state, { actType, renderInfo }) {
      let allRenderList = state.allRenderList
      // 操作渲染数据索引
      let currentIndex = allRenderList.findIndex(item => item.renderId === renderInfo.renderId)
      // 新的渲染数据---用于复制
      let newRenderInfo
      switch (actType) {
        // 复制渲染模块
        case 'copy':
          newRenderInfo = {
            ...renderInfo,
            renderId: v4(),  // 新的id
            attrsFormData: JSON.parse(JSON.stringify(renderInfo.attrsFormData)) // 属性表单需要深拷贝
          }
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
    }
  },
  actions: {
    updateCurrentRender({ commit }, payload) { commit('UPDATE_CURRENT_RENDER', payload) },
    updateAllRenderList({ commit }, payload) { commit('UPDATE_ALL_RENDER_LIST', payload) },
    spliceAllRenderList({ commit }, payload) { commit('SPLICE_ALL_RENDER_LIST', payload) },
    updateColumnsList({ commit }, payload) { commit('UPDATE_COLUMNS_LIST', payload) },
  },
}

// 根据renderId，获取行数据里相应的列数据---在若干个数组里的数组查询
function geColumnInfo(row, renderId) {
  return row.columnsList
    .find(item => {
      return item.find(citem => citem.renderId === renderId)
    })
    .find(item => item.renderId === renderId)
}
