// 导航模块组件列表

import template1 from '@/demos/MyEditor/common/component/Template/template1.js'
export default class ComponentsList {
  static list = [
    // {
    //   compId: 'Layout_1-1-1',  // 组件id---唯一标识
    //   compName: '栅栏布局1-1-1', // 组件描述
    //   component: () => import("./component/Layout/Layout.vue"),  // 渲染组件
    //   attrsComponent: () => import("./component/Layout/LayoutAttrs.vue"),  // 编辑组件
    //   type: 'layout',  // 组件使用类型---layout:布局(用于栅栏布局)   feature:功能(文本、按钮等)  template:模板(指定布局和功能的组合模板)
    //   props: { cells: [1, 1, 1] }, // 传参
    // },
    {
      compId: 'temp1',
      compName: '模板1',
      // 模板无需使用组件，依赖于props.templateConfig里的内容
      // component: '',
      // attrsComponent: '',
      type: 'template',
      props: {
        templateConfig: template1,
      },
    },
    {
      compId: 'Layout_1-1-1',
      compName: '栅栏布局1-1-1',
      component: () => import("./component/Layout/Layout.vue"),
      attrsComponent: () => import("./component/Layout/LayoutAttrs.vue"),
      type: 'layout',
      props: { cells: [1, 1, 1] },
    },
    {
      compId: 'Layout_1-1-3',
      compName: '栅栏布局1-1-3',
      component: () => import("./component/Layout/Layout.vue"),
      attrsComponent: () => import("./component/Layout/LayoutAttrs.vue"),
      type: 'layout',
      props: { cells: [1, 1, 3] },
    },
    {
      compId: 'Text',
      compName: '文本',
      component: () => import("./component/Text.vue"),
      attrsComponent: () => import("./component/TextAttrs.vue"),
      type: 'feature',
    },
    {
      compId: 'RichText',
      compName: '富文本',
      component: () => import("./component/RichText.vue"),
      attrsComponent: () => import("./component/RichTextAttrs.vue"),
      type: 'feature',
    },
    {
      compId: 'ElButton',
      compName: '按钮',
      component: () => import("./component/Button.vue"),
      attrsComponent: () => import("./component/ButtonAttrs.vue"),
      type: 'feature',
    },
    {
      compId: 'ElDivider',
      compName: '分割线',
      component: () => import("./component/Divider.vue"),
      attrsComponent: () => import("./component/ButtonAttrs.vue"),
      type: 'feature',
    }
  ]
}

export const list = ComponentsList.list