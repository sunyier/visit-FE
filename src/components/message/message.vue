<template>
  <div class="message">
    <header>
      <img src="./img/arrowLeft.png" @touchend="toBack"/>
      <p>订单填写</p>
    </header>
    <div class="content">
      <p>出行人信息</p >
      <div class="title">
        <span>姓名</span>
        <span>性别</span>
        <span style="margin-left: 40px;margin-right: 30px">身份证</span>
      </div>
      <div class="peopleMessage" v-for="(site,index) in sites"
           :class="{checked:arr.includes(index)}"
           @touchend="add(index)"
           :key="site.id">
        <span>{{site.visitorName}}</span>
        <span>{{site.visitorSex}}</span>
        <span>{{site.visitorPersonid}}</span>
      </div>
    </div>
    <footer @touchend="returnMessage()">确定</footer>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'message',
    data: function () {
      return {
        sites: [
          // {name:"张",sex:"男",id:"739273829102700093"},
          //   {name:"李",sex:"女",id:"739273829102700093"},
          //   {name:"赵",sex:"女",id:"739273829102700093"}
        ],
        arr: [],
        orderName: '',
        orderId: 0,
        price: 0,
        orderAdultnum: 0,
        orderChildnum: 0
      }
    },
    mounted: function () {
      this.show()
      this.getQuery()
    },
    methods: {
      add (i) {
        if (this.arr.length <= this.orderAdultnum + this.orderChildnum - 1) {
          this.arr.includes(i) ? this.arr = this.arr.filter(ele => ele !== i) : this.arr.push(i)
        } else {
          this.arr = this.arr.filter(ele => ele !== i)
        }

      },
      toBack: function () {
        this.$router.back(-1)
      },
      getQuery () {
        let orderId = this.$route.query.orderId
        this.orderId = orderId
        let orderAdultnum = this.$route.query.orderAdultnum
        let orderChildnum = this.$route.query.orderAdultnum
        let price = this.$route.query.price
        this.price = price
        this.orderAdultnum = orderAdultnum
        this.orderChildnum = orderChildnum
      },
      show: function () {
        axios.post('http://60.205.208.7/Travel_Summer_war/orders/showVisitors.do').then(resp => {
          let data = resp.data
          for (let i = 0; i < data.length; i++) {
            this.sites.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      returnMessage: function () {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/orders/insertVisitorlist.do',
          'Content-Type': 'application/x-www-form-urlencoded',
          method: 'post',
          data: {'vistorlistVisitorid': this.arr, 'orderId': this.orderId}
        }).then(resp => {
            let data = resp.data
            this.orderName = data.visitorName
            this.price = data.totalmoney
            this.$router.push({
              path: '/orderconfirmation',
              query: {
                orderName: this.orderName,
                orderId: this.orderId,
                price: this.price,
                orderAdultnum: this.orderAdultnum,
                orderChildnum: this.orderChildnum
              }
            })
          }
        ).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  header{
    width: 100%;
    height:90px;
    display:flex;
    justify-content: space-around;
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
      height:38px;
      padding-left: 25px;
      vertical-align: middle;
    }
  }
  .content{
    p{
      font-size: 40px;
      font-weight: bold;
      color: #4e4e4e;
      background-color: #fff;
      text-align: left;
    }
    .title{
      width:100%;
      height:118px;
      border-bottom: 1px silver dotted;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 36px;

    }
    .peopleMessage{
      width:100%;
      height:118px;
      border-top: 1px silver dotted;
      border-bottom: 1px silver dotted;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      margin-top: 15px;
      background-color: #fff;
    }
    div.checked{
      background-color: #fdf4c3;
    }
  }
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    color: #6e6c65;
    background-color: #fae368;
    font-size: 38px;
  }
</style>
