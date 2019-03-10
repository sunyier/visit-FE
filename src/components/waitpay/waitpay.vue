<template>
  <div class="waitpay">
    <header>
      <div><img src="./img/left.png" width="19" height="19" @touchend="toBack"/></div>
      <p>订单详情</p>
      <div></div>
    </header>
    <div class="content">
      <div class="show">
        <div class="await">
          <img src="./img/wait.png" width="20" height="20"/>
          <span class="awaitText">待支付</span>
        </div>
        <span>库存有限，请尽快完成付款</span>
      </div>
      <div class="waitTime">
        <div class="countDown"><span>剩余支付时间</span>：<span class="time" id="time">{{`${min}分钟${sec}秒`}}</span></div>
        <button type="button" @touchend="returnPay()">继续支付</button>
      </div>
      <div class="details">
        <div class="number">订单号 :{{data1[0].orderNumber}}</div>
        <div class="time">预定日期：{{data1[0].orderTime}}</div>
        <div class="img"><img :src="data1[0].productImgurl" width="100" height="100"></div>
        <div class="text">{{data1[0].productContent}}</div>
      </div>
      <div class="message">
        <div class="start">启程日<br/><p>{{data1[0].orderTraveltime}}</p></div>
        <p class="line"></p>
        <div class="end">返程日<br/><p>{{data1[0].orderReturntime}}</p></div>
        <div class="moneyPeople">
          <div class="money">总额:<br>￥{{data1[0].orderTotalmoney}}</div>
          <div class="people">人数:<br>{{data1[0].orderAdultnum}}成人 {{data1[0].orderChildnum}}小孩</div>
        </div>
      </div>
      <div class="change">
        <button type="button" class="submit" @touchend="returnDelelt()">申请取消</button>
        <button type="button" class="back" @touchend="toChange()">修改订单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'waitpay',
    data () {
      return {
        min: 0,
        sec: 0,
        authTime: 0,
        data1: [],
        data2: [],
        orderId: {},
        amendId: {},
        endTime: 0,
        id: []
      }
    },
    mounted: function () {
      this.countdown(this.authTime)
      this.getQuery()
      this.postId1()
      this.postId2()
      this.returnTime()
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      getQuery () {
        // 取到路由带过来的参数
        // 将数据放在当前组件的数据内
        let orderId1 = this.$route.query.orderId
        let orderId2 = this.$route.query.Id
        this.id.push(orderId1)
        this.id.push(orderId2)
        for (let i = 0; i <= this.id.length; i++) {
          if (this.id[i]) {
            this.orderId = {orderId: this.id[i]}
          }
        }
      },
      // toOrdercomfirmation: function () {
      //   this.$router.push({
      //     path: '/orderconfirmation'
      //   })
      // },
      toChange: function () {
        let ID = this.data1[0].orderId
        let PID = this.data1[0].orderProductid
        if ((this.data2[0]) !== 0) {
          this.$router.push({
            path: '/shows',
            query: {
              orderId: ID,
              product: PID
            }
          })
        } else {
          this.$router.push({
            path: '/shown',
            query: {
              orderId: ID
            }
          })
        }
      },
      // amend () {
      //   // 取到路由带过来的参数
      //   // 将数据放在当前组件的数据内
      //   let orderId = this.$route.query.Id
      //   this.amendId = {orderId}
      // },
      countdown: function () {
        this.authTime = 180
        let authTimeTimer = setInterval(() => {
          let min = parseInt(this.authTime / 60)
          let sec = parseInt(this.authTime % 60)
          this.min = min > 9 ? min : '0' + min
          this.sec = sec > 9 ? sec : '0' + sec
          this.authTime--
          const that = this
          if (that.authTime <= 0) {
            this.min = '00'
            this.sec = '00'
            clearInterval(authTimeTimer)
          }
        }, 1000)
      },
      postId1: function () {
        this.data = []
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/showSingleOrderF.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: this.orderId
        }).then(resp => {
          let data = resp.data
          this.data1.push(data)
          this.data2.push(data.productIsspecial)
          console.log(this.data2)
        }).catch(error => {
          console.log(error)
        })
      },
      postId2: function () {
        this.data = []
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/showSingleOrderF.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: this.orderId
        }).then(resp => {
          let data = resp.data
          this.data1.push(data)
          this.data2.push(data.productIsspecial)
        }).catch(error => {
          console.log(error)
        })
      },
      returnPay: function () {
        let dataPay = {'orderId': this.data1[0].orderId}
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/pay.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: dataPay
        }).then(
          this.$router.push({
            path: '/pay'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      returnDelelt: function () {
        let dataDelete = {'orderId': this.data1[0].orderId}
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/deleteOrder.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: dataDelete
        }).then(
          this.$router.push({
            path: '/revocatory'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      returnTime: function () {
        // let time = document.getElementById('time')
        // let timenow = time.innerHTML
        let dataDelete = {'orderId': this.data1[0].orderId}
        if (this.authTime === 0) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/orders/deleteOrder.do',
            'Content-Type': 'application/json;charset=utf-8',
            data: dataDelete
          }).then(
            this.$router.push({
              path: '/ordermanagement'
            })
          ).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .order{
    width: 750px;
  }
  header{
    width: 100%;
    height: 90px;
    align-items:center;
    display: flex;
    justify-content:space-between;
    background-color: #1ca0f2;
    div{
      text-align: left;
      padding-left: 20px;
      width: 150px;
      height: 38px;
    }
    p{
      text-align: center;
      padding-top: 50px;
      line-height: 38px;
      font-size: 36px;
      color:black;
    }
  }
  .content{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
  }
  .show{
    width: 100%;
    box-sizing:border-box;
    /*border-radius: 14px;*/
    background-color: #1ca0f2;
    display: flex;
    flex-wrap:wrap;
    padding: 20px;
    .await{
      width: 500px;
      text-align: left;
      margin-bottom: 20px;
      .awaitText{
        width: 100px;
        font-size: 50px;
        margin: 0;
        color: white;
      }
    }
    span{
      font-size: 32px;
      color: white;
      height: 40px;
      line-height: 40px;
    }
  }
  .waitTime{
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing:border-box;
    align-items: center;
    background-color: #fffcf3;
    padding-left:20px;
    margin-bottom: 20px;
    .countDown{
      width: 430px;
      text-align: left;
      font-size: 35px;
      display: inline-block;
      .time{
        width: 100px;
        font-size:20px
      }
    }
    button{
      height: 100px;
      font-size: 45px;
      background-color: #f9de57;
      border: none;
    }
  }
  .details {
    width: 92%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 80px;
    .state{
      width: 100%;
      background-color: #f9de57;;
      margin-bottom: 20px;
      font-size: 35px;
      border-radius: 12px;
    }
    .number {
      width: 600px;
      height: 40px;
      border: 1px #0094e3 solid;
      border-radius: 12px;
      color: #858585;
      text-align: center;
      line-height: 40px;
      padding: 5px;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .time {
      width: 750px;
      height: 40px;
      color: #086085;
      text-align: left;
      line-height: 40px;
      padding: 10px;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .img {
      align-self: flex-end;
    }
    .text {
      width: 400px;
      height: 200px;
      font-size: 30px;
      text-align: left;
      color: #539aef;
      overflow: hidden;
    }
  }
  .message {
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-right: 20px;
    padding-left: 20px;
    margin-bottom: 40px;
    padding-top: 20px;
    border:3px #e2e2e2 dashed;
    .line {
      width: 280px;
      height: 3px;
      background-color: #e2e2e2;
    }
    .start{
      width: 170px;
      font-size: 33px;
      p{
        margin-bottom: 30px;
        margin-top: 15px;
      }
    }
    .end{
      width: 170px;
      font-size: 33px;
      p{
        margin-bottom: 30px;
        margin-top: 15px;
      }
    }
    .moneyPeople {
      width:690px;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      color:#2a2a2a;
      border-bottom: 3px #e2e2e2 solid;
      margin-bottom: 70px;
      margin-top: 50px;
      .money {
        width: 150px;
        text-align: center;
      }
      .people {
        width: 200px;
        text-align: center;
      }
    }
  }
  .change{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
    button {
      width: 300px;
      height: 90px;
      background-color: #f9de57;
      border-radius: 8px;
      font-size: 38px;
      border: none;
    }
  }
</style>
