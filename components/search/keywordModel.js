import { HTTP } from "../../utils/http-p";

class KeywordModel extends HTTP{
  key = 'histories'
  maxLength = 10

  /**
   * 获取历史记录
   *
   * @returns {Array}
   * @memberof KeywordModel
   */
  getHistory() {
    const words = wx.getStorageSync(this.key);
    return words? words : [];
  }

  /**
   * 获取热搜关键字
   *
   * @returns {Promise}
   * @memberof KeywordModel
   */
  getHot() {
    return this.request({
      url:'/book/hot_keyword'
    })
  }

  /**
   * 将用户输入的内容加入历史搜索记录
   *
   * @param {*} input
   * @memberof KeywordModel
   */
  addHistory(inputValue) {
    // console.log("inputValue:::", inputValue);
    let words = this.getHistory(this.key);
    if(inputValue !== "") {
      const has = words.includes(inputValue);
      if(!has) {
        // 原历史记录中不存在，则加入历史记录
        words.unshift(inputValue);
        // 截取1~10个
        if(words.length > this.maxLength) {
          words = words.slice(0, 10)
        }
        wx.setStorageSync(this.key, words);
      }
    }
    // console.log("words:::", words);
  }
}

export { KeywordModel }
