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
  async onLoad(options) {
    wx.showLoading({
      title: '加载中，请稍候',
      mask: true,
    });
    const bookId = options.bookId;
    // console.log("params:::", options.bookId);
    const bookDetail = await bookModel.getDetail(bookId).catch(err => {this._showError(err)});
    const likeStatus = await bookModel.getLikeStatus(bookId).catch(err => {this._showError(err)});
    const comments = await bookModel.getComments(bookId).catch(err => {this._showError(err)});

    // Promise.all([bookDetail, likeStatus, comments])
      // .then(res => {
        // console.log("bookData:::", res);
        if(bookDetail) {
          wx.hideLoading();
        }
        this.setData({
          book: bookDetail,
          likeNum: likeStatus.fav_nums,
          likeStatus: likeStatus.like_status,
          comments: comments.comments
        })
      // })
  },

  _showError(error) {
    wx.hideLoading();
    console.error(error);
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
  async onPost(event) {
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

    const res = await bookModel.postComments(1049, comment);
    console.log("postComment:::", res);
    if(res.msg == 'ok') {
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
      }
    }
})