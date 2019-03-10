<template>
  <div class="position">
    <div class="search">
      <img src="./img/Rleft.png" @touchend="toBack()"/>
      <!--<input type="search" placeholder="搜索城市"/>-->
    </div>
    <div class="nowposition">
      <span><img src="./img/positionpic.png"/>定位</span>
    </div>
    <div class="positionnew">
      <div>{{tabs}}</div>
    </div>
    <div class="hotcity">
      <div class="hc">国内城市</div>
      <div class="city" >
        <ul>
          <li v-for="(item,index) in tabc"
              :class="{active:index === num}"
              @click="tab(index)"
              :key="item.id"
              @touchend="returnv(item);Toshown(item)"
          >{{item}}</li>
        </ul>
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
        tabs: [],
        tabc: [],
        num: 1
      }
    },
    mounted: function () {
      this.hotcity()
      this.positioncity()
    },
    methods: {
      tab (index) {
        this.num = index
      },
      positioncity: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/getlocation.do').then(resp => {
          let data = resp.data
          this.tabs = data.location
        }).catch(error => {
          console.log(error)
        })
      },
      hotcity: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/area/city.do').then(resp => {
          let data = resp.data
          for (var i = 0; i < data.length; i++) {
            this.tabc.push(data[i].areaCity)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      returnv: function (item) {
        axios({
          url: 'http://60.205.208.7/Travel_Summer_war/area/acceptlocation.do',
          method: 'post',
          data: item,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          xhrFields: {
            withCredentials: true
          }
        }).then(setTimeout(this.$router.push({
          path: '/apppage'
        }), 3000))
      },
      toBack: function () {
        this.$router.back(-1)
      },
      Toshown: function (item) {
        let city = item
        this.$router.push({
          path: '/apppage',
          query: {
            city: city
          }
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .search{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    justify-content: space-between;
  }
  .search img{
    width: 45px;
    height: 45px;
  }
  .search input{
    border-radius: 20px;
    text-align: center;
    margin-right: 100px;
    width: 500px;
    border: 2px  #5dc7b9 solid;
  }
  .nowposition{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    height: 32px;
    background-color: #f4f4f4;
  }
  .nowposition span{
    margin-left: 20px;
    text-align: center;
    line-height: 32px;
    color: #5dc7b9;
  }
  .positionnew{
    display: flex;
    justify-content: space-between;
    height: 120px;
  }
  .positionnew div{
    margin-left: 20px;
    margin-top: 37px;
    height: 50px;
    width: 125px;
    text-align: center;
    line-height: 50px;
    border: 2px #f4f4f4 solid;
    border-radius: 30px;
    font-size: 24px;
  }
  .hc{
    text-align: left;
    text-indent: 1em;
    width: 750px;
    color: #5dc7b9;
    background-color: #f4f4f4;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    align-content:space-between;
  }
  li{
    width: 20%;
    height: 50px;
    margin:0 0 30px 30px;
    border-radius: 20px;
    text-align: center;
    line-height: 50px;
    background-color: #f4f4f4;
  }
  .city{
    width: 750px;
    padding-top: 30px;
  }
  li.active{
    background-color: #5dc7b9;
  }
</style>
