//app.js
import request from "./utils/request.js"
App({
  onLaunch(){
    // 指定基准路径
    request.defaults.baseURL = "https://api.zbztb.cn"
  }
})