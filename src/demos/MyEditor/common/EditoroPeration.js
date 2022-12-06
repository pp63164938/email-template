import ComponentsList from './ComponentsList'
import { v4 } from "uuid";

export default class EditoroPeration extends ComponentsList {
  // 获取导出JSON回显数据---去除component与attrsComponent字段
  static getExportJSON(renderList) {
    return renderList
  }
  // 获取导出HTML字符串
  static getExportHTML() {
  }
  // 导出HTML方式1
  static _exportHtmlWay1() { }
  // 导出HTML方式2
  static _exportHtmlWay2() {
    // 导出容器
    let container = document.createElement('html')
    // 获取html标签
    let htmlEle = document.querySelector('html')
    let htmlStr = htmlEle.outerHTML
    // 获取渲染内容标签
    let renderEle = document.querySelector('.render-content')
    let renderStr = renderEle.outerHTML

    // 往容器里加入内容
    container.innerHTML = htmlStr
    // 将app里的内容替换为渲染标签
    let app = container.querySelector('#app')
    app.innerHTML = renderStr

    // 打开新页面的window
    let newPageWindow = window.open()
    // 为新页面设置导出HTML内容
    newPageWindow.document.querySelector('html').innerHTML = container.outerHTML
    return container.outerHTML
  }
  // 获取加载回显数据---补齐component与attrsComponent的值
  static getLoadJSON(renderList) {
    return renderList
  }
  // 根据组件id，获取组件相关信息
  static getComponentInfo(compId) {
    return super.list.find(item => item.compId === compId)
  }
  // 递归重置renderId与rowRenderId---无需在调用时，深拷贝传参
  static resetDeepRenderId(renderInfo, rowRenderId, childrenStr = 'columnsList') {
    // 在函数内部已深拷贝过一次
    let res = this._resetDeepRenderId(JSON.parse(JSON.stringify(renderInfo)), rowRenderId, childrenStr)
    return res
  }
  static _resetDeepRenderId(renderInfo, rowRenderId, childrenStr) {
    let newRenderInfo = renderInfo;
    if (Array.isArray(newRenderInfo)) {
      for (const info of newRenderInfo) {
        this._resetDeepRenderId(info, rowRenderId, childrenStr);
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
          newRenderInfo[childrenStr] = this._resetDeepRenderId(
            newRenderInfo[childrenStr],
            newRenderInfo.renderId
          );
        }
      }
    }
    return newRenderInfo;
  }

  static _isArray(data) {
    return Array.isArray(data)
  }
  static _isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
  }
}