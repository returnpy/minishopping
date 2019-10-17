import {
  getMultidata,
  getData
} from '../../service/home.js'

const types = ['pop', 'new', 'sell']

const TOP_DISTANCE = 1000

Page({

  // 页面的初始数据
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    isBackTop: false,
    isTabFixed: false,
    currentTabCtlDistance: ''
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    // 轮播图和推荐的图片
    this._getMultidata()
    // 商品展示
    this._getData('pop')
    this._getData('new')
    this._getData('sell')
  },

  handleTabControl(e) {
    const index = e.detail.index
    this.setData({
      currentType: types[index]
    })
  },

  _getMultidata() {
    getMultidata()
      .then(res => {
        let banners = res.data.banner.list;
        let recommends = res.data.recommend.list
        this.setData({
          banners,
          recommends
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  _getData(type) {
    const page = this.data.goods[type].page + 1;
    getData(type, page).then(res => {
      let oldList = this.data.goods[type].list
      oldList.push(...res.data.list)
      let listKey = `goods.${type}.list`
      let pagekey = `goods.${type}.page`
      this.setData({
        [listKey]: oldList,
        [pagekey]: page
      })

    }).catch(err => {
      console.log(err)
    })
  },

  //  页面上拉触底事件的处理函数

  onReachBottom: function() {
    this._getData(this.data.currentType)
  },

  // 固定tab-control
  handleTabFixed() {
    wx.createSelectorQuery().select('#my-recommends').boundingClientRect(res => {
      this.data.currentTabCtlDistance = res.top
    }).exec()
  },

  onPageScroll(options) {
    // 判断什么时候出现"回到顶部"的按钮
    let scrollTop = options.scrollTop
    let flag = scrollTop >= TOP_DISTANCE
    if (flag !== this.data.isBackTop) {
      this.setData({
        isBackTop: flag
      })
    }

    // 判断什么时候让tab-control固定到顶部
    let flag2 = scrollTop >= this.data.currentTabCtlDistance
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})