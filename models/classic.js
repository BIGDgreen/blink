import { HTTP } from '../utils/http.js' // 采用回调函数的写法

class ClassicModel extends HTTP {
  /**
   *获取最新一期的期刊
   *
   * @param {function} sCallback
   * @memberof ClassicModel
   */
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        wx.setStorageSync('latestIndex', res.index);
        wx.setStorageSync(this._getKey(res.index), res);
      }
    });
  }

  /**
   *获取上一期或下一期的期刊
   *
   * @param {number} index
   * @param {string} nextOrprevious
   * @param {function} sCallback
   * @memberof ClassicModel
   */
  getClassic(index, nextOrprevious, sCallback) {
    // 添加缓存机制
    const key = nextOrprevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    const classic = wx.getStorageSync(key);
    if (!classic) {
      // 如果缓存中不存在数据，则从API请求数据，并将数据存入缓存
      this.request({
        url: `classic/${index}/${nextOrprevious}`,
        data: index,
        success: (res) => {
          sCallback(res);
          wx.setStorageSync(key, res);
        }
      })
    } else {
      // 缓存中存在数据，直接从缓存中读取
      sCallback(classic);
    }
  }

  /**
   *获取某一期刊的详细内容
   *
   * @param {number} type
   * @param {number} id
   * @param {function} sCallback
   * @memberof ClassicModel
   */
  getClassicDetail(type, id, sCallback) {
    this.request({
      url: `classic/${type}/${id}`,
      // data: {
      //   type: type,
      //   id: id
      // },
      success: (res) => {
        sCallback(res);
      }
    })
  }

  /**
   *获取我喜欢的期刊
   *
   * @param {function} sCallback
   * @memberof ClassicModel
   */
  getFavor(sCallback) {
    this.request({
      url: 'classic/favor',
      success: (res) => {
        sCallback(res);
      }
    })
  }

  /**
   *判断是否为第一期
   *
   * @param {number} index
   * @returns
   * @memberof ClassicModel
   */
  isFirst(index) {
    return index == 1 ? true : false;
  }

  /**
   *判断是否为最后一期
   *
   * @param {number} index
   * @memberof ClassicModel
   */
  isLatest(index) {
    const latestIndex = wx.getStorageSync('latestIndex');
    return index == latestIndex ? true : false;
  }

  /**
   *获取缓存键值
   *
   * @param {number} index
   * @returns
   * @memberof ClassicModel
   */
  _getKey(index) {
    return 'classic-' + index;
  }
}

export { ClassicModel }