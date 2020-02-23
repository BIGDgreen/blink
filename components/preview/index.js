// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     *点击我喜欢的期刊
     */
    onTap() {
      const classic = this.properties.classic;
      this.triggerEvent('tapping', {classic}, {});
    }
  }
})
