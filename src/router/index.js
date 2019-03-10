import Vue from 'vue'
import Router from 'vue-router'
import signin2 from '@/components/signin2/signin2'
import phone from '@/components/phone/phone'
import lose from '@/components/lose/lose'
import register from '@/components/register/register'
import apppage from '@/components/apppage/apppage'
import News from '@/components/News/News'
import history from '@/components/history/history'
import destination from '@/components/destination/destination'
import advancedSearch from '@/components/advancedSearch/advancedSearch'
import searchResults from '@/components/searchResults/searchResults'
import userAlbum from '@/components/userAlbum/userAlbum'
import userComment from '@/components/userComment/userComment'
import userEvaluation from '@/components/userEvaluation/userEvaluation'
import signin from '@/components/signin/signin'
import ordermanagement from '@/components/ordermanagement/ordermanagement'
import informChange from '@/components/informChange/informChange'
import waitpay from '@/components/waitpay/waitpay'
import order from '@/components/order/order'
import orderconfirmation from '@/components/orderconfirmation/orderconfirmation'
import shown from '@/components/shown/shown'
import position from '@/components/position/position'
import backMoneyOk from '@/components/backMoneyOk/backMoneyOk'
import backMoneyNo from '@/components/backMoneyNo/backMoneyNo'
import pay from '@/components/pay/pay'
import revocatory from '@/components/revocatory/revocatory'
import shows from '@/components/shows/shows'
import modify from '@/components/modify/modify'
import collection from '@/components/collection/collection'
import orderPage from '@/components/orderPage/orderPage'
import orderPages from '@/components/orderPages/orderPages'
import phonechange from '@/components/phonechange/phonechange'
import names from '@/components/names/names'
import emilechange from '@/components/emilechange/emilechange'
import password from '@/components/password/password'
import message from '@/components/message/message'
import save from '@/components/save/save'
Vue.use(Router)
//   import('@/components/advancedSearch/advancedSearch').then((module) => {
//     resolve(module)
//   })
// }
// const search = (resolve) => {
//   import('@components/search/search').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      title: '登录前我的页面',
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      title: '登录后我的页面',
      path: '/signin2',
      name: 'signin2',
      component: signin2
    },
    {
      title: '登录页面',
      path: '/phone',
      name: 'phone',
      component: phone
    },
    {
      title: '注册页面',
      path: '/register',
      name: 'register',
      component: register
    },
    {
      title: '我的收藏',
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      title: '失效',
      path: '/lose',
      name: 'lose',
      component: lose
    },
    {
      title: '优惠券',
      path: '/save',
      name: 'save',
      component: save
    },
    {
      title: '用户信息修改页（1）',
      path: '/modify',
      name: 'modify',
      component: modify
    },
    {
      title: '手机号修改',
      path: '/phonechange',
      name: 'phonechange',
      component: phonechange
    },
    {
      title: '特卖预定页',
      path: '/orderPages',
      name: 'orderPages',
      component: orderPages
    },
    {
      title: '昵称修改',
      path: '/names',
      name: 'names',
      component: names
    },
    {
      title: '邮箱',
      path: '/emilechange',
      name: 'emilechange',
      component: emilechange
    },
    {
      title: '密码修改',
      path: '/password',
      name: 'password',
      component: password
    },
    {
      title: '首页',
      path: '/apppage',
      name: 'apppage',
      component: apppage
    },
    {
      title: '消息页',
      path: '/News',
      name: 'News',
      component: News
    },
    {
      title: '目的地',
      path: '/destination',
      name: 'destination',
      component: destination
    },
    {
      title: '单个产品',
      path: '/shows',
      name: 'shows',
      component: shows
    },
    {
      title: '浏览历史',
      path: '/history',
      name: 'history',
      component: history
    },
    {
      tille: '选择定位',
      path: '/position',
      name: 'position',
      component: position
    },
    {
      title: '高级搜索页',
      path: '/advancedSearch',
      name: 'advancedSearch',
      component: advancedSearch
    },
    {
      title: '搜索结果页',
      path: '/searchResults',
      name: 'searchResults',
      component: searchResults
    },
    {
      title: '用户相册',
      path: '/userAlbum',
      name: 'userAlbum',
      component: userAlbum
    },
    {
      title: '用户点评',
      path: '/userComment',
      name: 'userComment',
      component: userComment
    },
    {path: '/userEvaluation',
      name: 'userEvaluation',
      component: userEvaluation
    },
    {
      title: '用户评价',
      path: '/userEvaluation',
      name: 'userEvaluation',
      component: userEvaluation
    },
    {
      title: '登录前我的页面',
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      title: '修改',
      path: '/userEvaluation',
      name: 'userEvaluation',
      component: userEvaluation
    },
    {
      title: '登录前我的页面',
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      title: '修改',
      path: '/informChange',
      name: 'informChange',
      component: informChange
    },
    {
      title: '全部订单',
      path: '/ordermanagement',
      name: 'ordermanagement',
      component: ordermanagement
    },
    {
      title: '单个订单',
      path: '/order',
      name: 'order',
      component: order
    },
    {
      title: '待支付',
      path: '/waitpay',
      name: 'waitpay',
      component: waitpay
    },
    {
      title: '预定页',
      path: '/orderPage',
      name: 'orderPage',
      component: orderPage
    },
    {
      title: '预定页',
      path: '/order',
      name: 'order',
      component: order
    },
    {
      title: '确定页',
      path: '/orderconfirmation',
      name: 'orderconfirmation',
      component: orderconfirmation
    },
    {
      title: '信息页',
      path: '/message',
      name: 'message',
      component: message
    },
    {
      title: '特卖单个产品展示',
      path: '/shows',
      name: 'shows',
      component: shows
    },
    {
      title: '退款成功',
      path: '/backMoneyOk',
      name: 'backMoneyOk',
      component: backMoneyOk
    },
    {
      title: '退款失败',
      path: '/backMoneyNo',
      name: 'backMoneyNo',
      component: backMoneyNo
    },
    {
      title: '支付',
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      title: '单个产品展示',
      path: '/shows',
      name: 'shows',
      component: shows
    },
    {
      title: '注册页面',
      path: '/register',
      name: 'register',
      component: register
    },
    {
      title: '普通单个产品展示',
      path: '/shown',
      name: 'shown',
      component: shown
    },
    {
      tille: '选择定位',
      path: '/position',
      name: 'position',
      component: position
    },
    {
      title: '取消成功',
      path: '/revocatory',
      name: 'revocatory',
      component: revocatory
    }]
})
