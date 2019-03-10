<template>
  <div class="news">
    <div class="header">
      <img src="./img/Rleft.png" @touchend="toBack">
      <span>消息</span>
    </div>
    <div class="newstype">
      <div class="shop" @touchend="hotcity">供应商</div>
      <div class="activity" @touchend="activey">活动</div>
    </div>
    <div class="banner"></div>
      <div class="shownews">
        <div v-for="(item,index) in tabs"
             :class="{active:index === num}"
             :key="item.id">
          <img src="./img/gys.png"/>
          <span class="s1">{{item.supplyName}}</span>
          <li @touchend="Toshow(item1)">{{item.supplyreplyResponse}}</li>
          <span class="time">{{item.supplyreplyCreatetime}}</span>
        </div>
      </div>
      <div class="shownew" >
        <div v-for="(item1,index) in tabc"
             :class="{active:index === num}"
             :key="item1.id">
          <img src="./img/hd.png"/>
          <li>{{item1.specialContent}}</li>
          <span>{{item1.specialStarttime}}</span>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'News',
    data: function () {
      return {
        tabs: [],
        tabc: [],
        num: 1
      }
    },
    mounted: function () {
      this.hotcity()
      this.activey()
    },
    methods: {
      tab (index) {
        this.num = index
      },
      toBack: function () {
        this.$router.back(-1)
      },
      hotcity: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/supplyreply/getsupplyreply.do').then(resp => {
          let data = resp.data
          this.tabc = []
          for (var i = 0; i < data.length; i++) {
            this.tabs.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      activey: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/specialtime/reply.do').then(resp => {
          let data = resp.data
          this.tabs = []
          for (var i = 0; i < data.length; i++) {
            this.tabc.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      Toshow: function (item1) {
        let pid = item1.specialId
        this.$router.push({
          path: '/shows',
          query: {
            pid: pid
          }
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
  span{
    margin: 0;
    padding: 0;
  }
  .news{
    .header{
      background-color: #fae368;
      display: flex;
      width: 750px;
      height: 88px;
      justify-content: space-between;
      img{
        padding-top: 18px;
        width: 45px;
        height: 45px;
      }
      span{
        margin-right: 318px;
        color: #000;
        line-height: 88px;
        font-size: 38px;
        text-align: center;
        margin-left: 40px;
      }
    }
    .newstype{
      width : 750px;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      font-size: 30px;
      .shop{
        margin-left: 30px;
      }
      .activity{
        margin-right: 30px;
      }
    }
    .banner{
      width: 750px;
      height: 30px;
      background-color: #f4f4f4;
      margin-top: 30px;
    }
    .shownews{
      div{
        display: flex;
        justify-content: space-around;
        border-bottom: 2px #f4f4f4 solid;
        margin-bottom: 60px;
      }
      img{
        margin-left: 10px;
        width:70px;
        height:70px;
      }
      li{
        text-align: left;
        text-indent: 2em;
        font-weight: normal;
      }
    }
    .shownew{
      div{
        display: flex;
        justify-content: space-around;
        border-bottom: 2px #f4f4f4 solid;
        margin-bottom: 60px;
      }
      img{
        margin-left: 10px;
        width:70px;
        height:70px;
      }
      li{
        text-align: left;
        text-indent: 2em;
        font-weight: normal;
      }
    }
  }
  .shop.active{
    color: #fae368;
  }
  .s1{
    font-weight: bold;
  }
</style>
