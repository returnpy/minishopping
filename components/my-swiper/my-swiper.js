// components/my-swiper/my-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goheight: function(e) {
      var width = wx.getSystemInfoSync().windowWidth
      //获取可使用窗口宽度
      var imgheight = e.detail.height
      //获取图片实际高度
      var imgwidth = e.detail.width
      //获取图片实际宽度
      var height = width * imgheight / imgwidth + "px"
      //计算等比swiper高度
      this.setData({
        height: height
      })
    }
  }
})