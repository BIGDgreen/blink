/**
 * 封装“加载更多”逻辑
 */
const paginationBeh = Behavior({
  data: {
    dataArray: [],  // 数据列表
    total: null,  // 数据总数
    loading: false,  // 数据加载状态，为true时，进入锁定状态，禁止再次发送请求
    noneResult: false // 没有搜索结果
  },
  methods: {
    /**
     * 合并更多数据与原数据
     *
     * @param {Array} dataArray
     */
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray,
      })
    },

    /**
     *获取发送api请求的start开始索引
     *获取当前数据列表的长度
     * @returns {number}
     */
    getCurrentStart() {
      return this.data.dataArray.length;
    },

    /**
     *设置返回数据的总数
     *
     * @param {number} total
     */
    setTotal(total) {
      this.data.total = total;
      if(total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    /**
     *是否还有数据可加载
     *
     * @returns {Boolean}
     */
    hasMore() {
      return this.getCurrentStart() < this.data.total ? true : false;
    },

    /**
     *数据初始化，清空数据列表，解除加载锁定
     *
     */
    initialize() {
      this.setData({
        dataArray: [],
        loading: false,
        noneResult: false
      });
      this.data.total = null;
    },

    /**
     *是否处于锁定状态
     *
     * @returns {Boolean}
     */
    isLocked() {
      return this.data.loading
    },

    /**
     *进入锁定状态
     */
    lock() {
      this.setData({
        loading: true
      })
    },

    /**
     *解除锁定状态
     */
    unlock() {
      this.setData({
        loading: false
      })
    }
  }
})

export { paginationBeh }
