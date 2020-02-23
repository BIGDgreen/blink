import { config } from '../config.js'

// const tips = {
//   1: '出现了一个错误~',
//   1005:'appkey无效，请前往www.7yue.pro申请',
//   3000:'期刊不存在'
// }

class HTTP {
  request(params) {
    if(!params.method) {  // 默认GET方法
      params.method = "GET";
    }
    wx.request({
      url: config.commonUrl + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {   
        // console.log("res:::",res);
        let code = res.statusCode.toString();
        if(code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          // 服务器异常
          let err_code = res.data.error_code;
          let err_msg = res.data.msg;
          this._show_err(err_code,err_msg);
        }
      },
      // api调用失败
      fail: (err) => {
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