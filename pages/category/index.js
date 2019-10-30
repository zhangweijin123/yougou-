// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //当前选中的索引 默认初始为0
      current:0
  },
  //点击左侧菜单时候出发
  handleChange(event){
    //获取index
    const {index} = event.target.dataset;

    this.setData({
      current : index
    })
  }
})