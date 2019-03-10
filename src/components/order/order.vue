<template>
  <div class="order">
    <header>
      <div><img src="./img/left.png" width="19" height="19" @touchend="toBack"/></div>
      <p>订单详情</p>
      <div></div>
    </header>
    <div class="content">
      <div class="details">
        <div class="number">订单号 ：{{data1[0].orderNumber}}</div>
        <div class="time">预定日期：{{data1[0].orderTime}}</div>
        <div class="img"><img :src="data1[0].productImgurl" width="100" height="100"></div>
        <div class="text" id="text">{{data1[0].productContent}}</div>
      </div>
      <div class="message">
        <div class="start">启程日<p>{{data1[0].orderTraveltime}}</p></div>
        <p class="line"></p>
        <div class="end">返程日<p>{{data1[0].orderReturntime}}</p></div>
        <div class="moneyPeople">
          <div class="money">总额<br>￥{{data1[0].orderTotalmoney}}</div>
          <div class="people">人数:<br>{{data1[0].orderAdultnum}}成人 {{data1[0].orderChildnum}}小孩</div>
        </div>
        <div class="change" :class="{'show':show1}">
          <!--<img src="./img/delete.png" width="35" height="35"/>-->
          <button type="button"  @touchend="returnBack()">申请退款</button>
        </div>
      </div>
      <div class="inform">
        <div class="caption">
          <span>出行信息{{this.$route.query.ID}}</span>
        </div>
        <div class="main">
          <div class="touch">预定人:<span>{{data1[0].orderContactname}}</span></div>
          <div class="touchPhone">预定人电话:<span>{{data1[0].orderContactphone}}</span></div><br>
          <div v-for="data in data2" :key="data.id">
            <div class="trip">出行人:<span>{{data.visitorName}}</span></div>
            <div class="phone">身份证号码:<span>{{data.visitorPersonid}}</span></div>
          </div><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'order',
    data () {
      return {
        data1: [],
        data2: [],
        data3: [],
        orderId: {},
        text: [],
        number: [],
        show: true,
        show1: false
      }
    },
    mounted: function () {
      this.getQuery()
      this.postId1()
      this.postId2()
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      getQuery () {
        // 取到路由带过来的参数
        // 将数据放在当前组件的数据内
        let orderId = this.$route.query.orderId
        this.orderId = {orderId}
      },
      postId1: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/showSingleOrderF.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: this.orderId
        }).then(resp => {
          let data = resp.data
          this.data1.push(data)
          if (parseInt(data.orderIsout) === 0) {
            this.show1 = false
          } else {
            this.show1 = true
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // _initData: function () {
      //   axios.get('http://172.20.10.9：80/orders/showSingleOrderF.do').then(resp => {
      //     let data = resp.data
      //     this.data1.push(data)
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      // getInform: function () {
      //   axios.get('http://172.20.10.9：80/orders/showSingleOrderS.do').then(resp => {
      //     let data = resp.data
      //     if (data.length) {
      //       for (let i = 0; i < data.length; i++) {
      //         this.data2.push(data[i])
      //       }
      //     } else if (!data.length) {
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      postId2: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/showSingleOrderS.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: this.orderId
        }).then(resp => {
          let data = resp.data
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              this.data2.push(data[i])
              // this.visitorPersonid.push(data[i].visitorPersonid)
              // this.number = this.visitorPersonid.replaceAll('(\\d{4})\\d{10}(\\w{4})","$1*****$2')
              // console.log(this.visitorPersonid.replaceAll('(\\d{4})\\d{10}(\\w{4})","$1*****$2'))
            }
          } else if (!data.length) {
          }
        }).catch(error => {
          console.log(error)
        })
      },
      returnBack: function () {
        let dataBack = {'orderId': this.data1[0].orderId}
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/refund.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: dataBack
        }).then(resp => {
          let data = resp.data
          if (parseInt(data.isSuccess) === 1) {
            this.$router.push({
              path: '/backMoneyOk'
            })
          } else {
            this.$router.push({
              path: '/backMoneyNo'
            })
          }
        }).catch(error => {
          console.log(error)
        })
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
    margin-bottom: 20px;

    div{
      text-align: left;
      padding-left: 20px;
      width: 150px;
      height: 38px;
    }

    p{
      text-align: center;
      line-height: 38px;
      font-size: 36px;
      color:black;
    }
  }
  .content{
    width:93%;
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
    /*border: 1px #999898 solid;*/
  }
  .div1{
    width: 95%;
  }
  .details {
    width: 98%;
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
      img{
        transition:1s all;
      }
    }
    .text {
      width: 450px;
      height: 200px;
      font-size: 30px;
      text-align: left;
      /*text-indent: 2em;*/
      /*-webkit-line-clamp: 3;*/
      /*-webkit-box-orient: vertical;*/
      /*text-overflow: ellipsis;*/
      /*line-height: 1.4;*/
      /*display: -webkit-box;*/
      color: #539aef;
      overflow: hidden;
    }
  }
  .message{
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap:wrap;
    padding: 20px;
    margin-bottom: 40px;
    border: 3px #e2e2e2 dashed;
    .line{
      width: 280px;
      height: 3px;
      background-color:#e2e2e2;
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
    .moneyPeople{
      width:690px;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      color:#2a2a2a;
      border-bottom: 3px #e2e2e2 solid;
      margin-bottom: 40px;
      margin-top: 50px;
      .money{
        width: 150px;
        text-align: center;
      }
      .people{
        width: 200px;
        text-align: center;
      }
    }
    .change{
      width:690px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      button{
        width: 300px;
        height: 70px;
        background-color: #f9de57;
        border-radius: 8px;
        font-size: 38px;
        border: none;
        line-height: 70px;
        margin-top: 15px;
      }
    }
  }
  .change.show{display:none}
  .inform{
    width: 100%;
    background-color: #9fa2b6;
    padding-bottom: 20px;
    border-radius: 14px;
    .caption{
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      span{
        width:150px;
        font-size: 36px;
        color: white;
      }
    }
    .main{
      width: 80%;
      background-color: white;
      margin-bottom: 30px;
      margin-left: 59px;
      border-radius: 14px;
      padding:10px;
      .touch{
        width: 540px;
        margin: 0 auto;
        text-align: left;
        font-size: 32px;
        padding-bottom: 10px;
      }
      .touchPhone{
        width: 540px;
        margin: 0 auto;
        text-align: left;
        font-size: 32px;
        padding-bottom: 10px;
      }
      .trip{
        width: 540px;
        margin: 0 auto;
        text-align: left;
        font-size: 32px;
        padding-bottom: 10px;
      }
      .phone{
        width: 540px;
        margin: 0 auto;
        text-align: left;
        font-size: 32px;
        padding-bottom: 10px;
      }
    }
  }
</style>
