<template>
  <div class="confirmation">
    <header>
      <img src="./img/arrowLeft.png" @touchend="toBack"/>
      <p>订单填写</p>
    </header>
    <form class="information" method="get">
      <div class="content">
        <div class="orderPage">
          <p>{{content[0].productContent}}</p>
          <div class="photo"><img :src="content[0].productImgurl"></div>
        </div>
        <div class="massage">
          <p>出行信息</p>
          <div>
            <span>出行人</span>
            <input id="visitorName" :value="orderName" placeholder="请添加出行人" readonly="readonly" required="required"/>
            <img src="./img/addBlue.png" @touchend="turnToMessage">
          </div>
        </div>
        <div class="orderMassage">
          <h1>预订人信息</h1>
          <div>
            <p>联系人</p>
            <input id="orderContactname" type="search" placeholder="请填写订单联系人姓名" required="required"/>
            <span id="Name">请输入姓名</span>
          </div>
          <div>
            <p>电话</p>
            <input id="orderContactphone"  type="search" placeholder="请输入手机号码" required="required" ref="N"/>
            <span id="phone">请输入正确的电话号码</span>
          </div>
          <div>
            <p>邮箱</p>
            <input id="orderContactemail" type="email" placeholder="请输入邮箱" required="required" ref="E"/>
            <span id="Email">请输入正确邮箱</span>
          </div>
        </div>
        <div class="save">
          <p>优惠信息</p>
          <span>选择优惠券<img src="./img/arrowRight.png" @touchend="showSale()"/></span>
        </div>
        <div id="sale" v-for="(site,index) in arr"
             :class="{checked : index===n}"
             @touchend="changeN(index);returnSale(n)"
             :key="site.id">
          <span>￥{{arr[index].discountReduce}}</span>
          <p>满{{arr[index].discountReach}}减{{arr[index].discountReduce}}<img src="./img/sale.png"></p>
        </div>
      </div>
      <footer>
        <div class="moneys">
          <span>总价:￥</span>
          <input id="ipt1" :value="price"/>
        </div>
        <input id="ipt2" type="button" value="提交订单"  @touchend = "toBlock()">
      </footer>
    </form>
  </div>
</template>

