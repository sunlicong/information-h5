import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Toast } from 'mint-ui'
import { setCookie, viewPort, getCookie, loginOut } from '../utils/common.js'
import { apiUrl } from '../utils/config.js'

/*
*请求前拦截此处可以添加请求头
*/
axios.defaults.timeout = 10000
axios.defaults.baseURL = apiUrl
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Authorization': getCookie('_token') || '1v5618b6044cfac8f3f0699379acb2c4b013d62503178d413f05d00297ab4ec0758f7afb943aa26451c8647e05b179edd6',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    if (config.method == 'post') {
      config.data = qs.stringify(config.data)
    }else if (config.method == 'get' || config.method == 'put' || config.method == 'delete') {
      config.params = config.data
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
/**
 * 请求后拦截
 * 30101: 糖果不足
 * 30105: 余额不足
 * 50003: 文章不存在
 */
axios.interceptors.response.use(
  response => {
    if (!response.data.status) {
      // 状态码持续完善
      if (response.data.code == 20002 || response.data.code == 11001 || response.data.code == 20003) {
        loginOut()
        if (viewPort().isWeixin) {
          setCookie('beforeLoginUrl', router.app.$route.fullPath)
          router.push({ path: '/Author' })
        }
      } else if (response.data.code != 30101 && response.data.code != 30105 && response.data.code != 50003) {
        Toast(response.data.msg)
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          Toast('404,错误请求')
          break
        case 401:
          Toast('401,未授权')
          break
        case 403:
          Toast('403,禁止访问')
          break
        case 408:
          Toast('408,请求超时')
          break
        case 500:
          Toast('500,服务器内部错误')
          break
        case 501:
          Toast('501,功能未实现')
          break
        case 503:
          Toast('503,服务不可用')
          break
        case 504:
          Toast('504,网关错误')
          break
        default:
          Toast('服务器异常，请稍后再试')
      }
    }else {
      Toast('网络不给力,请稍后再试！')
    }
    return Promise.reject(error.response.data)
  })
export default axios
