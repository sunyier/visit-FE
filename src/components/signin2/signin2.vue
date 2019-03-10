<template>
  <div class="signin2">
    <div class="div1" >
      <img id="img1" src="./img/news.png" @touchend="tonews"/>
      <div @touchend="change()">
        <img id="img2" :src="data1[0].userHead"/>
        <!--<img src="./img/head.png" id="img5"/>-->
        <span>{{data1[0].userName}}</span>
        <img id="img3" src="./img/jiantou.jpg"/>
      </div>
      <p>开始你的旅程</p>
    </div>
    <div class="div2"></div>
    <div class="div3">积分:
      <span>{{data1[0].userCredits}}</span>
    </div>
    <div class="div4"></div>
    <div class="div5">
      <div @touchend="tocollection">
        <img src="./img/collection.png"/><br/>
        <span>我的收藏</span>
      </div>
      <div @touchend="todingdan()">
        <img src="./img/order.png"/><br/>
        <span>我的订单</span>
      </div>
      <div @touchend="todingdan()">
        <img src="./img/travel.png"/><br/>
        <span>未出行订单</span>
      </div>
      <div @touchend="todingdan()">
        <img src="./img/payment.png"/><br/>
        <span>未付款订单</span>
      </div>
      <div @touchend="todingdan()">
        <img src="./img/evaluate.png"/><br/>
        <span>待评价订单</span>
      </div>
      <div @touchend="todingdan()">
        <img src="./img/refund.png"/><br/>
        <span>退款订单</span>
      </div>
      <div @touchend="toyouhui()">
        <img src="./img/coupon.png"/><br/>
        <span>优惠券</span>
      </div>

      <div @touchend="toxiangce()">
        <img src="./img/album.png"/><br/>
        <span>我的相册</span>
      </div>
    </div>
    <div class="Re"><span>{{data1[0].number}}</span>张</div>
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
  import axios from 'axios'
  export default {
    data () {
      return {
        data1: []
      }
    },
    mounted: function () {
      this.integral()
    },
    methods: {
      tocollection: function () {
        this.$router.push({
          path: '/collection'
        })
      },
      tomodify: function () {
        this.$router.push({
          path: '/modify'
        })
      },
      integral: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/myuser.do').then(resp => {
          let data = resp.data
          this.data1.push(data)
        }).catch(error => {
          console.log(error)
        })
      },
      change: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/userList.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/modify'
          })
        ).catch(error => {
          console.log(error)
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
      },
      todingdan: function () {
        this.$router.push({
          path: '/ordermanagement'
        })
      },
      toyouhui: function () {
        this.$router.push({
          path: '/save'
        })
      },
      toxiangce: function () {
        this.$router.push({
          path: '/userAlbum'
        })
      },
      tonews: function () {
        this.$router.push({
          path: '/News'
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  body{padding:0;margin:0;}
  .signin2{
    width:750px;
    position:relative;
    .div1 {
      height:420px;
      margin-left:40px;
      margin-right:40px;
      position: relative;
      text-align:left;
      #img1{width:42px;
        height:46px;
        position:absolute;
        top:27px;right:0;}
      div{
        span{
          font-size:45px;
          display:inline-block;
          margin-left:152px;
          margin-top:150px;
        }
        #img2,#img5{
          width:125px;
          height:125px;
          position:absolute;
          top:120px;
          left:0;
          border-radius:50%;
        }
        #img3{
          width:20px;
          height:35px;
          position:absolute;
          top:158px;
          right:0;
        }
      }
      p{
        width:455px;
        height:105px;
        background-color:#ffe040;
        font-size:48px;
        color:#a2a19a;
        text-align:center;
        line-height:105px;
        border:1px #aa952b solid;
        display:inline-block;
        margin:56px 110px;
        border-radius:30px;
      }
    }
    .div2 ,.div4{
      height:4px;
      background-color:#efecec
    }
    .div3{
      height:70px;
      font-size:31px;
      margin-left:57px;
      line-height:70px;
      text-align:left;
    }
    .div5 div{
      display: inline-block;
      margin-left:15px;
      margin-top:45px;
      height:97px;
      width:150px;
      img{width:42px;
        height:42px;}
      span{
        display: block;
        padding-top:25px;
        font-size:30px;
        text-align:center;
      }
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
  .Re{
    width:150px;
    position:fixed;
    left:395px;
    font-size:30px;
  }
</style>
