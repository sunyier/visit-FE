<template>
  <div class="phone">
    <div class="head">
      <span id="s1">拾叁旅行欢迎您</span>
      <span id="s2" @touchend="tosignin">取消</span>
    </div>
    <div id="box">
      <ul>
        <li v-on:touchend="qh(true)" class="li1" >账号登录</li>
        <li v-on:touchend="qh(false)" class="li2">短信验证码登录</li>
        <p id="p1"></p>
      </ul>
      <div class="content" v-if="temp">
        <li id="li3"></li>
        <span>账号
        <input type="text" placeholder="手机号" id="puitCentent1" ref="sos1"
               @blur="toBlock1()"/>
      </span>
        <p id="puitCentent1-user">*电话号码格式不正确</p>
        <p id="puit1-user">*账号不存在</p>
        <p></p>
        <span>密码
        <input type="text" v-if="pwdType" v-model="eyetxt" id="puitCentent2" ref="sos2">
        <input type="password" v-model="eyetxt" v-else id="puitCentent2-1" ref="sos2">
        <img :src="seen?seenimg:unseenimg" @touchend="changeType()"/>
      </span>
        <p id="puit2-user">*密码错误</p>
        <p></p>
        <div class="sign" @touchend="toBlock2()">登录</div>
        <div class="enroll" @touchend="toregister">手机快速注册</div>
      </div>
      <div class="content2" v-if="!temp">
        <li id="li4"></li>
        <span class="sp">手机号
        <input type="text" placeholder="输入手机号" id="puitCentent3" ref="sos3"
               @blur="toBlock3()"/>
      </span>
        <p id="puitCentent3-user">*电话号码格式不正确</p>
        <p id="puit3-user">*账号不存在</p>
        <p></p>
        <span class="sp">短信验证码
        <input type="text" id="puitCentent4" ref="sos4">
        <span v-show="sendAuthCode" class="auth_text auth_text_blue"
              @touchend="toBlock4()">获取验证码</span>
        <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">
      {{auth_time}} </span> 秒后重新发送</span>
      </span>
        <p id="puit4-user">*验证码错误</p>
        <p></p>
        <div class="sign" @touchend="toBlock5()">登录</div>
        <div class="enroll" @touchend="toregister">手机快速注册</div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'phone',
    data () {
      return {
        seen: '',
        unseenimg: require('./img/hide.png'),
        seenimg: require('./img/hide2.png'),
        eyetxt: '',
        pwdType: false,
        temp: true,
        sendAuthCode: true,
        auth_time: 0,
        data1: [],
        data2: [],
        data3: [],
        data4: []
      }
    },
    methods: {
      changeType: function () {
        this.seen = !this.seen
        this.pwdType = !this.pwdType
      },
      qh: function (t) {
        console.log(t)
        this.temp = t
      },
      tosignin: function () {
        this.$router.push({
          path: '/signin'
        })
      },
      toregister: function () {
        this.$router.push({
          path: '/register'
        })
      },
      toBlock1: function () {
        var reg1 = /^1[3456789]\d{9}$/
        let user_name1 = document.getElementById('puitCentent1-user')
        if (!reg1.test(this.$refs.sos1.value)) {
          user_name1.style.display = 'block'
        }
        else {
          user_name1.style.display = 'none'
          let data1 = {'userPhone': this.$refs.sos1.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/userPhoneregister.do',
            data: data1,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            if(resp.data === 1) {
              let user1_name1 = document.getElementById('puit1-user')
              user1_name1.style.display = 'block'
            } else {
              user1_name1.style.display = 'none'
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      toBlock2: function () {
        var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        let user_name2 = document.getElementById('puit2-user')
        if(!reg2.test(this.$refs.sos2.value)) {
          user_name2.style.display = 'block'
        } else {
          let data2 = {'userPhone': this.$refs.sos1.value, 'userPassword': this.$refs.sos2.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/verify.do',
            data: data2,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            if(resp.data === 0) {
              let user_name2 = document.getElementById('puit2-user')
              user_name2.style.display = 'block'
            } else {
              this.$router.push({
                path: '/signin2'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      toBlock3: function () {
        var reg3 = /^1[3456789]\d{9}$/
        let user_name3 = document.getElementById('puitCentent3-user')
        if (!reg3.test(this.$refs.sos3.value)) {
          user_name3.style.display = 'block'
        } else {
          user_name3.style.display = 'none'
          let data3 = {'userPhone': this.$refs.sos3.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/userPhoneregister.do',
            data: data3,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            let user3_name3 = document.getElementById('puit3-user')
            if (resp.data === 1) {
              user3_name3.style.display = 'block'
            } else {
              user3_name3.style.display = 'none'
            }
          }).catch(error => {
            console.log(error)
          })
        }

      },
      toBlock4: function () {
        let user3_name3 = document.getElementById('puitCentent3-user')
        if(user3_name3.style.display = 'none') {
          let data3 = {'userPhone': this.$refs.sos3.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/sendmessage.do',
            data: data3,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            this.sendAuthCode = false
            this.auth_time = 60
            var auth_timetimer = setInterval(() => {
              this.auth_time--
              if (this.auth_time <= 0) {
                this.sendAuthCode = true
                clearInterval(auth_timetimer)
              }
            }, 1000)
            let data = resp.data
            this.data4.push(data.code)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      toBlock5: function () {
        let user_name4 = document.getElementById('puitCentent4-user')
        if(this.data4[0] !== this.$refs.sos4.value) {
          user_name4.style.display = 'block'
        } else {
          let data6 = {'userPhone': this.$refs.sos3.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/messagelogin.do',
            data: data6,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            this.$router.push({
              path: '/signin2'
            })
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .phone{width:750px;}
  .head{
    font-size:32px;margin-top:37px;text-align:left;
    #s1{margin-left:266px;}
    #s2{margin-left:130px;}
  }

  #box{
    font-size:30px;margin-top:60px;text-align:left;
    .li1{margin-left:125px;width:120px;display:inline-block;}
    .li2{margin-left:203px;width:210px;
      display: inline-block;}
    /*#p1{width:240px;height:6px;background-color:#ffe24c;margin-top:28px;}*/
    #p1{width:750px;height:2px;background-color:#e6e6e6;}
  }

  .content{
    margin-left:42px;margin-right:42px;
    #li3{width:240px;height:6px;background-color:#ffe24c;
      margin-left:30px; }
    span{width:666px;height:120px;font-size:32px;line-height:120px;text-align:left;
      display:inline-block}
    input{margin-left:55px;width:400px;}
    img {
      width: 44px;
      height: 44px;
      margin-left:50px;
    }
    p{width:666px;height:2px;background-color:#e6e6e6;}
    .sign{width:666px;height:100px;background-color:#ffe24c;
      font-size:30px;margin-top:122px;line-height:100px;text-align:center;}
    .enroll{width:666px;height:98px;border:1px #000 solid;background-color:#fff;
      margin-top:304px;line-height:98px;text-align:center;}
    #puit1-user,#puitCentent1-user,#puit2-user{
      color: red;
      display: none;
      font-size:20px;
      margin-left:40px;
    }
  }
  .content2{
    margin-left:42px;margin-right:42px;
    #li4{width:240px;height:6px;background-color:#ffe24c;margin-left:400px;}
    .sp{width:666px;height:120px;font-size:32px;line-height:120px;text-align:left;
      display:inline-block}
    input{width:202px;}
    .auth_text{display:inline-block;line-height:70px;
      width:260px;height:70px;background-color:#ffe14d;text-align:center;}
    p{width:666px;height:2px;background-color:#e6e6e6;}
    .sign{width:666px;height:100px;background-color:#ffe24c;
      font-size:30px;margin-top:122px;line-height:100px;text-align:center;}
    .enroll{width:666px;height:98px;border:1px #000 solid;background-color:#fff;
      margin-top:304px;line-height:98px;text-align:center;}
    #puitCentent3-user,#puit3-user,#puit4-user{
      color: red;
      display: none;
      font-size:20px;
      margin-left:40px;
    }
  }

</style>
