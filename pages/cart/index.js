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
    //计算总价格
    allPrice:0,
    // 是否全选
    allSelected: true
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
        // 把收获地址保存到本地
        wx.setStorageSync("address", this.data.address);
      }
    })
  },

  onShow(){
    //每次打开页面的时候从本地获取商品列表数据
    const goods = wx.getStorageSync('goods') || null;

    this.setData({
      goods,
    })
    //计算总价格
    this.handleAllPrice()
    // 判断全选状态
    this.handleAllSelected();
  },
  //数量减1
  handleReduce(event){
    const { id } = event.target.dataset;
    let { goods } = this.data;
    if (goods[id].number <= 1){
      wx.showModal({
        title: '提示',
        content: '是否要删除商品？',
        success:(res)=> {
          if (res.confirm) {
            //删除商品
            delete goods[id];
            // 由于showModal是异步执行，所以需要把修改data值的方式放到success中
            //判断一个对象是否为空对象
            if(Object.keys(goods).length === 0){
              goods = null;
            }
            this.setData({
              goods
            });
            //保存到本地
            wx.setStorageSync("goods", goods)
          }
        }
      })

    } else {
      //数量减一
      goods[id].number -= 1

      //修改data的值
      this.setData({
        goods
      })

      // 保存到本地
      wx.setStorageSync("goods", goods);
      //计算总价格
      this.handleAllPrice()
    }
  },
  //数量加1
  handleAdd(event){
    const {id} = event.target.dataset;
    const {goods} = this.data;
    console.log(id)
    //数量加一
    goods[id].number += 1;

    //修改data的值
    this.setData({
      goods
    }) 

    // 保存到本地
    wx.setStorageSync("goods", goods);
    //计算总价格
    this.handleAllPrice()
  },
  // 监听输入框的数量输入
  //输入框输入数量
  handleChange(event){
    //获取输入框的值
    const value = +event.detail.value;
    const {id} = event.target.dataset;
    const {goods} = this.data;

    //如果是空或者是0
    goods[id].number = value === 0 ? 1 : value;

    //修改data数据
    this.setData({
      goods
    })

    //保存到本地
    wx.setStorageSync("goods", goods)
  },
  //转换是否有小数点
  handleInput(event){
    //获取输入框的值
    const value = +event.detail.value;
    const { id } = event.target.dataset;
    const { goods } = this.data;
    //判断是否有小数点 直接向下取整
    goods[id].number === Math.floor(value)

    //修改data数据
    this.setData({
      goods
    })
  },
  //选中状态取反
  handleSelected(event){
    const { id } = event.target.dataset;
    const { goods } = this.data;

    //把选中的状态取反
    goods[id].selected = !goods[id].selected

    //修改data数据
    this.setData({
      goods
    })

    //保存到本地
    wx.setStorageSync("goods", goods)
    //计算总价格
    this.handleAllPrice()
    // 判断全选状态
    this.handleAllSelected();
  },

  //封装计算总价格
  handleAllPrice() {
    const { goods } = this.data;
    let price = 0;

    // 开始计算, v就是key，也就是商品id
    Object.keys(goods).forEach(v=>{
      //当前选中的商品
      if(goods[v].selected){
        //单价乘以数量
        price += goods[v].number * goods[v].goods_price 
      }
    })

    //修改data数据
    this.setData({
      allPrice:price
    })
  },

  // 单项的全选状态
  handleAllSelected(){
    const { goods } = this.data;
    let isSelect= true;

    Object.keys(goods).forEach(v=>{
       // 判断是否有一个是没选中
      if(!goods[v].selected){
      isSelect = false;
      }
    })
    this.setData({
      allSelected:isSelect
    })
  },

  //点击全选按钮的事件
  handleAllSelectedEvent(){
    const { goods, allSelected } = this.data;

    // 循环取反选中状态，取反是根据allSelected
    Object.keys(goods).forEach(v => {
      goods[v].selected = !allSelected
    })

    this.setData({
      goods,
      // 判断全选状态
      allSelected: !allSelected
    });
    // 保存到本地
    wx.setStorageSync("goods", goods);
    // 计算总价格
    this.handleAllPrice();
  },

  //提交
  handleSubmit(){
    //测试提交
    //判断本地是否有token 有token就跳转到订单详情页 没有跳转到登录页
    if(wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/order_enter/index',
      })
    }else{
      wx.navigateTo({
        url: '/pages/auth/index',
      })
    }
  }
})