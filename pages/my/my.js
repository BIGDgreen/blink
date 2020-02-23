// pages/my/my.js
import {BookModel} from "../../models/book.js"
import {ClassicModel} from  "../../models/classic.js"
const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,   // 用户信息是否授权成功
    userInfo: null,
    bookCount: 0,
    favorClassic: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
   this._userAuthorized();
   this._getLikeBookCount();
   this._getFavorEpisode();
  },

  /**
   *点击头像，发起弹框，请求用户授权并获取用户信息
   *
   * @param {*} event
   */
  onGetUserInfo(event) {
    console.log("getUserInfo:::", event.detail.userInfo);
    const userInfo = event.detail.userInfo;
    if(userInfo) {
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

  /**
   * 点击我喜欢的期刊，进入期刊详情
   */
  onJumpToDetail(event) {
    // console.log("jumpToDetail:::", event);
    const cid = event.detail.classic.id;
    const type = event.detail.classic.type;
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    });
  },

  /**
   *若用户已经授权，获取用户信息
   *
   */
  _userAuthorized() {
    wx.getSetting({
      success: (result)=>{
        // console.log("getSetting:::", result);
        if(result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (result)=>{
              console.log("userInfo:::", result.userInfo);
              this.setData({
                authorized: true,
                userInfo: result.userInfo
              });
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      },
    });
  },

  /**
   *获取我喜欢的书籍数量
   *
   */
  _getLikeBookCount() {
    bookModel.getLikeCount()
    .then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  _getFavorEpisode() {
    classicModel.getFavor((res) => {
      console.log("favorEpisode:::", res);
      this.setData({
        favorClassic: res
      })
    })
  }
})