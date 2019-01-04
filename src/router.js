import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { getCookie, setCookie, viewPort } from './utils/common.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home' // 用重定向制定默认路由
    },
    {
      path: '/Author',
      name: 'Author',
      component: resolve => require(['@/views/Author'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/views/ContentPage'], resolve),
      children: [{
        path: '/Home',
        name: 'Home',
        component: resolve => require(['@/views/Home'], resolve),
        meta: {
          pageTitle: '首页',
          keepAlive: true
        }
      },
        {
          path: '/Wallet',
          name: 'Wallet',
          component: resolve => require(['@/views/Wallet'], resolve),
          meta: {
            pageTitle: '我的钱包'
          }
        },
        {
          path: '/Mine',
          name: 'Mine',
          component: resolve => require(['@/views/Mine'], resolve),
          meta: {
            pageTitle: '我的'
          }
        }
      ]
    },
    {
      path: '/FeedDetail',
      name: 'FeedDetail',
      component: resolve => require(['@/views/FeedDetail'], resolve),
      meta: {
        pageTitle: '详情'
      }
    },
    {
      path: '/MyMining',
      name: 'MyMining',
      component: resolve => require(['@/views/MyMining'], resolve),
      meta: {
        pageTitle: '我的挖矿'
      }
    },
    {
      path: '/Publish',
      name: 'Publish',
      component: resolve => require(['@/views/Publish'], resolve),
      meta: {
        pageTitle: '发布文章'
      }
    },
    {
      path: '/PublishSelectTag',
      name: 'PublishSelectTag',
      component: resolve => require(['@/views/PublishSelectTag'], resolve),
      meta: {
        pageTitle: '选择文章标签'
      }
    },
    {
      path: '/PublishPriview',
      name: 'PublishPriview',
      component: resolve => require(['@/views/PublishPriview'], resolve),
      meta: {
        pageTitle: '文章预览'
      }
    },
    {
      path: '/PublishSuccess',
      name: 'PublishSuccess',
      component: resolve => require(['@/views/PublishSuccess'], resolve),
      meta: {
        pageTitle: '发布成功'
      }
    },
    {
      path: '/WalletItemDetail',
      name: 'WalletItemDetail',
      component: resolve => require(['@/views/WalletItemDetail'], resolve),
      meta: {
        pageTitle: '人民币'
      }
    },
    {
      path: '/MyFans',
      name: 'MyFans',
      component: resolve => require(['@/views/MyFans'], resolve),
      meta: {
        pageTitle: '我的粉丝'
      }
    },
    {
      path: '/MyAttention',
      name: 'MyAttention',
      component: resolve => require(['@/views/MyAttention'], resolve),
      meta: {
        pageTitle: '我的关注'
      }
    },
    {
      path: '/PayCandyCard',
      name: 'PayCandyCard',
      component: resolve => require(['@/views/PayCandyCard'], resolve),
      meta: {
        pageTitle: '购买糖果卡'
      }
    },
    {
      path: '/CandyBill',
      name: 'CandyBill',
      component: resolve => require(['@/views/CandyBill'], resolve),
      meta: {
        pageTitle: '明细'
      }
    },
    {
      path: '/MyWorks',
      name: 'MyWorks',
      component: resolve => require(['@/views/MyWorks'], resolve),
      meta: {
        pageTitle: '我的作品'
      }
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: resolve => require(['@/views/Profile'], resolve),
      meta: {
        pageTitle: '个人主页'
      }
    },
    {
      path: '/InviteFriend',
      name: 'InviteFriend',
      component: resolve => require(['@/views/InviteFriend'], resolve),
      meta: {
        pageTitle: '邀请好友'
      }
    },
    {
      path: '/InviteList',
      name: 'InviteList',
      component: resolve => require(['@/views/InviteList'], resolve),
      meta: {
        pageTitle: '我的邀请'
      }
    },
    {
      path: '/CashAddressManager',
      name: 'CashAddressManager',
      component: resolve => require(['@/views/CashAddressManager'], resolve),
      meta: {
        pageTitle: '提现地址管理'
      }
    },
    {
      path: '/CashAddressAdd',
      name: 'CashAddressAdd',
      component: resolve => require(['@/views/CashAddressAdd'], resolve),
      meta: {
        pageTitle: '添加提现地址'
      }
    },
    {
      path: '/WalletItemTrx',
      name: 'WalletItemTrx',
      component: resolve => require(['@/views/WalletItemTrx'], resolve),
      meta: {
        pageTitle: 'TRX'
      }
    },
    {
      path: '/WalletItemBonus',
      name: 'WalletItemBonus',
      component: resolve => require(['@/views/WalletItemBonus'], resolve),
      meta: {
        pageTitle: '待提取分红'
      }
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      component: resolve => require(['@/views/Recharge'], resolve),
      meta: {
        pageTitle: '充值'
      }
    },
    {
      path: '/CashWithdrawal',
      name: 'CashWithdrawal',
      component: resolve => require(['@/views/CashWithdrawal'], resolve),
      meta: {
        pageTitle: '提现'
      }
    },
    {
      path: '/Raiders',
      name: 'Raiders',
      component: resolve => require(['@/views/Raiders'], resolve),
      meta: {
        pageTitle: '攻略'
      }
    },
    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: resolve => require(['@/views/EditProfile'], resolve),
      meta: {
        pageTitle: '编辑资料'
      }
    },
    {
      path: '/Test',
      name: 'Test',
      component: resolve => require(['@/views/Test'], resolve),
      meta: {
        pageTitle: 'test'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.pageTitle) {
    document.title = to.meta.pageTitle
  }
  if (!viewPort().isWeixin || to.query.wxMiniApp) {
    next()
  } else if (!getCookie('_token') && to.path != '/Author') {
    setCookie('inviter', to.query.inviter || '')
    setCookie('beforeLoginUrl', to.fullPath)
    next('/Author')
  } else {
    next()
  }
})
export default router
