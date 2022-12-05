export default {
  namespaced: true,
  state: {
    // 当前左边拖拽的组件信息
    currentLeft: 123,
    // 渲染列表
    renderList: []
  },
  getters: {},
  mutations: {
    UPDATE_CURRENT_LEFT(state, payload) { state.currentLeft = payload },
    UPDATE_RENDER_LIST(state, payload) {
      let { actType, renderId } = payload
      let deleteIndex
      switch (actType) {
        case 'add':
          state.renderList.push(state.currentLeft)
          break;
        case 'delete':
          deleteIndex = state.renderList.find(el => el.renderId === renderId)
          state.renderList.splice(deleteIndex, 1)
          break;

      }
    }
  },
  actions: {
    updateCurrentLeft({ commit }, payload) { commit('UPDATE_CURRENT_LEFT', payload) },
    updateRenderList({ commit }, payload) { commit('UPDATE_RENDER_LIST', payload) }
  },
}