// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //判断是否点击取消按钮
      isShow:false,
      //点击取消清除输入框的值
      searchValue:'',
      //搜索历史列表
      keywords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    //每次页面显示重新获取本地数据渲染
    this.setData({
        keywords:wx.getStorageSync('search') || []
    })
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
      isShow,
      //如果输入框有值复制给searchValue
      searchValue: value
    })
  },
  handleClear(){
    console.log(123)
    //修改searchValue的值
    this.setData({
      isShow:false,
      searchValue:''
    })
  },
  //点击右下角确定按钮时触发
  handleConfirm(){
    const arr = wx.getStorageSync('search') || [];

    //判断本地是否有数据。有的话就追加unshift
    arr.unshift(this.data.searchValue);

    //保存到本地
    wx.setStorageSync('search',arr);

    //跳转到搜索列表页
    wx.navigateTo({
      url: '/pages/goods_list/index?query='+ this.data.searchValue,
    })
  }
})