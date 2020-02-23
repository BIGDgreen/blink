// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookItem: Object,
    showLike: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      const bookId = this.properties.bookItem.id;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bookId=${bookId}`
      })
    }
  }
})
