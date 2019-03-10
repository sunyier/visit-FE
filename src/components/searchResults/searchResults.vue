<template>
  <div class="searchResults">
    <header>
      <div>
        <img src="./img/return.png" @touchend="toBack">
      </div>
      <p>产品列表</p>
      <div></div>
    </header>
    <div class="content">
      <ul class="sort">
        <li v-for="(item,index) of items" :key="item.id" :class="{ 'checked':n==index}"
            @touchend="changeN(index),select()">{{item}}</li>
      </ul>
      <div class="none" ref="show">--没有找到相关产品--</div>
      <div class="list">
        <div class="produce" @click="passData(item1)"  v-for="item1 in produceList" :key="item1.id">
          <div class="picture">
            <div class="special" v-show="item1.productIsSpecial === '1'">限时特卖</div>
            <img :src="item1.productImgurl.split('$')[0]">
          </div>
          <div class="goods">
            <p class="message">{{item1.productContent}}</p>
            <span class="location"><img src="./img/location.png">{{item1.area_city}}</span>
            <span class="comment">{{item1.productMonth}}人出游</span>
            <span class="price">￥{{item1.starting_money}}</span>
          </div>
        </div>
      </div>
      <img src="./img/foot.png" class="foot" @touchend="toHistory()">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'searchResults',
    data () {
      return {
        items: ['人气最高', '价格升序', '价格降序'],
        n: 0,
        produceList: [],
        dataList: {},
        pageList: {},
        destList: {},
        type: ''
      }
    },
    mounted () {
      this.receiveType()
      this.destData()
      this.receiveData()
      this.receivePageData()
      if (this.type === 1) {
        this.InitPageData()
      } else if (this.type === 2) {
        this.InitdestData()
      } else if (this.type === 3) {
        this.InitData()
      }
    },
    methods: {
      receiveType () {
        this.type = this.$route.query.type
      },
      select () {
        if (this.type === 1) {
          this.submitPageData()
        } else if (this.type === 2) {
          this.submitDestData()
        } else if (this.type === 3) {
          this.submitData()
        }
      },
      receiveData () {
        let d = this.$route.query.d
        let date = this.$route.query.date
        let day = this.$route.query.day
        let money = this.$route.query.money
        let s = this.$route.query.s
        this.dataList = {d, date, day, money, s}
      },
      receivePageData () {
        let tag = this.$route.query.id
        let user_location = ''
        this.pageList = {tag, user_location}
      },
      destData () {
        let user_location = this.$route.query.city
        let tag = 5
        this.destList = {tag, user_location}
      },
      toBack () {
        this.$router.back(-1)
      },
      changeN (i) {
        this.n = i
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
      },
      toHistory () {
        this.$router.push({
          path: '/history'
        })
      },
      InitPageData () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/product/month.do',
          data: this.pageList,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(resp => {
            this.produceList.splice(0)
            let data = resp.data
            if (data.length) {
              this.$refs.show.style.display = 'none'
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            } else {
              this.$refs.show.style.display = 'block'
            }
          }
        ).catch(error => {
          console.log(error)
        })
      },
      InitdestData () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/product/month.do',
          data: this.destList,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(resp => {
            this.produceList.splice(0)
            let data = resp.data
            if (data.length) {
              this.$refs.show.style.display = 'none'
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            } else {
              this.$refs.show.style.display = 'block'
            }
          }
        ).catch(error => {
          console.log(error)
        })
      },
      InitData () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/product/advanceSearchByMonth.do',
          data: this.dataList,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(resp => {
            this.produceList.splice(0)
            let data = resp.data
            if (data.length) {
              this.$refs.show.style.display = 'none'
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            } else {
              this.$refs.show.style.display = 'block'
            }
          }
        ).catch(error => {
          console.log(error)
        })
      },
      submitData () {
        if (this.n === 0) {
          this.InitData()
        }
        if (this.n === 1) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/advanceSearchByMoneyAsc.do',
            data: this.dataList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
        if (this.n === 2) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/advanceSearchByMoneyDesc.do',
            data: this.dataList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
      },
      submitPageData () {
        if (this.n === 0) {
          this.InitPageData()
        }
        if (this.n === 1) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/asc.do',
            data: this.pageList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
        if (this.n === 2) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/desc.do',
            data: this.pageList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
      },
      submitDestData () {
        if (this.n === 0) {
          this.InitdestData()
        }
        if (this.n === 1) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/asc.do',
            data: this.destList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
        if (this.n === 2) {
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/product/desc.do',
            data: this.destList,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(resp => {
              this.produceList.splice(0)
              let data = resp.data
              for (let i = 0; i < data.length; i++) {
                this.produceList.push(data[i])
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .searchResults{
    width:750px;
  }
  header{
    width:100%;
    height:90px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    div{
      width:100px;
      height: 38px;
      line-height: 38px;
      img{
        width:38px;
        height:38px;
      }
    }
    p{
      width:200px;
      height: 38px;
      line-height: 38px;
      font-size: 36px;
      color: black;
    }
  }
  .content{
    position: relative;
    .sort{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 90px;
      li{
        width:120px;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
      }
      li.checked{
        color:#000;
        font-size: 30px;
        border-bottom:5px #f9de57 solid;
      }
    }
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
        .picture{
          position: relative;
          img{
            width: 190px;
            height: 190px;
          }
          .special{
            position: absolute;
            width: 100px;
            height: 30px;
            line-height: 30px;
            background-color: #ff332f;
            color: white;
            font-size: 20px;
            border-radius: 15px;
          }
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
          .location{
            width: 60%;
            height:50px;
            line-height: 50px;
            font-size: 30px;
            text-align: left;
            color: #ff8401;
            img{
              width: 25px;
              height: 25px;
            }
          }
          .comment{
            width:50%;
            height: 34px;
            line-height: 34px;
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
          }
        }
      }
    }
    .foot{
      width: 80px;
      height: 80px;
      position: fixed;
      bottom: 100px;
      right: 30px;
    }
  }
  .none{
    width: 100%;
    height: 300px;
    line-height: 300px;
    font-size: 38px;
    color: #ccc;
    display: none;
  }
</style>
