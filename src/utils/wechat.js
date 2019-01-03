/*
 *微信接口调用工具类
 *type =>share默认为分享 
 *type =>openImage图片浏览 
 *type =>openMap打开地图
 *传递参数根据类型自行查看
 *authConfig 暂存认证信息减少请求
 */
import axios from '../api/ajax'
import wx from 'weixin-js-sdk'
var utils = {
  authConfig: {},
  init(options) {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') == -1) {
      return
    }
    options = options || {}
    this.type = options.type || 'share'
    this.link = options.link || window.location.href
    this.title = options.title || ''
    this.desc = options.desc || ''
    this.imgUrl = options.imgUrl || ''
    this.imgLink = options.imgLink || ''
    this.success = options.success || null
    this.latitude = options.latitude || 0
    this.longitude = options.longitude || 0
    this.name = options.name || ''
    if (this.type == 'share' || this.type == 'hideMenuItems') {
      setTimeout(() => {
        this.request()
      }, 1000)
    } else {
      if (this.authConfig.appId) {
        this.wxConfig(this.authConfig)
      } else {
        setTimeout(() => {
          this.request()
        }, 1000)
      }
    }
  },
  request() {
    axios({
      method: 'post',
      url: '/blockchain/v1/home/JS_SDK',
      data: {
        url: window.location.href
      }
    }).then((response) => {
      if (response.data.status) {
        this.authConfig = {
          appId: response.data.data.appId,
          timestamp: response.data.data.timestamp,
          nonceStr: response.data.data.nonceStr,
          signature: response.data.data.signature
        }
        this.wxConfig(response.data.data)
      }
    })
  },
  wxConfig(data) {
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'previewImage',
        'openLocation',
        'getLocalImgData',
        'chooseImage',
        'hideMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem'
      ]
    })
    this.wxCall()
  },
  wxCall() {
    var params = {
      title: this.title,
      desc: this.desc,
      link: this.link,
      imgUrl: this.imgUrl,
      success: this.success
    }
    var data = {
      title: this.title,
      link: this.link,
      imgUrl: this.imgUrl,
      success: this.success
    }
    wx.ready(function () {
      if (this.type == 'share') {
        wx.showAllNonBaseMenuItem(); // 显示所有功能按钮接口
        // wx.updateAppMessageShareData(params)
        // wx.updateTimelineShareData(data)
        wx.onMenuShareTimeline(data)
        wx.onMenuShareAppMessage(params)
      } else if (this.type == 'openImage') {
        wx.previewImage({
          current: this.imgLink,
          urls: this.imgUrl
        })
      } else if (this.type == 'openMap') {
        wx.openLocation({
          latitude: this.latitude,
          longitude: this.longitude,
          name: this.name
        })
      } else if (this.type == 'hideMenuItems') {
        wx.hideAllNonBaseMenuItem(); // “基本类”按钮详见附录3
      }
    }.bind(this))
    wx.error(function (res) {
      this.authConfig = {}
    }.bind(this))
  }
}
export default utils
