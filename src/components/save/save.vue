<template>
  <div class="save">
    <header>
      <header>
        <img src="./img/arrowLeft.png" @touchend="toBack"/>
        <p>优惠券</p>
      </header>
    </header>
    <div class="content">
      <div class="sale" v-for="(site,index) in arr"
           :key="site.id">
        <span>￥{{arr[index].discountReduce}}</span>
        <p>满{{arr[index].discountReach}}减{{arr[index].discountReduce}}<img src="./img/sale.png"></p>
      </div>
    </div>
    <footer @touchend="returnSave()">确定</footer>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'save',
    data: function () {
      return {
        arr: []
      }
    },
    mounted: function () {
      this.initData()
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      initData: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/orders/showUDiscount2.do').then(resp => {
          let data = resp.data
          for (let i = 0; i < data.length; i++) {
            this.arr.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      }

    }}
</script>

<style lang="scss" scoped>
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
      width:35px;
      height:38px;
      vertical-align: middle;
      padding-left: 30px;
    }
  }
  .content{
    .sale {
      width: 700px;
      height: 200px;
      display: flex;
      justify-content: space-between;
      border-radius: 5%;
      margin-top: 30px;
      border: 1px solid silver;
      /*!*background-color:#f4f4f4;*!*/
      background:url("./img/bgc.png");
      background-size:cover;
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
        img{
          position: absolute;
          bottom: 50px;
          right: 20px;
        }
      }
    }
    div.checked{
      border: #f7bc2e 5px solid;
    }
  }
  footer{
    width: 100%;
    height: 100px;
    font-size: 38px;
    color:#8c8353;
    background-color: #fae368;
    text-align: center;
    line-height: 100px;
    position: fixed;
    bottom: 0;
  }
</style>
