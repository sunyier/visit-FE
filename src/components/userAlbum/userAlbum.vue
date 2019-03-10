<template>
  <div class="userAlbum">
    <header>
      <div>
        <img src="./img/return.png" @touchend="toBack">
      </div>
      <p>用户相册</p>
      <div></div>
    </header>
    <div class="content">
      <div class="none" ref="show">--暂时还没有照片--</div>
      <div class="album" v-for="item in userAlbumList" :key="item.id">
        <p>{{item.date}}</p>
        <img v-for="item1 in item.urls" :key="item1.id" :src="item1">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'userAlbum',
    data () {
      return {
        userAlbumList: []
      }
    },
    mounted () {
      this.InitData()
    },
    methods: {
      toBack () {
        this.$router.back(-1)
      },
      InitData () {
        axios.get('http://60.205.208.7/Travel_Summer_war/comment/photo.do').then(resp => {
          let data = resp.data
          if (data.length) {
            this.$refs.show.style.display = 'none'
            for (let i = 0; i < data.length; i++) {
              this.userAlbumList.push(data[i])
            }
          } else {
            this.$refs.show.style.display = 'block'
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .advancedSearch{
    width:750px;
  }
  header{
    width:100%;
    height:90px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    background-color: white;
    position: fixed;
    img{
      width:38px;
      height:38px;
    }
    p{
      width:200px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 36px;
      color: black;
    }
    div{
      width:100px;
      height: 38px;
      line-height: 38px;
      font-size: 36px;
      color: black;
    }
  }
  .content {
    padding-top: 100px;
    .album{
      width: 100%;
      text-align: left;
      p{
        height: 80px;
        line-height: 80px;
        font-size: 36px;
        width: 300px;
        padding-left: 20px;
      }
      img{
        width: 200px;
        height: 200px;
        margin: 5px;
      }
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
