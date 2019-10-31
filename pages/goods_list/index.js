// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //url搜索关键字 分类页传过来的
    query: "",
    //商品列表 请求回来的数据
    goods: [],

    //判断是否有更多
    hasMore: true,
    //当前的页数
    pagenum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // options是页面的传参数，比如 {query: "曲面电视"}
    const {
      query
    } = options;
    this.setData({
      query
    });
    //请求数据列表
    this.getList();
  },
  //封装请求数据

  getList() {
    request({
      url: "/api/public/v1/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      const {
        goods
      } = res.data.message;
      //判断是否到最后一页
      if (goods.length < 10) {
        this.setData({
          hasMore: false
        })
      }
      // 循环给每个商品价格保留两位小数点
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v;
      })
      //合并数组
      this.setData({
        goods: [...this.data.goods, ...newGoods]
      })
    })
  },
  //触底事件
  onReachBottom() {
    //有更多数据的时候请求下一页数据
    if (this.data.hasMore) {
      //到底部要请求下一页数据
      this.setData({
        pagenum: this.data.pagenum + 1
      })
      //然后再重新请求数据渲染
      this.getList()
    }
  }
})