<script>
  import InformChange from '../informChange/informChange'
  import axios from 'axios'
  export default {
    name: 'orderconfirmation',
    components: {InformChange},
    data: function () {
      return {
        m: -1,
        sale: [],
        arr: [],
        price: 0,
        orderId: 0,
        content: [],
        bOn: true,
        n: -1,
        orderName: '',
        orderAdultnum: 0,
        orderChildnum: 0,
        productId: 0
      }
    },
    mounted: function () {
      this.getQuery()
      this.show()
    },
    methods: {
      getQuery () {
        // 取到路由带过来的参数
        let price = this.$route.query.price
        let orderName = this.$route.query.orderName
        let orderId = this.$route.query.orderId
        let orderAdultnum = this.$route.query.orderAdultnum
        let orderChildnum = this.$route.query.orderAdultnum
        let productId = this.$route.query.productId
        this.orderId = orderId
        // 将数据放在当前组件的数据内
        this.price = price
        this.orderId = orderId
        this.orderName = orderName
        this.orderAdultnum = orderAdultnum
        this.orderChildnum = orderChildnum
        this.orderId = orderId
        this.productId = productId
      },
      show: function () {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/product/beforePay.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: {'orderId': this.orderId}
        }).then(resp => {
          let data = resp.data
          this.content.push(data)
        }).catch(error => {
          console.log(error)
        })
      },
      showSale: function () {
        if (this.bOn) {
          axios({
            url: 'http://60.205.208.7/Travel_Summer_war/orders/showUDiscount.do',
            'Content-Type': 'application/x-www-form-urlencoded',
            method: 'post',
            data: {'orderId': this.orderId}
          }).then(resp => {
            let data = resp.data
            for (let i = 0; i < data.length; i++) {
              this.arr.push(data[i])
            }
          }).catch(error => {
            console.log(error)
          })
          this.bOn = !this.bOn
        } else {}
      },
      returnSale: function (n) {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/orders/insertDiscount.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: {'orderDiscountid': this.arr[n].discountId, 'orderId': this.orderId}
        }).then(resp => {
          let data = resp.data

          this.price = data.Money
        }).catch(error => {
          console.log(error)
        })
      },
      changeN (i) {
        this.n = i
      },
      toBack: function () {
        this.$router.back(-1)
      },
      turnToMessage: function () {
        this.$router.push({
          path: '/message',
          query: {
            orderId: this.orderId,
            price: this.price,
            orderAdultnum: this.orderAdultnum,
            orderChildnum: this.orderChildnum
          }
        })
      },
      toBlock: function () {
        let name = document.getElementById('orderContactname').value
        let Name = document.getElementById('Name')
        let reg = /^1[3456789]\d{9}$/
        let phone = document.getElementById('phone')
        let reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        let Email = document.getElementById('Email')
        if (!name || !reg.test(this.$refs.N.value) || !reg1.test(this.$refs.E.value)) {
          Name.style.display = 'block'
          phone.style.display = 'block'
          Email.style.display = 'block'
        } else {
          Name.style.display = 'none'
          phone.style.display = 'none'
          Email.style.display = 'none'
          this.returnMessage()
        }
      },
      returnMessage: function () {
        let phoneNumber = document.getElementById('orderContactphone').value
        let name = document.getElementById('orderContactname').value
        let email = document.getElementById('orderContactemail').value
        let Detail = {
          'orderContactname': name,
          'orderContactphone': phoneNumber,
          'orderContactemail': email,
          'orderTotalmoney': this.price,
          orderId: this.orderId
        }
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/orders/updateOrder.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: Detail
        }).then(
            this.$router.push({
              path: '/waitpay',
              query: {
                Id: this.orderId
              }
            })
        ).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirmation{
    width:750px;
    background-color:#f7f7f7;
  }
  input{
    border:none;
    width:300px;
    height:50px;
  }
  header{
    width: 100%;
    height:90px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    background-color:#fff;
    p{
      width: 750px;
      font-size:36px;
      color:#787878;
      height:90px;
      line-height:90px;
    }
    img{
      width:22px;
      padding-left: 25px;
      height:38px;
      vertical-align: middle;
    }
  }
  .orderPage{
    width:100%;
    height:220px;
    background-color: #fff;
    margin-top: 10px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    p{
      width:570px;
      height:150px;
      font-size: 30px;
    }
  }
  .photo {
    width:100px;
    height:100px;
    img{
      width:100px;
      height:100px;
    }
  }
  .massage{
    width:100%;
    height:232px;
    background-color: #fff;
    margin-top: 20px;
    p{
      font-size:30px;
      height:30px;
      font-weight: bold;
      color: #616161;
      margin-bottom: 30px;
      padding-top: 40px;
      text-align: left;
    }
    div{
      padding-top: 15px;
      margin-bottom: 40px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      span{
        color:#565656;
        font-size:28px;
      }
    }
    img{
      width: 32px;
      height: 32px;
    }
  }
  .orderMassage{
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    h1{
      font-size: 30px;
      height:30px;
      font-weight: bold;
      color: #616161;
      text-align: left;
      padding-top: 40px;
    }
    div{
      width:100%;
      height:60px;
      background-color:#fff;
      margin-top:20px;
      font-size:28px;
      text-align: left;
      color:#c1c1c1;
      padding-top: 40px;
      p{
        color:#565656;
        font-size:28px;
        display: inline-block;
        width:116px;
      }
      span{
        color:#ea3c3c;
        font-size:25px;
        text-align:left;
        display: none;
        margin-left: 218px ;
      }
    }
    input{
      margin-left: 96px;
    }
  }
  .save{
    width:100%;
    height:102px;
    background-color:#fff;
    margin-top:20px;
    font-size:28px;
    text-align: left;
    color:#c1c1c1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      font-size:28px;
      height:30px;
      font-weight: bold;
      color: #565656;
      text-align: left;
    }
    img{
      width: 32px;
      height: 32px;
    }
  }
  #sale {
    width: 700px;
    height: 200px;
    display: flex;
    justify-content: space-between;
    border-radius: 5%;
    margin-top: 15px;
    border: 1px solid silver;
    /*!*background-color:#f4f4f4;*!*/
    background:url("./img/bgc.png");
    background-size:cover;
    padding-bottom: 35px;
    span{
      font-size: 45px;
      width: 240px;
      color:#eb554e;
      text-align:center;
      line-height: 200px;
      border-right:1px silver dotted;
    }
    p{
      font-size: 30px;
      width: 460px;
      height: 240px;
      text-align:center;
      line-height: 200px;
      position: relative;
      margin-bottom: 150px;
      img{
        position: absolute;
        bottom: 50px;
        right: 20px;
      }
    }
  }
  #sale.checked{
    border: #f7bc2e 5px solid;
    padding-bottom: 60px;
  }
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #fff;
    div{
      position: absolute;
      left: 0;
      font-size: 32px;
      width:500px;
      height:100px;
      background-color:#fff;
      text-align: left;
      #ipt1{
        position: absolute;
        bottom: 50px;
        color:#eb554e;
        font-size: 30px;
        margin-left: 10px;

      }
    }
    #ipt2{
      position: absolute;
      right: 0;
      width:250px;
      height:100px;
      background-color:#fae368;
      color:#8c8353;
      font-size: 32px;
      line-height: 100px;
    }
  }
</style>
