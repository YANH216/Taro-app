import Taro from "@tarojs/taro";

class HttpRequest {
  // 参数顺序要与传递过来的参数顺序一致
  baseOptions (params, isShowLoading = true, method = "GET") {
    isShowLoading && Taro.showLoading({ title: "加载中", mask: true })

    let { url, data, contentType } = params

  /*   
    // 如果有token验证的情况下
    let headerParam = {
      Authorization: "bearer " + Taro.getStorageSync("tokenInfo")
    } 
  */

    const BASE_URL = 'https://api-hmugo-web.itheima.net'

    return new Promise((resolve, reject) => {
      Taro.request({
        url: BASE_URL + url,
        data: data,
        method: method,
        header: {
          "content-type": contentType,
          // 如果有token验证
          // ...headerParam
        },
        success(res) {
          isShowLoading && Taro.hideLoading()
          resolve(res.data)
        },
        fail(err) {
          const errRes = err.hasOwnProperty("data")
            ? err.data
            : { successd: false, errMsg: "请求异常" }
          reject(errRes)
        }
      })
    })
  }
  // get请求
  get(url, data = "", isShowLoading = true, contentType = "application/json") {
    let option = { url, data, contentType }
    return this.baseOptions(option, isShowLoading)
  }
  
  // post请求
  post(url, data = "", isShowLoading = true, contentType = "application/json") {
    let params = { url, data, contentType }
    return this.baseOptions(params, "POST", isShowLoading)
  }
}

export { HttpRequest }