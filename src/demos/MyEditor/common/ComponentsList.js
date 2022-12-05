// 导航模块组件列表
export default class ComponentsList {
  static list = [
    {
      compId: 'Layout',
      compName: '栅栏布局1-1-1',
      component: () => import("./component/Layout/Layout.vue"),
      attrsComponent: () => import("./component/Layout/LayoutAttrs.vue"),
      cells: [1, 1, 1]
    },
    {
      compId: 'Layout_1-1-3',
      compName: '栅栏布局1-1-3',
      component: () => import("./component/Layout/Layout.vue"),
      attrsComponent: () => import("./component/Layout/LayoutAttrs.vue"),
      cells: [1, 1, 3]
    },
    {
      compId: 'Text',
      compName: '文本',
      component: () => import("./component/Text.vue"),
      attrsComponent: () => import("./component/TextAttrs.vue"),
    },
    {
      compId: 'RichText',
      compName: '富文本',
      component: () => import("./component/RichText.vue"),
      attrsComponent: () => import("./component/RichTextAttrs.vue"),
    },
    {
      compId: 'ElButton',
      compName: '按钮',
      component: () => import("./component/Button.vue"),
      attrsComponent: () => import("./component/ButtonAttrs.vue"),
    },
    {
      compId: 'ElDivider',
      compName: '分割线',
      component: () => import("./component/Divider.vue"),
      attrsComponent: () => import("./component/ButtonAttrs.vue"),
    }
  ]
}

export const list = ComponentsList.list