// pages/category/index.js

import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //当前选中的索引 默认初始为0
      current:0,
      //数据
      list:[]
  },
  //点击左侧菜单时候出发
  handleChange(event){
    //获取index
    const {index} = event.target.dataset;

    this.setData({
      current : index
    })
  },

  onLoad(){
    request({
      url: "/api/public/v1/categories"
    }).then(res=>{
      console.log(res)
      const {message} = res.data;
      this.setData({
        list:message
      })
    })
  }
})