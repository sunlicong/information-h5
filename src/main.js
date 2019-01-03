import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MintUI from 'mint-ui'
import axios from './api/ajax'
import weChat from './utils/wechat.js'
import base from './utils/common.js'
import VueClipboard from 'vue-clipboard2'
import 'lib-flexible'
import 'mint-ui/lib/style.css'

import 'muse-ui/lib/styles/base.less'
import { LoadMore } from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'
Vue.use(LoadMore)

Vue.prototype.$store = store
Vue.prototype.$ui = MintUI
Vue.prototype.$axios = axios
Vue.prototype.$weChat = weChat
Vue.use(MintUI)
Vue.use(base)
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
