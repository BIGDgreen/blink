import { HTTP } from '../utils/http-p.js' // 采用回调函数的写法

class ClassicModel extends HTTP {
 /**
  *获取最新一期的期刊
  *
  * @returns
  * @memberof ClassicModel
  */
  async getLatest() {
    const res = await this.request({url: 'classic/latest'}).catch(err => {
      console.error("getLatest:::", err);
    });
    // 将最新一期的期刊加入缓存
    wx.setStorageSync('latestIndex', res.index);
    wx.setStorageSync(this._getKey(res.index), res);
    return res;
  }

 /**
  *获取上一期或下一期的期刊
  *
  * @param {*} index
  * @param {*} nextOrprevious
  * @returns
  * @memberof ClassicModel
  */
  async getClassic(index, nextOrprevious) {
    // 添加缓存机制
    const key = nextOrprevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    const classic = wx.getStorageSync(key);
    if(!classic) {
      console.log("来自api");
      // 如果缓存中不存在数据，则从API请求数据，并将数据存入缓存
      const res = await this.request({
        url: `classic/${index}/${nextOrprevious}`,
        data: index
      });
      wx.setStorageSync(key, res);
      return res;
    } else {
      console.log("来自缓存");
      return classic;
    }
  }

  /**
   *获取某一期刊的详细内容
   *
   * @param {*} type
   * @param {*} id
   * @returns
   * @memberof ClassicModel
   */
  async getClassicDetail(type, id) {
    const res = await this.request({url:`classic/${type}/${id}`});
    return res;
  }

  /**
   *获取我喜欢的期刊
   *
   * @returns
   * @memberof ClassicModel
   */
  getFavor() {
    return this.request({url:'classic/favor'});
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