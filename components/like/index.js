// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * (开放性数据)
   */
  properties: {
    like: Boolean,
    likeNum: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击爱心，点赞数加一或减一，切换爱心状态
    onLike(event) {
      if(this.properties.readOnly) return;  // 只读时，不做任何处理
      let like = this.properties.like;
      let likeNum = this.properties.likeNum;

      likeNum = like ? likeNum - 1 : likeNum + 1;
      // 更新数据
      this.setData({
        like: !like,
        likeNum: likeNum
      })
      // 激活自定义事件like
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like',{ behavior }, {});
    }
  }
})
