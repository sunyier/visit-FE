<template>
  <div class="history">
    <div class="header">
      <img class="img1" src="./img/Rleft.png" @touchend="toBack()">
      <span class="sp1">浏览历史</span>
    </div>
    <div class="hrecord">
      <!--<li v-for="(item,index) in tabs"-->
          <!--:class="{active:index === num}"-->
          <!--@touchend="tab(index)"-->
          <!--:key="item.id">{{item}}</li>-->
      <div class="show" v-for='item in historys'
           :key="item.id" @click="Toshow(item)">
        <img :src="item.productImgurl.split('$')[0]" />
        <span class="hsp1">{{item.productContent.substring(0,40)}}</span>
        <span class="hsp2">{{item.historysTime.substring(0,11)}}</span>
    </div>
  </div>
    <div class="wrap">
      <div class="footer">
        <div @touchend="turnTohome()"><img src="./img/home1.png"/></div>
        <div @touchend="turnTodest()"><img src="./img/destss.png" /></div>
        <div><img src="./img/historys.png" /></div>
        <div @touchend="tomine"><img src="./img/mine.png"/></div>
      </div>
      <div class="text">
        <span>旅游首页</span>
        <span class="sp5">目的地</span>
        <span class="sp6">浏览历史</span>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'position',
    data: function () {
      return {
        historys: [],
        num: -1,
        tabc: []
      }
    },
    mounted: function () {
      this.history()
      this.getvalue()
    },
    methods: {
      tab (index) {
        this.num = index
      },
      toBack: function () {
        this.$router.back(-1)
      },
      history: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/product/getHistory.do').then(resp => {
          let data = resp.data
          for (var i = 0; i < data.length; i++) {
            this.historys.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      Toshow: function (item) {
        let aid = item.productId
        this.$router.push({
          path: '/shows',
          query: {
            aid: aid
          }
        })
      },
      getvalue: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/myuser1.do').then(resp => {
          let data = resp.data
          this.tabc.push(data)
        }).catch(error => {
          console.log(error)
        })
      },
      tomine: function () {
        if(this.tabc[0] === 1) {
          this.$router.push({
            path: '/signin2'
          })
        } else {
          this.$router.push({
            path: '/signin'
          })
        }
      },
      turnTohome: function () {
        this.$router.push({
          path: '/apppage'
        })
      },
      turnTodest: function () {
        this.$router.push({
          path: '/destination'
        })
      },
      turnTomine: function () {
        this.$router.push({
          path: '/signin'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history{
  .header{
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 750px;
    height: 100px;
    text-align: center;
    line-height: 140px ;
    background-color:  #5dc7b9 ;
    .sp1{
      width:160px;
      font-size: 38px;
      text-align: center;
      line-height: 88px;
      color: #000;
      margin-right: 295px;
    }
    .img1{
      padding-top:20px;
      padding-left: 25px;
      width: 45px;
      height: 45px;
    }
  }
    .hrecord{
      margin-top: 160px;
      div{
        display: inline-block;
        height: 160px;
        width: 720px;
        border-bottom: 4px #f4f4f4 solid;
        padding: 0;
        margin: 0;
        img{
          width: 130px;
          height: 130px;
          padding-top: 16px;
        }
        .hsp2{
          width: 100px;
          height: 40px;
          margin-left: -60px;
        }
        .hsp1{
          text-indent: 2em;
          font-size: 28px;
          width: 500px;
          height: 200px;
          display: inline-block;
        }
      }
    }
    .wrap{
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
</style>
