<template>
  <div class="collection">
    <div class="top">
      <img src="./img/jiantou.jpg" @touchend="tosignin2" id="img1"/>
      <span>我的收藏</span>
    </div>
    <div id="box">
      <ul>
        <li v-on:touchend="qh(true);show()" class="li1" >全部收藏</li>
        <li v-on:touchend="qh(false);show2()" class="li2">已失效收藏</li>
        <p id="p1"></p>
      </ul>
    </div>
    <div class="content" v-if="temp">
      <li id="li3"></li>
      <div class="list" v-for="item1 in produceList" :key="item1.productId">
        <span class="time">{{item1.collectionTime}}</span>
        <div class="produce">
          <img class="picture" :src="item1.productImgUrl.split('$')[0]" @touchend="passData(item1)"/>
          <div class="goods">
            <p class="message" @touchend="passData(item1)">{{item1.productContent}}</p>
            <span class="comment" @touchend="passData(item1)">{{item1.productMonth}}人出游</span>
            <span class="price" @touchend="passData(item1)">￥{{item1.productMoney}}</span>
            <span class="button" @touchend="delete1(item1)">取消收藏</span>
          </div>
        </div>

      </div>
      <span class="end">没有更多收藏了</span>
    </div>
    <div class="content2" v-if="!temp">
      <li id="li4"></li>
      <div class="list">
        <div class="produce" v-for="item2 in produceList2" :key="item2.productId">
          <a href="#"><img class="picture" :src="item2.productImgUrl.split('$')[0]"/></a>
          <div class="goods">
            <p class="message">{{item2.productContent}}</p >
            <span class="comment">{{item2.productMonth}}人出游</span>
            <span class="price">￥{{item2.productMoney}}</span>
            <span class="button" @touchend="delete2(item2)">取消收藏</span>
          </div>
        </div>
      </div>
      <span class="end">没有更多收藏了</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'collection',
    data () {
      return {
        pwdType: false,
        temp: true,
        produceList: [],
        produceList2: [],
        data1: [],
        data2: []
      }
    },
    mounted: function () {
      this.show()
      this.show2()
      this.delete1()
      this.delete2()
    },
    methods: {
      tosignin2: function () {
        this.$router.push({
          path: '/signin2'
        })
      },
      qh: function (t) {
        console.log(t)
        this.temp = t
      },
      show: function () {
        axios.post('http://60.205.208.7/Travel_Summer_war/collection/findAllCollection.do').then(resp => {
          let data = resp.data
          this.produceList = []
          for (let i = 0; i < data.length; i++) {
            this.produceList.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      show2: function () {
        axios.post('http://60.205.208.7/Travel_Summer_war/collection/getLoseCollection.do').then(resp => {
          let data = resp.data
          for (let i = 0; i < data.length; i++) {
            this.produceList2.push(data[i])
          }
        }).catch(error => {
          console.log(error)
        })
      },
      delete1 (item1) {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/collection/deleteCollection.do',
          'contentType': 'application/json',
          data: {productid: item1.productId}
        }).then(
          axios.post('http://60.205.208.7/Travel_Summer_war/collection/findAllCollection.do').then(resp => {
            let data = resp.data
            this.produceList = []
            for (let i = 0; i < data.length; i++) {
              this.produceList.push(data[i])
            }
          }).catch(error => {
            console.log(error)
          })
        ).catch(error => {
          console.log(error)
        })
      },
      delete2 (item2) {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/collection/deleteCollection.do',
          'contentType': 'application/json',
          data: {productid: item2.productId}
        }).then(
          axios.post('http://60.205.208.7/Travel_Summer_war/collection/getLoseCollection.do').then(resp => {
            let data = resp.data
            this.produceList2 = []
            for (let i = 0; i < data.length; i++) {
              this.produceList2.push(data[i])
            }
          }).catch(error => {
            console.log(error)
          })
        ).catch(error => {
          console.log(error)
        })
      },
      passData (item1) {
        let id = item1.productId
        if (item1.productIsSpecial === '1') {
          this.$router.push({
            path: '/shows',
            query: {
              productId: id
            }
          })
        } else {
          this.$router.push({
            path: '/shown',
            query: {
              productId: id
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .collection{width:750px;}
  .top{
    width: 750px;
    height: 68px;
    text-align: left;
    #img1{
      width:25px;
      height:45px;
      margin-left:30px;
      margin-top: 40px;
    }
    span{
      font-size:33px;
      margin-left: 235px;
      line-height:68px;
    }
  }
  #box{
    font-size:30px;margin-top:60px;text-align:left;
    .li1{margin-left:125px;width:120px;display:inline-block;}
    .li2{margin-left:203px;width:210px;
      display: inline-block;}
    #p1{width:750px;height:2px;background-color:#e6e6e6;}
  }
  .content{
    margin-left:40px;margin-right:40px;
    #li3{width:240px;height:6px;background-color:#ffe24c;
      margin-left:40px;}
    .list{
      width:100%;
      .time{
        width:100%;
        font-size:30px;
        height:50px;
        line-height:50px;
        display:flex;
        justify-content:left;
      }
      .produce{
        width: 100%;
        height: 230px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 1px #ccc solid;
        .picture{
          width: 190px;
          height: 190px;
          border:1px;
          border-radius:10px;
        }
        .goods{
          display: flex;
          width: 480px;
          height: 180px;
          justify-content: space-between;
          flex-wrap: wrap;
          .message{
            width:100%;
            height: 80px;
            font-size: 30px;
            overflow: hidden;
            text-align: left;
            color: black;
          }
          .comment{
            width:100%;
            height: 50px;
            line-height: 50px;
            font-size: 26px;
            align-self: center;
            text-align: left;
            color: gray;
          }
          .price{
            width: 33%;
            height: 60px;
            line-height: 60px;
            font-size:46px ;
            align-self: flex-end;
            color: #ff5500;
            text-align: left;
          }
          .button{
            width:30%;
            outline:none;
            background-color:#fff;
            border-radius:5px;
            border:2px #29a5ff solid;
            color:#29a5ff;
            font-size:30px;
            height:60px;
            line-height:60px;
            text-align:center;
          }
        }
      }
    }
    .end{
      color:gray;
      font-size:30px;
      margin-top:20px;
      display:block;
    }
  }
  .content2{
    margin-left: 20px;
    margin-right: 20px;
    #li4{width:240px;height:6px;background-color:#ffe24c;
      margin-left:370px; }
    .list{
      width:100%;
      .produce{
        width: 100%;
        height: 230px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 1px #ccc solid;
        a{
          width: 190px;
          height: 190px;
          border-radius:10px;
          opacity: 0.5;
        }
        .picture{
          width: 190px;
          height: 190px;
          border:1px;
          border-radius:10px;
        }
        .goods{
          display: flex;
          width: 480px;
          height: 180px;
          justify-content: space-between;
          flex-wrap: wrap;
          .message{
            width:100%;
            height: 80px;
            font-size: 30px;
            overflow: hidden;
            text-align: left;
            color: gray;
          }
          .comment{
            width:100%;
            height:50px;
            line-height: 50px;
            font-size: 26px;
            align-self: center;
            text-align: left;
            color: gray;
          }
          .price{
            width: 33%;
            height: 60px;
            line-height: 60px;
            font-size:46px ;
            align-self: flex-end;
            color: gray;
            text-align: left;
          }
          .button{
            width:30%;
            outline:none;
            background-color:#fff;
            border-radius:5px;
            border:2px #29a5ff solid;
            color:#29a5ff;
            font-size:30px;
            height:60px;
            line-height:60px;
            text-align:center;
          }
        }
      }
    }
    .end{
      color:gray;
      font-size:30px;
      margin-top:20px;
      display:block;
    }
  }

</style>
