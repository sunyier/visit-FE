<template>
  <div class="orderPage">
    <header>
      <img src="./img/arrowLeft.png" @touchend="toBack"/>
      <p>选择班期和人数</p>
    </header>
    <div class="content">
      <p>出发地</p>
      <div class="local">{{area}}</div>
      <div class="choice">
        <p>选择数量</p>
        <div class="choice1">
          <span><img class="pic" src="./img/adult.png">成人数：</span>
          <div class="coutter-wrapper">
            <!--minus函数必须在allPrice函数之前执行-->
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
      <div class="Time">
        <div class="start">
          <p>出发日期</p>
          <input type="date" id="calendar1" v-model="sDate"/>
        </div>
        <div class="end">
          <p>结束日期</p>
          <input type="date" id="calendar2" v-model="eDate"/>
        </div>
      </div>
      <span id="notice">请选择出游人数和日期</span>
      <img id="pic" src="./img/traval.jpg">
      <!--<calendar-input :limit="limit" @getValue="getValue" id = "calendar"></calendar-input>-->
    </div>
    <footer>
      <div class="bottom">
        <div class="sp1">总价：<br>￥{{price}}</div>
        <div class="sp2" @touchend="returnDetail()">立即购买</div>
      </div>
    </footer>
  </div>
</template>

<script>
  // import calendarInput from '../../../node_modules/calendar-plugin/calendar-input.vue'
  import axios from 'axios'
  // let now = new Date()
  // let day = ('0' + now.getDate()).slice(-2)
  // let month = ('0' + (now.getMonth() + 1)).slice(-2)
  // let today = now.getFullYear() + '-' + (month) + '-' + (day)
  export default {
    // components: {
    //   calendarInput
    // },
    data () {
      return {
        orderAdultnum: 0,
        orderChildnum: 0,
        priceOne: 0,
        price: 0,
        orderId: '',
        area: '',
        productId: 0,
        sDate: '',
        eDate: ''
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
        this.price = this.priceOne * this.orderAdultnum + 0.5 * this.priceOne * this.orderChildnum
      },
      getQuery () {
        let area = this.$route.query.area
        let priceOne = this.$route.query.Price
        let productId = this.$route.query.productId
        let orderId = this.$route.query.orderId
        this.area = area
        this.priceOne = priceOne
        this.productId = productId
        this.orderId = orderId
      },
      toBack: function () {
        this.$router.back(-1)
      },
      returnDetail: function () {
        let calendar1 = document.getElementById('calendar1').value
        let calendar2 = document.getElementById('calendar2').value
        let notice = document.getElementById('notice')
        const end = Date.parse(new Date(calendar1))
        const now = Date.parse(new Date(calendar2))
        const msec = end - now
        let result = {
          'orderTraveltime': calendar1,
          'orderReturntime': calendar2,
          'orderAdultnum': this.orderAdultnum,
          'orderChildnum': this.orderChildnum,
          'orderTotalmoney': this.price,
          'orderStartarea': this.area,
          'orderProductid': this.productId,
          'orderId': this.orderId
        }
        if ((this.orderAdultnum + this.orderChildnum <= 0) || msec > 0 || (this.sDate === '') || (this.eDate === '')) {
          if (msec > 0) {
            alert('输入日期有误 请重新选择')
          }
          notice.style.display = 'block'
        } else {
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
                  orderId: this.orderId,
                  price: this.price,
                  orderAdultnum: this.orderAdultnum,
                  orderChildnum: this.orderChildnum,
                  productId: this.productId
                }
              })
            }
          }).catch(error => {
            this.$router.push({
              path: '/apppage'
            })
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
      width: 22px;
      height: 38px;
      padding-left: 25px;
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
      height: 70px;
      background-color: #fdf4c3;
      border: 1px #f9de57 solid;
      margin-top: 5px;
      margin-bottom: 10px;
      border-radius: 10%;
      font-size: 30px;
      line-height: 74px;
    }
    .choice {
      .choice1,.choice2{
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 30px;
          height:45px;
          line-height: 45px;
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
    #calendar1,#calendar2{
      text-align: center;
      height: 74px;
      border-radius: 10%;
      background-color: #fdf4c3;
      border: 1px #f9de57 solid;
    }
    .Time{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    #pic{
      margin-bottom: 70px;
      width: 650px;
      height: 500px;
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
        line-height: 100px;
        color:#8c8353;
      }
    }
  }
</style>
