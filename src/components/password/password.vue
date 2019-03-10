<template>
  <div class="phonechange">
    <div class="top">
      <img src="./img/jiantou.jpg" @touchend="tomodify"/>
      <span>修改密码</span>
      <p></p>
    </div>
    <div class="cent">
      <span>原密码:
      <input type="password" placeholder="输入原密码" id="puitCentent" ref="sos">
      <p class="p2"></p></span>
      <p id="puitCentent-user">*密码错误</p>
      <span>新密码:
      <input type="password" placeholder="6-21位数字或字母" id="puitCentent1" ref="sos1">
      <p class="p2"></p></span>
      <p id="puitCentent1-user">*密码格式不正确</p>
      <span>确认密码:
      <input type="password" id="puitCentent2" ref="sos2">
      <p class="p2"></p></span>
      <p id="puitCentent2-user">*两次密码不同</p>
      <input type='submit' placeholder="确定" id="sub" @touchend="toBlock()"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data1: [],
        data2: []
      }
    },
    methods: {
      tomodify: function () {
        this.$router.push({
          path: '/modify'
        })
      },
      toBlock: function () {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        let user_name1 = document.getElementById('puitCentent1-user')
        let user_name2 = document.getElementById('puitCentent2-user')
        if (!reg.test(this.$refs.sos1.value)) {
          user_name1.style.display = 'block'
        } else {
          if (this.$refs.sos1.value !== this.$refs.sos2.value) {
            user_name2.style.display = 'block'
          } else {
            let data1 = {'oldpassword': this.$refs.sos.value,
              'newpassword': this.$refs.sos1.value}
            axios({
              method: 'post',
              url: 'http://60.205.208.7/Travel_Summer_war/user/savePassword.do',
              data: data1,
              'contentType': 'application/json:charset=utf-8'
            }).then(resp => {
              if(resp.data === 1) {
                this.$router.push({
                  path: '/modify'
                })
              } else {
                let user_name = document.getElementById('puitCentent-user')
                user_name.style.display = 'block'
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }
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
      span {
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
      margin-top:400px;text-align:left;
      span{font-size:33px;
        display:inline-block;
        margin-left:40px;
        margin-top:50px;}
      #puitCentent,#puitCentent1,#puitCentent2{
        font-size:33px;
        text-align:left;
      }
      .p2{height:2px;
        width:670px;
        background-color:#e6e6e6;
        margin-left:40px;
        display:block;}
    }
    #sub{width:670px;height:100px;line-height:100px;
      background-color:#ffe040;margin-top:150px;margin-left:40px;}
    #puitCentent-user ,#puitCentent1-user,#puitCentent2-user{
      color: red;
      position: absolute;
      display: none;
      font-size:20px;
      margin-top:10px;
      margin-left:40px;
    }
  }
</style>

