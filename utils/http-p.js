import { config } from '../config.js'

class HTTP {
  request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, data, method, resolve, reject);
    })
  }
  _request(url, data = {}, method = 'GET', resolve, reject) {
    wx.request({
      url: config.commonUrl + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {   
        // console.log("res:::",res);
        let code = res.statusCode.toString();
        if(code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          // 服务器异常
          const err_code = res.data.error_code;
          const err_msg = res.data.msg;
          this._show_err(err_code,err_msg);
        }
      },
      // api调用失败
      fail: (err) => {
        reject();
        console.error("fail_err",err);
        this._show_err();
      }
    })
  }

  _show_err(err_code,err_msg) {
    if(!err_code) {
      err_msg = '出现了一个错误~';
    }
    wx.showToast({
      title: err_msg,
      icon: "none",
      duration: 3000
    })
  }
}

export { HTTP }