<template>
  <div class="apppage">
    <div class="aaa">
    <div class="home2">
      <k-slider :banners="banners" :swiperOption="swiperOption"></k-slider>
    </div>
    <div class="search1">
      <img src="./img/air.png" @touchend="turnTopot()"/>
      <span>{{tabs}}</span>
      <input type="search" placeholder="高级搜索" @touchend="turnads"/>
    </div>
    <div class="naav">
      <div class="pic">
        <img src="./img/saround.png" @touchend="Tosearcho"/>
        <img src="./img/destination.png" @touchend="Tosearcht"/>
        <img src="./img/sfree.png" @touchend="Tosearchh"/>
        <img src="./img/advant.png" @touchend="Tosearchf"/>
      </div>
      <div class="ntext">
        <span>周边游</span>
        <span>目的地出行</span>
        <span class="sp111">自由行</span>
        <span>高端游</span>
      </div>
    </div>
    <div class="trans"></div>
    <div class="timesale">
      <div class="sale">
        <span class="sp333"></span><span class="sp222">限时特惠</span><span class="sp444"></span>
      </div>
      <div class="ashow" v-for='itemCon in showImg'
           :key="itemCon.id" @click="Toshow(itemCon)">
        <img :src="itemCon.specialImgurl.split('$')[0]" />
        <span>{{itemCon.specialContent.substring(0,40)}}</span>
      </div>
    </div>
    <div class="fwrap">
      <div class="afooter">
        <div><img src="./img/homes.png"/></div>
        <div @touchend="turnTodest()"><img src="./img/destss.png" /></div>
        <div @touchend="turnTohis()"><img src="./img/historys.png" /></div>
        <div @touchend="tomine()"><img src="./img/mine.png"/></div>
      </div>
      <div class="text">
        <span>旅游首页</span>
        <span class="sp55">目的地</span>
        <span class="sp66">浏览历史</span>
        <span>我的</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Slider from '../../../sslider/sslider.vue'
import axios from 'axios'
  export default {
    data: function () {
      return {
        banners: ['http://pic.lvmama.com/uploads/pc/place2/2018-07-16/c388073b-66b8-4a4a-ba73-a037d5479791.jpg', 'http://pic.lvmama.com/uploads/pc/place2/2018-07-31/6ca730cd-a8bd-4327-987d-1198bf6cd40d.jpg', 'http://pic.lvmama.com/uploads/pc/place2/2018-07-25/2e53cce1-52e6-4ee8-8df4-ab3ed33bfd2e.jpg', 'http://pic.lvmama.com/uploads/pc/place2/2018-07-16/5e772246-0115-40d1-b57d-eef53ffd242a.jpg'],
        tabs: [],
        tabc: [],
        swiperOption: {
          direction: 'horizontal',
          loop: true,
          paginationType: 'fraction',
          pagination: '.swiper-pagination',
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          }
        },
        showImg: []
      }
    },
    components: {
      kSlider: Slider
    },
    mounted: function () {
      // this.lazyload()
      this.getImg()
      this.positioncity()
      this.getvalue()
      // window.addEventListener('scroll', this.lazyload)
      // 监听窗口scroll事件
    },
    methods: {
      turnTopot: function () {
        this.$router.push({
          path: '/position'
        })
      },
      turnTodest: function () {
        this.$router.push({
          path: '/destination'
        })
      },
      turnTomine: function () {
        this.$router.push({
          path: '/signin2'
        })
      },
      turnTohis: function () {
        this.$router.push({
          path: '/history'
        })
      },
      positioncity: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/getlocation.do').then(resp => {
          let data = resp.data
          this.tabs = data.location
        }).catch(error => {
          console.log(error)
        })
      },
      //
      getImg: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/specialtime/spe.do').then(resp => {
          let data = resp.data
          for (let i = 0; i < data.length; i++) {
            this.showImg.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      Tosearcho: function () {
        let id = 0
        let type = 1
        this.$router.push({
          path: '/searchResults',
          query: {
            id: id,
            type: type
          }
        })
      },
      Tosearcht: function () {
        let id = 1
        let type = 1
        this.$router.push({
          path: '/searchResults',
          query: {
            id: id,
            type: type
          }
        })
      },
      Tosearchh: function () {
        let id = 2
        let type = 1
        this.$router.push({
          path: '/searchResults',
          query: {
            id: id,
            type: type
          }
        })
      },
      Tosearchf: function () {
        let id = 3
        let type = 1
        this.$router.push({
          path: '/searchResults',
          query: {
            id: id,
            type: type
          }
        })
      },
      Toshow: function (itemCon) {
        let spid = itemCon.specialId
        this.$router.push({
          path: '/shows',
          query: {
            spid: spid
          }
        })
      },
      turnads: function () {
        this.$router.push({
          path: '/advancedSearch'
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*.home2{*/
  /*width: 750px;*/
  /*height: auto;*/
  /*}*/
  .shuffling img{
    width: 750px;
    height: auto;
  }
  .timesale{

  }
  .search1{
    margin-top: 44px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .search1 img{
    padding-left: 20px;
    width: 50px;
    height: 50px;
  }
  .search1 input{
    text-indent: 1em;
    height: 60px;
    margin-right: 110px;
    margin-left: 30px;
    border-radius: 20px;
    width: 600px;
    border: 2px #98d8fc solid;
  }
  .naav{
    margin-top: 60px;
    width: 100%;
    height: 130px;
  }
  #app{
    margin: 0;
  }
  .afooter{
    padding-top:10px;
    display: flex;
    justify-content: space-around;
  }
  .afooter img{
    width: 50px;
    height: 50px;
  }
  .fwrap{
    border-top: 2px #ccc solid;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .text{
    width: 732px;
    display: flex;
    justify-content:space-around ;
  }
  .pic{
    display: flex;
    justify-content: space-around;
  }
  .pic img{
    width: 80px;
    height: 80px;
  }
  .ntext{
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }
  .sp111{
    display: block;
    margin-right: 20px;
  }
  .ntext span{
    font-size: 30px;
  }
  .timesale{
    padding-bottom: 106px;
    margin-top: 40px;
  }
  hr{
    width:100px;
    height:4px ;
    background-color: #7db7a9;
  }
  .sp222{
    vertical-align: middle;
    font-size: 36px;
    color: #7db7a9;
    margin: 0 30px 0 30px;
  }
  .trans{
    width: 750px;
    height: 36px;
    background-color:#f9f9f9 ;
    margin-top: 38px;
  }
  .sp333,.sp444{
    vertical-align: middle;
    width: 200px;
    display: inline-block;
    height: 2px;
    background-color: #7db7a9;
  }
  .ashow{
    width: 730px;
    border-bottom: 2px #ccc solid;
    margin-top: 30px;
  }
  .ashow img{
    vertical-align:middle;
    padding-left: 20px;
    margin-bottom: 25px;
    width: 150px;
    height: 150px;
  }
  .fwrap{
    background-color: #f4f4f4;
  }
  .timer{
    margin-top: 20px;
    font-size: 30px;
    color: #ff0000;
  }
  .search1 span{
    width:80px;
    height: 20px;
  }
  .ashow{
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
  }
  .ashow span{
    display: block;
    font-size: 30px;
    text-align:center;
    text-indent: 2em;
    line-height: 50px;
  }
  .sp66{
    width: 120px
  }
</style>
