<template>
  <div class="destination">
    <div class="hwarp">
      <div class="header">
        <div class="top">
          <img src="./img/Rleft.png" @touchend="toBack()">
          <span class="sp121">选择目的地</span>
        </div>
      </div>
    </div>
    <div class="section">
      <ul>
        <!--<li>热门</li>-->
        <!--<li>周边</li>-->
        <!--<li>国内</li>-->
        <!--<li>欧洲</li>-->
        <!--<li>美州</li>-->
        <!--<li>澳中东非</li>-->
        <li v-for="(item,index) in tabs"
            :class="{active:index === num}"
            @touchend="tab(index);returntype(item);"
            :key="item.id">{{item}}
        </li>
      </ul>
    </div>
    <div class="showpage">
      <div class="tabCon">
        <div v-for='itemCon in tabContents'
             :key="itemCon.id" >
          <img :src="itemCon.areaImg" @click="Tosearch(itemCon)" />
          <span id="city">{{itemCon.areaCity}}</span>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="footer">
        <div @touchend="turnTohome"><img src="./img/home1.png"/></div>
        <div><img src="./img/dest1.png"/></div>
        <div @touchend="turnTohis"><img src="./img/historys.png"/></div>
        <div @touchend="tomine"><img src="./img/mine.png"/></div>
      </div>
      <div class="text">
        <span>旅游首页</span>
        <span>目的地</span>
        <span>浏览历史</span>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'destination',
    data: function () {
      return {
        tabs: ['热门', '中国', '周边', '欧洲', '美洲', '澳中东非'],
        tabContents: [],
        num: 0,
        tabc: []
      }
    },
    mounted: function () {
      this.getvalue()
      this.returnfirst()
    },
    methods: {
      tab (index) {
        this.num = index
      },
      toBack: function () {
        this.$router.back(-1)
      },
      turnTohis: function () {
        this.$router.push({
          path: '/history'
        })
      },
      turnTohome: function () {
        this.$router.push({
          path: '/apppage'
        })
      },
      turnTomine: function () {
        this.$router.push({
          path: '/signin'
        })
      },
      returntype: function (item) {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/area/alltarget.do',
          method: 'post',
          data: item,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          // 跨域请求
          // xhrFields: {
          //   withCredentials: true
          // }
        }).then(resp => {
          let data2 = resp.data
          this.tabContents = []
          for (let i = 0; i < data2.length; i++) {
            this.tabContents.push(data2[i])
          }
        })
      },
      returnfirst: function () {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/area/alltarget.do',
          method: 'post',
          data: '热门',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          // xhrFields: {
          //   withCredentials: true
          // }
        }).then(resp => {
          let data3 = resp.data
          this.tabContents = []
          for (let i = 0; i < data3.length; i++) {
            this.tabContents.push(data3[i])
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
      Tosearch: function (itemCon) {
        let type = 2
        let city = itemCon.areaCity
        this.$router.push({
          path: '/searchResults',
          query: {
            city: city,
            type: type
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
  .destination{
    width: 750px;
    .showpage{
      z-index: -999;
      position: absolute;
      right: 0;
      top: 200px;
      bottom: 106px;
      .tabCon{
        margin-bottom: 106px;
        width:600px;
        img {
          margin-bottom: 30px;
          width: 250px;
          height: 250px;
          margin-left: 20px;
        }
        div{
          margin-right: 30px;
          display: inline-block;
          width: 40%;
          padding-left: -30px;
          span{
            position: relative;
            left: 20px;
            bottom: 20px;
          }
        }
      }
    }
    .section{
      position: fixed;
      left: 0;
      bottom: 92px;
      li{
        border-top: 1px #ccc solid;
        width: 176px;
        height: 177.5px;
        background-color:#f4f4f4;
        text-align: center;
        line-height: 152px;
        border-bottom: 2px #ccc solid;
      }
      li.active{
        background-color:  #ffffff;
        transition: 0.1s all linear;
      }
    }
    .hwarp{
      width: 100%;
      position: fixed;
      top: 0;
      .header{
        z-index: 999;
        width: 750px;
        height: 160px;
        background-color: #5dc7b9;
        img{
          padding-left: 30px;
          width: 45px;
          height: 45px;
        }
        .top{
          margin-bottom: 50px;
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          img{
            padding-left: 20px;
          }
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
  .sp121{
    margin-right: 275px;
    font-size: 40px;
    color: #000000;
  }

</style>
