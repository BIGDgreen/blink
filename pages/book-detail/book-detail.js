import { BookModel } from "../../models/book";
import { LikeModel } from "../../models/like"
const bookModel =  new BookModel()
const likeModel = new LikeModel()

// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: Object,
    likeNum: 0,
    likeStatus: false,
    comments: [],
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中，请稍候',
      mask: true,
    });
    const bookId = options.bookId;
    // console.log("params:::", options.bookId);
    const bookDetail = bookModel.getDetail(bookId);
    const likeStatus = bookModel.getLikeStatus(bookId);
    const comments = bookModel.getComments(bookId);

    Promise.all([bookDetail, likeStatus, comments])
      .then(res => {
        console.log("bookData:::", res);
        wx.hideLoading();
        this.setData({
          book: res[0],
          likeNum: res[1].fav_nums,
          likeStatus: res[1].like_status,
          comments: res[2].comments
        })
      })
      .catch(err => {
        wx.hideLoading();
      }) 
  },

  /**
   *点赞或取消点赞
   *
   * @param {*} event
   */
  onLike(event) {
    const likeOrCancel = event.detail.behavior;
    likeModel.like(likeOrCancel, this.data.book.id, 400);
  },

  /**
   * 点击虚假输入框
   */
  onFakePost() {
    this.setData({
      posting: true
    })
  },

  /**
   * 取消输入
   */
  onCancel() {
    this.setData({
      posting: false
    })
  },

  /**
   * 评论点击标签+1
   * @param {*} event 
   */
  onPost(event) {
    console.log("CommentTap:::", event);
    const comment = event.detail.tagContent || event.detail.value;

    if(!comment) return;

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComments(1049, comment)
      .then(res => {
        console.log("postComment:::", res);
        wx.showToast({
          title: '操作成功'
        })
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          // posting: false
        })
      })
  }
})