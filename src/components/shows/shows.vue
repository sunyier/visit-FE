<template>
  <div class="shows">
    <header>
      <img src="./img/arrowLeft.png" @touchend="toBack" />
      <div class="home2">
        <k-slider :banners="banners[0]" :swiperOption="swiperOption"></k-slider>
      </div>
      <div class="number"><p>{{all[0].productTitle}}</p><p>产品编号：{{all[0].bianhao}}</p></div>
      <!--<div class="timer">{{day}}天{{hr}}小时{{min}}分钟{{sec}}秒</div>-->
    </header>
    <div class="content">
      <div class="name">{{all[0].productContent}}</div>
      <div class="price">￥{{price}}</div>
      <div id="special">
        <p>选择：出行日期</p>
        <span id="notice">请选出行日期</span>
        <ul class="choice" >
          <li v-for="(site,index) in sites"
              :class="{active:index===n}"
              @touchend="changeN(index);returnDate(n)"
              :key="site.id"
          >{{site}}
          </li>
        </ul>
      </div>
      <div id="date">
        <span >选择：出游人群{{all[0].lastTime}}</span>
        <img src="./img/arrowRight.png" @touchend="passTo(n)"/>
      </div>
      <div class="comment">
        <span>查看：评论</span>
        <img src="./img/arrowRight.png" @touchend="turnToUserComment"/>
      </div>
      <div class="company">供应商：{{all[0].supplyName}}</div>
    </div>
    <footer>
      <span class="sp1"><img :src="dataUrl" @touchend="changeColor();toClect()"/><br>收藏</span>
      <span class="sp2" @touchend="passTo(n)">立即购买</span>
    </footer>
  </div>
</template>

<script>
  import Slider from '../../../slider/slider.vue'
  import axios from 'axios'
  export default {
    data: function () {
      return {
        banners: [],
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        swiperOption: {
          direction: 'horizontal',
          loop: true,
          paginationType: 'fraction',
          pagination: '.swiper-pagination',
          autoplay: {
            disableOnInteraction: false,
            delay: 2500
          }
        },
        bOn: false,
        dataUrl: require('./img/collect.png'),
        sites: [],
        n: -1,
        all: [],
        time: '',
        priceS: [],
        priceN: [],
        priceH: '',
        priceL: '',
        price: 0,
        productId: '',
        productall: []
      }
    },
    mounted: function () {
      this.getQuery()
      this.show()
    },
    components: {
      kSlider: Slider
    },
    methods: {
      getQuery: function () {
        let productId = this.$route.query.productId
        let product = this.$route.query.product
        let orderId = this.$route.query.orderId
        let productIds = this.$route.query.spid
        let productIda = this.$route.query.aid
        let productIdp = this.$route.query.pid
        this.orderId = orderId
        this.productall.push(productId)
        this.productall.push(productIda)
        this.productall.push(productIdp)
        this.productall.push(product)
        this.productall.push(productIds)
        for (let i = 0; i <= this.productall.length; i++) {
          if (this.productall[i]) {
            this.productId = this.productall[i]
          }
        }
      },
      changeColor () {
        this.bOn ? this.dataUrl = require('./img/collect.png') : this.dataUrl = require('./img/collected.png')
        this.bOn = !this.bOn
      },
      changeN (i) {
        this.n = i
      },
      toBack: function () {
        this.$router.back(-1)
      },
      turnToUserComment: function () {
        this.$router.push({
          path: '/userComment',
          query: {
            productId: this.productId
          }
        })
      },
      show: function () {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/product/sendSpecial.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: {'productId': this.productId}
        }).then(resp => {
          let data = resp.data
          this.all.push(data)
          this.banners.push(data.imgProducts)
          this.time = data.lastTimes
          for (let i = 0; i < data.starttimes.length; i++) {
            this.sites.push(data.starttimes[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      returnDate: function (n) {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/product/getSpecialMoney.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: {'specialtimeStarttime': this.sites[n], 'productId': this.productId}
        }).then(resp => {
          let data = resp.data
          this.price = data.specialMoney
        }).catch(error => {
          console.log(error)
        })
      },
      passTo: function (n) {
        let notice = document.getElementById('notice')
        if (this.price === 0) {
          notice.style.display = 'block'
        } else {
          this.$router.push({
            path: '/orderPages',
            query: {
              Price: this.price,
              Date: this.sites[n],
              productId: this.productId,
              orderId: this.orderId
            }
          })
        }
      },
      toClect: function () {
        if (this.bOn) {
          axios({
            url: 'http://60.205.208.7/Travel_Summer_war/collection/insertCollection.do',
            'Content-Type': 'application/x-www-form-urlencoded',
            method: 'post',
            data: {'productid': this.productId}
          }).then(resp => {
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios({
            url: 'http://60.205.208.7/Travel_Summer_war/collection/deleteCollection.do',
            'Content-Type': 'application/x-www-form-urlencoded',
            method: 'post',
            data: {'productid': this.productId}
          }).then(resp => {
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  header{
    width: 100%;
    height: 500px;
    position: relative;
    img{
      width: 50px;
      height: 50px;
      z-index: 9999;
      position:absolute;
      left: 10px;
      top: 20px;
    }
    .number{
      width: 100%;
      height: 60px;
      background:rgba(255,255,255,0.3);
      z-index: 2;
      position:absolute;
      left: 0;
      bottom:0;
      display: flex;
      justify-content: space-between;
    }
    p{
      font-size:28px;
      color:black;
      opacity: 1;
      text-align: left;
      line-height: 60px;
    }
    .home2{
      width: 100%;
      height: 500px;
    }
    .timer{
      z-index: 9999;
      position:absolute;
      right: 0;
      top: 0;
      font-size: 36px;

    }
  }
  .name{
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    color: #5d5d5d;
    text-align: left;
  }
  .price{
    width: 100%;
    height: 60px;
    font-size:30px;
    font-weight: bold;
    color: #eb554e;
    text-align: left;
    line-height: 60px;
  }
  #date,.comment,.company{
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #special{
    width:100%;
    height:180px;
    position: relative;
    p{
      width: 100%;
      font-size: 32px;
      color:#818181;
      text-align: left;
      height: 90px;
      line-height: 90px;
    }
    #notice{
      color:#ea3c3c;
      font-size:30px;
      text-align:left;
      position: absolute;
      right: 50px;
      top: 20px;
      display: none;
    }
    .choice{
      width: 100%;
      height:70px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li{
        width: 150px;
        height: 70px;
        border: 1px solid #ccc;
        border-radius: 15%;
        text-align: center;
        line-height: 70px;
        overflow: hidden;
      }

    }
    li.active{
      background-color:#fdf4c3;
    }
  }
  .content {
    span{
      font-size: 32px;
      color:#818181;
      text-align: left;
    }
    img{
      width: 32px;
      height: 32px;
    }
    .company{
      font-size: 32px;
      color: #818181;
      line-height: 100%;
    }
  }
  footer{
    width: 100%;
    height:100px;
    position: fixed;
    bottom: 0;
  }
  .sp1{
    width: 150px;
    height: 100px;
    position: fixed;
    left: 0;
    background-color: #fff;
  }
  .sp2{
    width: 600px;
    height: 100px;
    background-color:#fae368;
    color:#8c8353;
    font-size: 32px;
    line-height: 100px;
    position: fixed;
    right: 0;
  }
</style>
