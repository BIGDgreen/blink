import { HTTP } from '../utils/http-p.js'

class BookModel extends HTTP {
  /**
   *获取热门书籍列表
   *
   * @returns
   * @memberof BookModel
   */
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  /**
   *获取书籍详细信息
   *
   * @param {number} bid
   * @returns
   * @memberof BookModel
   */
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  /**
   *获取书籍点赞信息
   *
   * @param {*} bid
   * @returns
   * @memberof BookModel
   */
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  /**
   *获取书评
   *
   * @param {*} bid
   * @returns
   * @memberof BookModel
   */
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  /**
   *发表评论
   *
   * @param {number} bid
   * @param {string} content
   * @returns
   * @memberof BookModel
   */
  postComments(bid, content) {
    return this.request({
      url: 'book/add/short_comment',
      method: "POST",
      data: {
        book_id: bid,
        content: content
      }
    })
  }

  /**
   * 搜索书籍，获取书籍简介列表
   *
   * @param {string} inputValue
   * @returns
   * @memberof BookModel
   */
  searchBook(start, inputValue) {
    return this.request({
      url: 'book/search',
      data: {
        start: start,
        q: inputValue,
        summary: 1
      }
    })
  }

  /**
   *获取喜欢书籍的数量
   *
   * @returns
   * @memberof BookModel
   */
  getLikeCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export { BookModel }