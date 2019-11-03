// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址接收对象
    address:{},
    //商品数据列表
    goods:null,
  },
  //获取收货地址
  handleAddress(){
    wx.chooseAddress({
      success:(res)=> {
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      this.setData({
        address:{
          userName: res.userName,
          telNumber: res.telNumber,
          detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
        }
      })
      }
    })
  },

  onShow(){
    //每次打开页面的时候从本地获取商品列表数据
    const goods = wx.getStorageSync('goods') || null;

    this.setData({
      goods,
    })
  }
})