import Vue from 'vue'
import Vuex from 'vuex'
import emailTemplate from './emailTemplate/'
import MyEditor from './MyEditor/'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    MyEditor,
    emailTemplate
  }
})

