// pages/book/book.js
import { BookModel } from '../../models/book'
import { random } from '../../utils/random-str'
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const bookList = await bookModel.getHotList().catch(err=>{console.error(err)});
    console.log("bookList:::", bookList);
    this.setData({
      bookList
    })
  },
  
  /**
   * 监听页面触底
   */
  onReachBottom(){
    // console.log("page,reachBottom");
    this.setData({
      more: random(16)  // 使用16位随机字符串，使每一次触底more的值都发生更新
    })
  },
 
  /**
   * 点击搜索框
   * @param {*} event 
   */
  onSearch(event) {
    // console.log("onSearch:::", event);
    this.setData({
      searching: true
    })
  },

  /**
   * 取消搜索
   * @param {*} event 
   */
  onCancel(event) {
    this.setData({
      searching: false
    })
  }
})