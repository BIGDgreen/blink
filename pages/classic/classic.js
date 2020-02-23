// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Component({
  properties: {
    cid: Number,
    type: Number
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentData: null,
    first: false,
    last: true,
    likeStatus: false,
    likeNum: 0,
    specific: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached(options) {
    if(this.properties.cid > 0) {
      this.setData({
        specific: true
      });
       // 获取指定期刊
       this._getIdClassic(this.properties.type, this.properties.cid);
    } else {
      // 没有指定id，则获取最新一期期刊
      this._getLatest();
    }
  },

  methods: {
     /**
     * 点赞或取消点赞
     * @param event 
     */
    onLike(event) {
      const behavior = event.detail.behavior;
      likeModel.like(behavior, this.data.currentData.id, this.data.currentData.type);
    },

    /**
     *获取下一期期刊
    *
    * @param {*} event
    */
    onNext(event) {
      this._updateClassic('next');
    },

    /**
     * 获取上一期期刊
     * @param {*} event
     */
    onPrevious(event) {
      this._updateClassic('previous');
    },

      /**
     *获取最新一期的期刊
    *
    */
    _getLatest() {
      classicModel.getLatest((res) => {
        console.log("latestData:::",res);
        this.setData({
          currentData: res,
          likeStatus: res.like_status,
          likeNum: res.fav_nums
        })
      });
    },

    _getIdClassic(category, id) {
      // console.log(category, id);
      classicModel.getClassicDetail(category, id, 
        (res) => {
          // console.log("classicDetail:::", res);
          this.setData({
            currentData: res
          })
        })
    },
    
    _updateClassic(nextOrPrevious) {
      const index = this.data.currentData.index;
      classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log("currentData:::",res);
      this._getLikeStatus(res.id, res.type);
      this.setData({
          currentData: res,
          first: classicModel.isFirst(res.index),
          last: classicModel.isLatest(res.index)
        })
      // console.log("first:::",this.data.first,"last:::",this.data.last)
      })
    },

    /**
     *获取点赞信息
    *
    * @param {number} artID
    * @param {string} category
    */
    _getLikeStatus(artID, category) {
      likeModel.getClassicLikeStatus(artID, category, (res) => {
        this.setData({
          likeStatus: res.like_status,
          likeNum: res.fav_nums
        })
      })
    },
  }
})