// index.js
import {
  request
} from "../../request/index.js"
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    catesList: [],
    BaokList:[],
    urlPage: 0,
    toTopIshide: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
    Cates: [],
  onLoad: function (options) {
    const localCates = wx.getStorageSync("catess");
    if (!localCates) {
      // 本地没有，网络请求
      this.getCateList();
    } else {
      // 本地有数据，判断是否过期 此处为60秒
      if (Date.now() - localCates.time > 1000*10*6*60**24*7 ) {
        // 数据过期
        this.getCateList();
      } else {
        // 本地数据有效
        this.Cates = localCates.data;
        this.setData({
          catesList: localCates.data
        })
      }
    }



    this.getSwiperList();
    this.getCateList();
    this.getBaokList();
  },
  // getCateList() {
  //   request({
  //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
  //   }).then(result => {
  //     this.setData({
  //       catesList: result.data.message
  //     })
  //   })
  // },
  async getCateList() {
    const result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    })
    this.setData({
      catesList: result.data.message
    })
      this.Cates = result;
    wx.setStorageSync("Cat", {
      time: Date.now(),
      data: this.Cates
    });
  },


  getSwiperList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getBaokList() {
    request({
      url: 'https://api.shop.eduwork.cn/api/goods'
    }).then(res => {
      var urlPage = this.data.urlPage + 1;
      var goodsData = res.data.goods.data.slice(0,6);
      this.setData({
        BaokList: goodsData,
        hotData: res.data.goods.data,
        urlPage: urlPage
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    request({
      url: "https://api.shop.eduwork.cn/api/index?page=" + this.data.urlPage
    }).then(res => {
      var urlPage = this.data.urlPage + 1;
      var bookData = res.data.goods.data;
      var newBookData = [...this.data.hotData,...bookData];
      this.setData({
        hotData: newBookData,
        urlPage: urlPage
      })
      console.log(this.data.listsData)
    })
  },
  // 页面返回顶部
  toTop: (event)=>{
    wx.pageScrollTo({
      duration: 500,
      scrollTop: 0
    })

  },
  onPageScroll: function(e){
    if(e.scrollTop > 200){
      var toTopIshide = true;
    }else{
      var toTopIshide = false;
    }
    this.setData({
      toTopIshide: toTopIshide
    })
  }
})