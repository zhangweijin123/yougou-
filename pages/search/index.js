// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //判断是否点击取消按钮
      isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //监听输入框输值得时候事件
  handleInput(event){
      //获取输入框的值注意wxml中的事件是brindinput=handleInput
      const {value} = event.detail
      // 声明isShow变量
      let isShow;

    //判断输入框里面有没有值 trim()去除前后空格
    //如果输入框里面有值 那么就是true显示取消按钮 则反之
    isShow = value.trim() ? true : false
    // 改变isShow的状态
    this.setData({
      isShow
    })

  },
  
})