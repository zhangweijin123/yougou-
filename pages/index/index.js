//index.js
import request from "../../utils/request.js"
Page({
  data: {
    background:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  onLoad(){
    request({
      url:"/api/public/v1/home/swiperdata"
    }).then(res=>{
      const {message} = res.data;
      this.setData({
        background:message
      })
    })
  }
})