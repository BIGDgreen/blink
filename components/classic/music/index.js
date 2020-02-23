// components/classic/music/index.js
import { classicBeh } from '../classicBeh'
const mObj = wx.getBackgroundAudioManager();
Component({
  behaviors: [classicBeh],
  /**
  * 组件的属性列表
  */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png'
  },
  lifetimes: {
    attached() {
      // 恢复自定义播放器状态
      this._recoverStatus();
      // 使自定义播放器状态与系统播放器状态统一
      this._monitorSwitch();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        // 播放
        this.setData({
          playing: true
        })
        mObj.src = this.properties.src;
        mObj.title = this.properties.title;
      } else {
        // 暂停
        this.setData({
          playing: false
        })
        mObj.pause();
      }
    },
    _recoverStatus() {
      if (mObj.paused) {
        // 音乐暂停中，将按钮设置为暂停按钮
        this.setData({
          playing: false
        })
        return
      }
      if (mObj.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      mObj.onPlay(() => {
        this._recoverStatus();
      })
      mObj.onPause(() => {
        this._recoverStatus();
      })
      mObj.onStop(() => {
        this._recoverStatus();
      })
      mObj.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
