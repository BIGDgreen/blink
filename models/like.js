import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP {
  /**
   * 点赞或取消点赞
   * @param {string} behavior 
   * @param {string} artID 
   * @param {number} category 
   */
  like(behavior, artID, category) {
    let likeUrl = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: likeUrl,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    });
  }

  /**
   * 获取点赞信息
   * @param {number} artID 
   * @param {string} category 
   * @param {function} sCallBack 
   */
   getClassicLikeStatus(artID, category, sCallBack){
     this.request({
       url: `classic/${category}/${artID}/favor`,
       success: (res) => {
         console.log("likeStatus:::",res);
         sCallBack(res);
       }
     })
   }
}

export { LikeModel }