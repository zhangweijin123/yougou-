// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址接收对象
    address:{}
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
  }
})