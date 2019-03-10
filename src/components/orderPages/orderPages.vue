<template>
  <div class="orderPage">
    <header>
      <img src="./img/arrowLeft.png" @touchend="toBack"/>
      <p>选择班期和人数</p>
    </header>
    <div class="content">
      <p>出发日期</p>
      <div class="local">{{this.Date}}</div>
      <div class="choice">
        <p>选择数量</p>
        <div class="choice1">
          <span><img class="pic" src="./img/adult.png">成人数：</span>
          <div class="coutter-wrapper">
            <img src="./img/sub.png"  @touchend="minus();allPrice()">
            <div>{{ orderAdultnum }}</div>
            <img src="./img/add.png"  @touchend="plus();allPrice()">
          </div>
        </div>
        <div class="choice2">
          <span><img class="pic" src="./img/child.png">儿童数：</span>
          <div class="coutter-wrapper">
            <img src="./img/sub.png"  @touchend="sub();allPrice()">
            <div>{{ orderChildnum }}</div>
            <img src="./img/add.png" @touchend="add();allPrice()">
          </div>
        </div>
      </div>
      <!--<calendar-input :limit="limit" @getValue="getValue" id = "calendar"></calendar-input>-->
      <span id="notice">请选择出游人数</span>
      <div class="bgPic"><img src="./img/traval.jpg"></div>
    </div>
    <footer>
      <div class="bottom">
        <div class="sp1">总价：<br>￥{{this.price}}</div>
        <div class="sp2" @touchend="returnDetail()">立即购买</div>
      </div>
    </footer>
  </div>
</template>

<script>
  // import calendarInput from '../../../node_modules/calendar-plugin/calendar-input.vue'
  import axios from 'axios'
  export default {
    // components: {
    //   calendarInput
    // },
    data () {
      return {
        orderAdultnum: 0,
        orderChildnum: 0,
        price: 0,
        onePrice: 0,
        Date: '',
        productId: 0,
        orderId: ''
      }
    },
    mounted: function () {
      this.getQuery()
    },
    methods: {
      minus () {
        if (this.orderAdultnum > 0) {
          --this.orderAdultnum
        }
      },
      plus () {
        ++this.orderAdultnum
      },
      sub () {
        if (this.orderChildnum > 0) {
          --this.orderChildnum
        }
      },
      add () {
        ++this.orderChildnum
      },
      allPrice: function () {
        this.price = this.onePrice * this.orderAdultnum + 0.5 * this.onePrice * this.orderChildnum
      },
      getQuery () {
        let onePrice = this.$route.query.Price
        let Date = this.$route.query.Date
        let productId = this.$route.query.productId
        let orderId = this.$route.query.orderId
        this.onePrice = onePrice
        this.Date = Date
        this.productId = productId
        this.orderId = orderId
      },
      toBack: function () {
        this.$router.back(-1)
      },
      returnDetail: function () {
        let notice = document.getElementById('notice')
        let result = {
          'orderAdultnum': this.orderAdultnum,
          'orderChildnum': this.orderChildnum,
          'orderTraveltime': this.Date,
          'orderTotalmoney': this.price,
          'orderProductid': this.productId,
          'orderId': this.orderId
        }
        if (this.orderAdultnum + this.orderChildnum <= 0) {
          notice.style.display = 'block'
      }
        else {
          axios({
            url: 'http://60.205.208.7/Travel_Summer_war/orders/insertOrder.do',
            'Content-Type': 'application/x-www-form-urlencoded',
            method: 'post',
            data: result
          }).then(resp => {
            let data = resp.data
            this.orderId = data.orderId
            if (this.orderId < 0) {
              alert('请登录')
              this.$router.push({
                path: '/signin'
              })
            } else {
              this.$router.push({
                path: '/orderconfirmation',
                query: {
                  price: this.price,
                  orderId: this.orderId,
                  orderAdultnum: this.orderAdultnum,
                  orderChildnum: this.orderChildnum,
                  productId: this.productId
                }
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    background-color: #fff;
    p {
      font-size: 36px;
      color: #787878;
      margin: 0 auto;
      line-height: 90px;
    }
    img {
      width: 35px;
      height: 35px;
      margin-left: 30px;
    }
  }
  .content {
    p {
      width: 200px;
      font-size: 32px;
      color: #8a898a;
      text-align: left;
      height: 70px;
      line-height: 70px;
    }
    .local {
      width: 200px;
      height: 80px;
      background-color: #fdf4c3;
      border: 1px #f9de57 solid;
      margin-top: 5px;
      margin-bottom: 10px;
      border-radius: 10%;
      font-size: 30px;
      line-height: 80px;
      overflow: hidden;
    }
    .choice {
      .choice1,.choice2{
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 30px;
          height:50px;
          line-height: 50px;
          .pic{
            width: 45px;
            height: 45px;
            padding-right: 15px;
          }
        }
        img {
          width: 32px;
          height: 32px;
        }
        .coutter-wrapper{
          display: flex;
          justify-content: space-around;
          align-items: center;
          div{
            background-color: #e0dfdf;
            width: 40px;
            height: 40px;
            font-size: 30px;
          }
        }
      }
      p{
        font-size: 32px;
      }
    }
    .date{
      height: 74px;
      border-radius: 10%;
      margin-right: 500px;
      background-color: #fdf4c3;
      border: 1px #f9de57 solid;
    }
    .bgPic{
      img{
        margin-bottom: 100px;
        width: 650px;
        height: 500px;
      }
    }
    #notice{
      font-size: 36px;
      color: #eb554e;
      font-weight: bold;
      display: none;
    }
  }
  footer{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 100px;
    .bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32px;
      sp1{
        width: 500px;
        height: 100px;
        background-color: #fff;
        text-align: left;
      }
      .sp2{
        width: 250px;
        background:#f9de57;
        color:#8c8353;
      }
    }
  }
</style>
