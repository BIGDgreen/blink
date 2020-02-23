// components/classic/episode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer(newVal, oldVal, changedPath) {
        // console.log("newVal:::",newVal,"oldValue:::",oldVal,"changedPath:::",changedPath);
        let value = parseInt(newVal) > 10 || parseInt(newVal) == 0 ? newVal : '0' + newVal;
        // console.log("value:::",value);
        this.setData({
          _index: value
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
    ],
    month: '',
    year: 0,
    _index: ''
  },

  /**
   * 组件生命周期方法列表
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let date = new Date();
      let thisYear = date.getFullYear();
      let thisMonth = this.data.months[date.getMonth()];
      this.setData({
        year: thisYear,
        month: thisMonth
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
