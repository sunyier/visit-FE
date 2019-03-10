<template>
  <div class="register">
    <div class="one">
      <span>手机快速注册</span>
      <img src="./img/jiantou.jpg" @touchend="tophone"/>
    </div>
    <p id="p1"></p>
    <div class="two">手机号
      <input type="text" placeholder="请输入手机号" id="puitCentent1" ref="sos1"
             @blur="toBlock1()"/>
      <p id="puitCentent1-user">*电话号码格式不正确</p>
      <p id="puit1-user">*该电话号已被注册过</p>
      <p></p>
    </div>
    <div class="three">短信验证码
      <input type="text" id="puitCentent2" ref="sos2" @blur="toBlock3()"/>
      <button v-show="sendAuthCode" class="auth_text auth_text_blue"
            @touchend="toBlock2()">获取验证码</button>
      <span v-show="!sendAuthCode"class="auth_text"> <span class="auth_text_blue">
       {{auth_time}} </span> 秒后重新发送</span>
      <p></p>
      <p id="puitCentent2-user">*验证码输入错误</p>
    </div>
    <div class="four">密码
      <input type="text" placeholder="6-21位数字或字母"
             v-if="pwdType" v-model="eyetxt"  id="puitCentent3" ref="sos3"/>
      <input type="password" placeholder="6-21位数字或字母"
             v-model="eyetxt" v-else id="puitCentent3-1" ref="sos3"/>
      <img :src="seen?seenimg:unseenimg" @touchend="changeType()"/>
      <p></p>
      <p id="puitCentent3-user">*密码格式不正确</p>
    </div>
    <div class="five">确认密码
      <input type="text"
             v-if="pwdType2" v-model="eyetxt2" id="puitCentent4" ref="sos4">
      <input type="password"
             v-model="eyetxt2" v-else id="puitCentent4-1" ref="sos4">
      <img :src="seen2?seenimg2:unseenimg2" @touchend="changeType2()"/>
      <p></p>
      <p id="puitCentent4-user">*两次密码不同</p>
    </div>
    <input type="submit" value="完成注册，进入拾叁" class="ipt" @touchend="toBlock4()"/>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        sendAuthCode: true,
        auth_time: 0,
        seen: '',
        seen2: '',
        unseenimg: require('./img/hide.png'),
        seenimg: require('./img/hide2.png'),
        unseenimg2: require('./img/hide.png'),
        seenimg2: require('./img/hide2.png'),
        eyetxt: '',
        pwdType: false,
        temp: true,
        eyetxt2: '',
        pwdType2: false,
        temp2: true,
        data1: [],
        data2: [],
        data3: []
      }
    },
    methods: {

      toBlock1: function () {
        var reg1 = /^1[3456789]\d{9}$/
        let user_name1 = document.getElementById('puitCentent1-user')
        if (!reg1.test(this.$refs.sos1.value)) {
          user_name1.style.display = 'block'
        } else {
          user_name1.style.display = 'none'
          let data1 = {'userPhone': this.$refs.sos1.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/userPhoneregister.do',
            data: data1,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            let user1_name1 = document.getElementById('puit1-user')
            if (resp.data === 0) {
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
        let user1_name1 = document.getElementById('puit1-user')
        let user_name2 = document.getElementById('puitCentent2-user')
        if (user1_name1.style.display = 'none') {
          let data1 = {'userPhone': this.$refs.sos1.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/sendmessage.do',
            data: data1,
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
            this.data2.push(data.code)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      toBlock3: function () {
        let user_name2 = document.getElementById('puitCentent2-user')
        if (this.data2[0] !== this.$refs.sos2.value) {
          user_name2.style.display = 'block'
        } else {
          user_name2.style.display = 'none'
        }
      },
      toBlock4: function () {
        var reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        let user_name3 = document.getElementById('puitCentent3-user')
        let user_name4 = document.getElementById('puitCentent4-user')
        if(!reg3.test(this.$refs.sos3.value)) {
          user_name3.style.display = 'block'
        }
        else {
          user_name3.style.display = 'none'
        }
        if (this.$refs.sos3.value !== this.$refs.sos4.value) {
          user_name4.style.display = 'block'
        }
        else {
          user_name4.style.display = 'none'
        }
        if ((this.data2[0] === this.$refs.sos2.value) && (reg3.test(this.$refs.sos3.value)) && (this.$refs.sos3.value === this.$refs.sos4.value)) {
          let data3 = {'userPhone': this.$refs.sos1.value,
            'userpassword': this.$refs.sos3.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/userregister.do',
            data: data3,
            'contentType': 'application/json:charset=utf-8'
          }).then(resp => {
            this.$router.push({
              path: '/phone'
            })
          }).catch(error => {
            console.log(error)
          })
        }
      },
      changeType: function () {
        this.seen = !this.seen
        this.pwdType = !this.pwdType
      },
      changeType2: function () {
        this.seen2 = !this.seen2
        this.pwdType2 = !this.pwdType2
      },
      tophone: function () {
        this.$router.push({
          path: '/phone'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .register{width:750px;position:relative;
    #app{display:inline-block;margin-top:0;}
    .one {height:100px;
      img{width:25px;height:40px;position:absolute;top:6px;left:30px;
        padding-top: 20px;}
      span{font-size:34px;display:inline-block;margin-top:6px;
        padding-top: 20px;}
    }
    #p1{height:2px;background-color:#e6e6e6;}
    .two,.four,.five{
      height:120px;width:750px;font-size:30px;margin-left:40px;
      display:inline-block;line-height:120px;text-align:left;
      input{margin-left:95px;font-size:30px;}
      p{width:670px;height:2px;background-color:#e6e6e6;}
    }
    .three {
      height:120px;width:750px;font-size:30px;margin-left:40px;
      display:inline-block;line-height:120px;text-align:left;
      input{width:270px;}
      .auth_text{display:inline-block;width:240px;height:70px;background-color:#ffe251;
        text-align:center;line-height:70px;}
      p{width:670px;height:2px;background-color:#e6e6e6;}
    }
    .four,.five {
      img {
        width: 44px;
        height: 44px;
        margin-left:45px;
      }
    }
    .five input{margin-left:35px;}
    .ipt{width:670px;height:100px;margin-top:120px;background-color:#ffe251;
      line-height:100px;font-size:33px;}
  }
  #puitCentent1-user,#puitCentent2-user,
  #puitCentent3-user,#puitCentent4-user,#puit1-user{
    color: red;
    display: none;
    font-size:20px;
    margin-left:40px;
  }
</style>
