// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //url搜索关键字 分类页传过来的
      query:"",
      //商品列表 请求回来的数据
      goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options是页面的传参数，比如 {query: "曲面电视"}
    const { query } = options;
    this.setData({
      query
    });
      request({
        url:"/api/public/v1/goods/search",
        data:{
          query,
          pagenum:1,
          pagesize:10
        }
      }).then(res=>{
        console.log(res)
        const {goods} = res.data.message;

        // 循环给每个商品价格保留两位小数点
        const newGoods = goods.map(v=>{
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v;
        })

        this.setData({
          goods
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})