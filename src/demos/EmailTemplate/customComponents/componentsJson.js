export default {
  AboutView: {
    showName: '组件1',
    component: () => import("@/views/AboutView"),
  },
  SlotScopes: {
    showName: '组件2',
    component: () => import("@/components/SlotScopes"),
  },
  X6: {
    showName: '组件3',
    component: () => import("@/demos/X6/index.vue"),
  },
}