import { createApp } from 'vue'
import Taro from '@tarojs/taro'
import { Toast } from '@nutui/nutui-taro'

import './app.scss'

// 创建应用实例
const App = createApp({
  onShow(options) {
    console.log('App onShow')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// 注册全局组件
App.component('nut-toast', Toast)

// 全局错误处理
App.config.errorHandler = (err, vm, info) => {
  console.error('应用错误:', err, info)
  Taro.showToast({
    title: '应用发生错误',
    icon: 'none'
  })
}

export default App
