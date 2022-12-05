import ComponentsList from './ComponentsList'

export default class EditoroPeration extends ComponentsList {
  // 获取导出JSON回显数据---去除component与attrsComponent字段
  static getExportJSON(renderList, deleteField = ['component', 'attrsComponent', 'cells'],) {
    return this._deleteObjectField(renderList, deleteField)
  }
  // 获取导出HTML字符串
  static getExportHTML() {
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
  static getLoadJSON(renderList, componentsList = super.list, matchField = "compId", setFiels = ['component', 'attrsComponent', 'cells']) {
    // 设置组件关系配置
    let setConfJson = {}
    componentsList.forEach(item => {
      for (const field of setFiels) {
        // 匹配字段的值---区分组件类型
        let matchValue = item[matchField]
        let setValue = componentsList.find(f => f[matchField] === matchValue)[field]
        if (setConfJson[field]) {
          setConfJson[field][matchValue] = setValue
        } else {
          setConfJson[field] = { [matchValue]: setValue }
        }
      }
    })
    return this._addeObjectField(renderList, setConfJson, matchField)
  }


  // 递归删除字段
  static _deleteObjectField(sourceData = {}, deleteField = []) {
    let res = JSON.parse(JSON.stringify(sourceData))

    if (this._isArray(res)) {
      res = res.map(item => this._deleteObjectField(item, deleteField));
    }
    else if (this._isObject(res)) {
      for (const key of deleteField) {
        if (!sourceData[key]) continue
        delete res[key]
      }
    }

    return res
  }
  // 递归添加对象字段---若有这个字段的值匹配上，则直接在同级设置配置里的字段字段值
  static _addeObjectField(sourceData = [], setConfJson = {}, matchField = "") {
    let res = JSON.parse(JSON.stringify(sourceData))

    if (this._isArray(res)) {
      res = res.map(item => this._addeObjectField(item, setConfJson, matchField));
    }
    else if (this._isObject(res)) {
      for (const key in setConfJson) {
        // 若已存在，则退出当此循环
        if (sourceData[key]) continue
        const matchValue = res[matchField] // 匹配字段的值---区分组件类型
        res[key] = setConfJson[key][matchValue]
      }
    }

    return res
  }
  static _isArray(data) {
    return Array.isArray(data)
  }
  static _isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
  }
}