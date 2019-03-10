<template>
  <div class="phonechange">
    <div class="top">
      <img src="./img/jiantou.jpg" @touchend="tomodify"/>
      <span id="sp1">修改昵称</span>
      <p></p>
    </div>
    <div class="cent">
      <span>设置昵称</span>
      <input type="text" placeholder="3-10位，支持字母、数字、_或汉字"
             ref="sos1" v-model="name[0]"/>
      <p></p>
      <span id="puitCentent-user">*昵称格式不正确</span>
      <button type="button" @touchend="submission()">确定</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'phonechange',
    data () {
      return{
        data1: [],
        name: []
      }
    },
    mounted: function () {
      this.integral()
    },
    methods: {
      tomodify: function () {
        this.$router.push({
          path: '/modify'
        })
      },
      submission: function () {
        var reg = /^[\u4e00-\u9fff\w]{3,10}$/
        let user_name = document.getElementById('puitCentent-user')
        if (!reg.test(this.$refs.sos1.value)) {
          user_name.style.display = 'block'
        }
        else {
          let data1 = {'userNickname': this.$refs.sos1.value}
          axios({
            method: 'post',
            url: 'http://172.20.10.9：80/user/saveNickname.do',
            data: data1,
            'contentType': 'application/json:charset=utf-8'
          }).then(
            this.$router.push({
              path: '/modify'
            })
          ).catch(error => {
            console.log(error)
          })
        }
      },
      integral: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/alterNickname.do').then(resp => {
          let data = resp.data
          this.data1.push(data)
          this.name.push(data.userNickname)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phonechange {width:750px;
    .top {
      position: fixed;
      top: 30px;
      width: 750px;
      height: 68px;
      line-height: 68px;
      text-align: left;
      img {
        width: 25px;
        height: 45px;
        margin-left: 40px;
      }
      #sp1 {
        font-size: 33px;
        margin-left: 235px;
      }
      p {
        width: 750px;
        height: 2px;
        background-color: #e6e6e6;
      }
    }
    .cent{
      span{display:block;font-size:38px;margin-top:340px;}
      input{
        margin-top:100px;
        font-size:33px;
        width:670px;
        text-align:left;
      }
      p{height:2px;
        width:670px;
        background-color:#e6e6e6;
        margin-left:40px;
        display:block;}
    }
    button{width:670px;height:100px;line-height:100px;
      background-color:#ffe040;margin-top:150px;}
    #puitCentent-user{
      color: red;
      display: none;
      font-size:20px;
      margin-top:20px;
      margin-left:40px;
      text-align:left;
    }
    #sp2{
      font-size:33px;
      margin-top:20px;
      margin-left:40px;
      text-align:left;
    }
  }
</style>
