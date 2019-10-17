// components/my-back-top/my-back-top.js
Component({
  // 组件的方法列表
  methods: {
    handleBackTop() {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})