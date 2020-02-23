// components/search/index.js
import { KeywordModel } from './keywordModel'
import { BookModel } from '../../models/book'
import { paginationBeh } from './paginationBeh'
const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  behaviors: [paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [], // 历史记录
    hotWords: [], // 热门搜索
    searched: false,  // 控制搜索结果的显示
    loadingCenter: false,
    inputValue: ''
  },

  lifetimes: {
    /**
     * 在组件实例进入页面节点树时执行
     * 获取历史记录和热门标签
     */
    attached: function() {
      // console.log("historyWords:::", keywordModel.getHistory());
      this.setData({
        historyWords: keywordModel.getHistory()
      });
      keywordModel.getHot()
        .then(res => {
          // console.log("hotTags:::", res.hot);
          this.setData({
            hotWords: res.hot
          })
        })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击“取消”，取消搜索，回到热门书籍展示
     * @param {*} event 
     */
    onCancel(event) {
      this.initialize();
      this.triggerEvent('cancel', {}, {});
    },

    /**
     * 点击清除按钮，清除搜索结果，回到搜索提示
     * @param {*} event 
     */
    onDelete(event) {
      this.initialize();
      this.setData({
        inputValue: '',
        searched: false
      })
    },

    /**
     * 确认搜索
     * @param {*} event 
     */
    onConfirm(event) {
      // console.log("confirmInput:::", event);
      // 展示搜索结果
      this.setData({
        searched: true,
        loadingCenter: true
      })
      const input = event.detail.value || event.detail.tagContent;
      this.setData({
        inputValue: input
      });
      if(input.trim()) {
        this.initialize();  // 初始化数据，防止数据累积
        bookModel.searchBook(this.getCurrentStart(), input)
        .then(res => {
          console.log("searchResult:::", res);
          // 将本搜索加入历史记录
          keywordModel.addHistory(input);
          // 显示搜索结果，更新输入框内容
          this.setData({
            loadingCenter: false,
            dataArray: res.books
          });
          // 设置数据总数量
          this.setTotal(res.total);
        })
        .catch(err => {
          // 解除请求锁定
          this.unlock();
          // 取消加载状态
          this.setData({
            loadingCenter: false
          })
        })
      }
    },

    /**
     * 上拉触底，加载更多
     */
    loadMore() {
      // console.log("component,reachBottom");
      // 不发送请求的条件：1.搜索内容为空 2.请求锁定（上一组数据正在加载） 3.数据加载完毕
      if((!this.data.inputValue) || this.isLocked() || !this.hasMore()) return;
      // 锁定请求
      this.lock();
      // 请求更多数据
      bookModel.searchBook(this.getCurrentStart(), this.data.inputValue)
        .then(res => {
          // 请求成功，合并请求结果与原数组，解除锁定
          this.setMoreData(res.books);
          this.unlock();
        })
    }
  }
})
