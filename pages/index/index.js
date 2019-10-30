//index.js
import request from "../../utils/request.js"
Page({
  data: {
    // 轮播图列表数据
    background:[],

    //菜单列表数据
    menus:[]
  },



  onLoad(){
    //请求轮播图数据
    request({
      url:"/api/public/v1/home/swiperdata"
    }).then(res=>{
      const {message} = res.data;
      this.setData({
        background:message
      })
    })

    //请求菜单列表数据
    request({
      url:"/api/public/v1/home/catitems"
    }).then(res=>{
      console.log(res)
      const {message} = res.data;
      this.setData({
        menus:message
      })
    })
  }
})