/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * apiUrl: 接口api地址
 * imgBaseUrl: 图片所在域名地址
 * appId: 微信公众号appId
 * 
 */

// let baseUrl = window.location.protocol + "//" + window.location.host
let baseUrl = 'http://opentest.51kupai.com'
let apiUrl = ''
let imgBaseUrl = ''
let appId = 'wx57eaaa1d6bf1befb'
let debug = false; // 是否测试模式
if (debug) { // 测试 
  apiUrl = ''
  imgBaseUrl = 'https://ess.jieyunshop.com/'
}else { // 线上
  apiUrl = 'https://bigfish.51kupai.com'
  imgBaseUrl = 'https://ess.jieyunshop.com/'
  baseUrl = window.location.protocol + "//" + window.location.host
}

export { baseUrl, apiUrl, imgBaseUrl, appId }
