<template>
  <div class="orderMangement">
    <!--头部-->
    <div class="head">
      <header>
        <div><img src="./img/left.png" class="img1" width="19" height="19" @touchend="toBack()"/></div>
        <p>订单详情</p>
        <div></div>
      </header>
      <!-- 中间部分-->
      <ul class="nav">
        <li v-for="(item,index) in items"
            :key="item.id" :class="{'checked':index===n}" @touchend="changeP(index),check()"><img :src='item.path'/><p>{{item.text[0]}}</p></li>
      </ul>
    </div>
    <div class="content" >
      <p id="none"><img src="./img/point.png" width="30px" height="30px"/>   暂时还没有订单   <img src="./img/point.png" width="30px" height="30px"/></p>
      <div class="oneOrder"  v-for="data in data1" :key="data.key">
        <div class="time">预定日期：{{data.ordertime}}</div>
        <div class="id">{{data.orderId}}</div>
        <div class="z2" v-show="show4"></div>
        <div class="order" @click="toOrder(data)">
          <div class="img"><img :src="data.img" /></div>
          <div class="inform">
            <div class="div1">
              <div class="text">
                <div class="title"><span>{{data.producttitle}}</span></div>
                <div class="from"><span>{{data.traveltime}}</span>至<span>{{data.returntime}}</span></div>
              </div>
              <div class="money"><p class="p1">￥{{data.money}}</p><p class="p2" id="state">{{data.status}}</p></div>
            </div>
          </div>
          <div class="block"></div>
          <div class="button">
            <p >{{state1[0]}}</p>
            <p >{{state2[0]}}</p>
            <p >{{state3[0]}}</p>
            <!--<button type="button"  v-show="show1" >去支付</button>-->
            <button type="button"  v-show="show2" @touchend.stop="again(data)">去点评</button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <!--<button type="button" @touchend="timeLose(x),changeUrl()">时间<img :src='dataUrl' width="25" height="25"> </button>-->
      <div class="chooseTime" v-show="show">
        <div class="far" @touchend="timeLose(1)">由远到近</div>
        <div class="next" @touchend="timeLose(2)">由近到远</div>
      </div>
      <div>
        <!--<button type="button" @touchend="timeLose(2)" v-show="show3">近&ndash;&gt;远<img src="./img/up.png" width="15" height="15"> </button>-->
        <!--<button type="button" @touchend="timeLose(1)" v-show="show3">远&ndash;&gt;近<img src="./img/down.png" width="15" height="15"> </button>-->
        <button type="button" @touchend="pleaseshow" v-show="show3">时间筛选</button>
        <button type="button" @touchend="timeLose(3)" :class="{'show':show5}" id="btn">失效订单</button>
      </div>
      <!--<div class="sort"><img :src='dataUrl' @touchend="changeUrl"/></div>-->
      <!--<div class="lose"><img src="./img/lose.png" @touchend=" _initData(),judge" ></div>-->
    </footer>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data1: [],
        data2: [],
        items: [{path: require('./img/complatedorder2.png'), text: ['全部订单']},
          {path: require('./img/waitpay2.png'), text: ['待支付']},
          {path: require('./img/payorder2.png'), text: ['待出行']},
          {path: require('./img/appraise2.png'), text: ['待评价']},
          {path: require('./img/moneyback2.png'), text: ['退款订单']}],
        dataUrl: require('./img/down.png'),
        bOn: false,
        n: 0,
        state1: [],
        state2: [],
        state3: [],
        show: false,
        show1: true,
        show2: true,
        show3: true,
        show4: false,
        show5: false
      }
    },
    mounted: function () {
      this.check()
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      pleaseshow: function () {
        this.show = !this.show
      },
      // stop:function () {
      //   let button = document.getElementsByClassName('div1')
      //   button.addEventListener()
      // }
      toOrder: function (data) {
        let id = {'orderId': data.orderId}
        let ID = data.orderId
        // let type = 1
        axios({
          method: 'post',
          // url: 'http://172.20.10.9：80/orders/isPay.do',
          url: 'http://60.205.208.7/Travel_Summer_war/orders/isPay.do',
          'Content-Type': 'application/json;charset=utf-8',
          data: id
        }).then(resp => {
          let data = resp.data
          if (parseInt(data.result) === 1) {
            this.$router.push({
              path: '/waitpay',
              query: {
                orderId: ID
                // type: type
              }
            })
          } else if (parseInt(data.result) === 2) {
            this.$router.push({
              path: '/order',
              query: {
                orderId: ID
              }
            })
          } else {
            this.$router.push({
              path: '/lose'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      again: function (data) {
        let id = data.orderId
        this.$router.push({
          path: '/userEvaluation',
          query: {
            orderId: id
          }
        })
        //   // else if (number === 2) {
        //   //   let id = {'orderId': data.orderId}
        //   //   let ID = data.orderId
        //   //   console.log(ID)
        //   //   axios({
        //   //     method: 'post',
        //   //     // url: 'http://172.20.10.9：80/orders/isPay.do',
        //   //     url: 'http://172.20.10.9：80/orders/isPay.do',
        //   //     'Content-Type': 'application/json;charset=utf-8',
        //   //     data: id
        //   //   }).then(resp => {
        //   //     let data = resp.data
        //   //     if (parseInt(data.isPay) === 0) {
        //   //       this.$router.push({
        //   //         path: '/waitpay',
        //   //         query: {
        //   //           orderId: ID
        //   //         }
        //   //       }).catch(error => {
        //   //         console.log(error)
        //   //       })
        //   //     }
        //   //   })
        //   // }
      },
      changeP (i) {
        this.n = i
      },
      // changeUrl: function () {
      //   if (this.bOn) {
      //     this.dataUrl = require('./img/down.png')
      //     this.x = 2
      //     this.bOn = !this.bOn
      //   } else if (!this.bOn) {
      //     this.dataUrl = require('./img/up.png')
      //     this.x = 1
      //     this.bOn = !this.bOn
      //   }
      // },
      changeUrl: function () {
        this.bOn ? this.dataUrl = require('./img/up.png') : this.dataUrl = require('./img/down.png')
        this.bOn = !this.bOn
      },
      // _initData: function () {
      //   axios.get('http://172.20.10.3:8080/orders/showAllOrders.do').then(resp => {
      //     let data = resp.data
      //     if (data.length) {
      //       for (var i = 0; i < data.length; i++) {
      //         this.data1.push(data[i])
      //       }
      //     } else if (!data.length) {
      //       let None = document.getElementById('none')
      //       None.style.display = 'block'
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }

      // if (this.data[i].ispay === 0) {
      //   this.m = 0
      //   this.i = 0
      // } else if (this.data[i].ispay === 1 && this.data[i].isout === 0) {
      //   this.m = 1
      // } else if (this.data[i].ispay === 1 && this.data[i].isout === 1 && this.data[i].isevaluate === 0) {
      //   this.m = 2
      //   this.i = 1
      // } else if (this.data[i].isfound === 1) {
      //   this.m = 3
      // }
      // } else if (!data.length) {
      // let None = document.getElementById('none')
      //       None.style.display = 'block'
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      // judge: function () {
      //   for (var i = 0; i < this.data1.length; i++) {
      //     if (this.data1[i].ispay === 0) {
      //       this.m = 0
      //       this.i = 0
      //     } else if (this.data1[i].ispay === 1 && this.data1[i].isout === 0) {
      //       this.m = 1
      //     } else if (this.data1[i].ispay === 1 && this.data1[i].isout === 1 && this.data1[i].isevaluate === 0) {
      //       this.m = 2
      //       this.i = 1
      //     } else if (this.data1[i].isfound === 1) {
      //       this.m = 3
      //     }
      //   }
      // },
      check: function () {
        this.data1 = []
        if (this.n === 0) {
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrders.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show3 = true
                this.show1 = this.show2 = false
                this.show4 = this.show5 = this.show = false
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.n === 1) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersByispay.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show2 = this.show3 = false
                this.show1 = this.show5 = true
                this.show4 = this.show = false
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.n === 2) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersByisout.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show1 = this.show2 = this.show3 = false
                this.show4 = this.show = false
                this.show5 = true
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.n === 3) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersByisevaluate.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show1 = this.show3 = false
                this.show4 = this.show = false
                this.show2 = this.show5 = true
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (this.n === 4) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersByisrefund.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show1 = this.show2 = this.show3 = false
                this.show4 = this.show = false
                this.show5 = true
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = false
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      timeLose: function (num) {
        if (num === 1) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersBytime.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show4 = this.show = false
                this.show5 = false
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (num === 2) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersBydesctime.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show4 = this.show = false
                this.show5 = false
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
            }
          }).catch(error => {
            console.log(error)
          })
        } else if (num === 3) {
          this.data1 = []
          axios.get('http://60.205.208.7/Travel_Summer_war/orders/showAllOrdersByislose.do').then(resp => {
            let data = resp.data
            if (data.length) {
              for (let i = 0; i < data.length; i++) {
                this.data1.push(data[i])
                this.show3 = this.show = false
                this.show4 = true
                this.show5 = true
                let None = document.getElementById('none')
                None.style.display = 'none'
              }
            } else if (!data.length) {
              let None = document.getElementById('none')
              None.style.display = 'block'
              this.show3 = this.show = false
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
  body{
    margin: 0;
    padding: 0;
    position: relative;
  }
  .orderManagement{
    width: 750px;
  }
  /*.head{*/
  /*position: fixed;*/
  /*top:90px;*/
  /*z-index: 30;*/
  /*background-color: white;*/
  //}
  header{
    width: 100%;
    height: 90px;
    align-items:center;
    display: flex;
    justify-content:space-between;
    margin-bottom: 20px;
    top:90px;
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
  .nav {
    display: flex;
    height: 127px;
    width: 100%;
    list-style: none;
    padding: 0;
    margin-bottom: 35px;
    align-items: center;
    li {
      width: 150px;
      img {
        margin-bottom: 20px;
        width: 40px;
        height: 40px;
        p {
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 30px;
          margin-bottom: 0;
        }
      }
    }
  }
  .nav li.checked{font-size: 34px;border-bottom: 8px #F9DE57 solid}
  .z2{
    z-index: 20;
    width: 700px;
    height: 175px;
    background-color: #e2e2e2;
    opacity:0.6;
    /*display: none;*/
    position: absolute;
  }
  .content{
    /*padding-top: 310px;*/
    width: 93%;
    display: flex;
    flex-wrap:wrap;
    #none{
      margin: 300px auto;
      font-size: 33px;
      display: none;
    }
  }
  .oneOrder{
    width: 100%;
  }
  .time{
    width: 280px;
    height: 43px;
    font-size: 25px;
    border-radius: 16px 16px;
    background-color: #f9ee75;
    margin-left: 17px;margin-bottom: 16px;
    line-height: 43px;
    text-align: center;
  }
  .id{
    display: none;
  }
  .order:last-child{
    margin-bottom: 100px;
  }
  /*.order:first-child{*/
  /*margin-top: 200px;*/
  /*}*/
  .order {
    text-align: center;
    display: flex;
    border: 1px #e4e4e4 solid;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    margin-bottom: 20px;
    img {
      width : 150px;
      height: 150px;
    }
    .block{
      width: 300px;
    }
  }
  .inform{
    width: 75%;
    .div1{
      display: flex;
      justify-content: space-between;
      .text{
        .title{
          color: #000000;
          font-size:30px;
          /*margin-left: 20px;*/
          margin-top: 10px;
          margin-bottom: 50px;
          text-align: left;
        }
        .form{
          font-size: 25px;
        }
      }
    }
    .money{
      width: 150px;
      height:100px;
      margin: 0;
      font-size: 30px;
      p{
        margin: 0;
        font-size: 30px;
      }
    }
  }
  .p1{
    color:#db2219;
    font-size:30px;
  }
  .from{
    padding: 2px;
    /*border:2px #a9cdef solid;*/
    border-radius: 15px;
    align-self:flex-end;
    /*line-height: 76px;*/
  }
  .button{
    align-self:flex-end;
    button{
      height: 50px;
      background-color: #eff4f8;
      border-radius: 20px;
      margin-right:5px;
      padding: 5px;
    }
  }
  footer{
    z-index: 30;
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    justify-content: space-between;
    background-color: #e2e2e2 ;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    div{
      width:80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
    button{
      height: 70px;
      background-color:  #e2e2e2;
      font-size: 30px;
      border-radius: 12px;
      padding: 5px;
      font-weight: 500;
    }
    /*div{*/
    /*width: 200px;*/
    /*height: 80px;*/
    /*text-align: center;*/
    /*}*/
    /*img{*/
    /*width:80px;*/
    /*height: 80px;*/
    /*}*/
  }
  /*#btn.show{*/
  /*;*/
  /*}*/
  .chooseTime{
    /*width: 160px;*/
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    bottom:89px;
    /*left:60px;*/
    font-size: 30px;
    z-index: 33;
    background-color: white;
    color:black;
    div{
      width: 200px;
      margin-left: 80px;
      margin-right: 1px;
      text-align: center;
      font-size: 30px;
      line-height: 90px;
      p{
        margin-left: 200px;
      }
    }
  }
</style>
