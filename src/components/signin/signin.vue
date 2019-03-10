<template>
  <div class="signin">
    <div class="head" >
      <img id="img1" src="./img/picture-1.png"/>
      <p>欢迎来到拾叁</p>
      <button type="button" @touchend="tophone">登录/注册</button>
      <img id="img2" src="./img/news.png" @touchend="tophone"/>
    </div>
    <div class="div2"></div>
    <div class="div3">积分：</div>
    <div class="div4"></div>
    <ul class="nav">
      <li v-for="item in items" :key="item.id" @touchend="tophone">
        <img :src='item.path'/><span>{{item.text}}</span></li>
    </ul>
    <div class="fwrap">
      <div class="footer">
        <div @touchend="tohome()"><img src="./img/home1.png"/></div>
        <div @touchend="todestss()"><img src="./img/dest1.png" /></div>
        <div @touchend="tohistory()"><img src="./img/history1.png" /></div>
        <div><img src="./img/mine2.png"/></div>
      </div>
      <div class="text">
        <span>旅游首页</span>
        <span>目的地</span>
        <span class="his">浏览历史</span>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data () {
      return {
        items: [
          {path: require('./img/collection.png'), text: '我的收藏'},
          {path: require('./img/order.png'), text: '我的订单'},
          {path: require('./img/travel.png'), text: '未出行订单'},
          {path: require('./img/payment.png'), text: '未付款订单'},
          {path: require('./img/evaluate.png'), text: '待评价订单'},
          {path: require('./img/refund.png'), text: '退款订单'},
          {path: require('./img/coupon.png'), text: '优惠券'},
          {path: require('./img/album.png'), text: '我的相册'}]
      }
    },
    methods: {
      tophone: function () {
        this.$router.push({
          path: '/phone'
        })
      },
      tohome: function () {
        this.$router.push({
          path: '/apppage'
        })
      },
      tohistory: function () {
        this.$router.push({
          path: '/history'
        })
      },
      todestss: function () {
        this.$router.push({
          path: '/destination'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{padding:0;margin:0;}
  .signin{
    width:750px;
    position:relative;
    .head{
      button{
        width:300px;
        height:100px;
        background-color:#f9de57;
        font-size:40px;
        text-align: center;
        line-height:100px;
        margin-top:55px;
        margin-left:0;
        display:inline-block;
      }
      p{
        width:500px;
        margin-top:130px;
        font-size:60px;
        display:inline-block;
      }
      height:420px;
      margin-left:40px;
      margin-right:40px;
      position: relative;
      text-align:left;
      #img1{
        position:absolute;
        right:30px;
        bottom:0;
        height:200px;
        width:280px;
      }
      #img2{
        width:42px;
        height:46px;
        position:absolute;
        top:27px;
        right:0;
      }
    }
    .div2 ,.div4{
      height:4px;
      background-color:
        #efecec
    }
    .div3{height:70px;
      font-size:31px;
      margin-left:57px;
      line-height:70px;
      text-align:left;
    }
    .fwrap{
      background-color: #f5f5f5;
      border-top: 2px #ccc solid;
      position: fixed;
      bottom: 0;
      width: 100%;
      .footer{
        display: flex;
        justify-content: space-around;
        img{
          width: 50px;
          height: 50px;
        }
      }
      .text{
        width: 733px;
        display: flex;
        justify-content:space-around ;
      }
    }
  }
  .nav li{
    display: inline-block;margin-left:15px;
    margin-top:45px;height:97px;width:150px;
    img{width:42px;height:42px;}
    span{display: block; padding-top:25px;font-size:30px;
      text-align:center;}
  }
</style>
