<template>
  <div class="modify">
    <div class="header">
      <img src="./img/jiantouz.jpg" @touchend="tosignin2()"/>
      用户信息
      <p></p>
    </div>
    <div class="portrait">
      <input id="pic" type="file" name="files" @change="handleFileChange" ref="inputer" capture="video"
             multiple accept="image/png,image/gif,image/jpeg"/>
      <label for="pic"><img :src="data2[0].userHead" id="img1"/></label>
      <button type="button" @touchend="submitData()">保存头像</button>
      <!--<img src="./img/head.png" id="img1"/>-->
      <!--<img :src="data2[0].userHead" id="img1"/>-->
      <p></p>
    </div>

    <div class="middle">
      <div @touchend="toname">昵称
        <span id="sp7">{{data2[0].userNickname}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="tomodify2()">
        性别
        <span id="sp1">{{data2[0].userSex}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="tomodify2()">
        生日
        <span id="sp10">{{data2[0].userBorn}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="tomodify2()">
        姓名
        <span id="sp3">{{data2[0].userName}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="change2()">
        手机号
        <span id="sp4">{{data2[0].userPhone}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="change3()">
        邮箱
        <span id="sp6">{{data2[0].userEmail}}</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div @touchend="change4()">
        登录密码
        <span id="sp5">修改</span>
        <img src="./img/jiantou.jpg"/>
      </div>
      <p></p>
      <div class="c1" @touchend="tosigninx()">
        删除账号
      </div>
    </div>
    <div class="tail" @touchend="tosignin()">退出登录</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data2: [],
        file: [],
        fileName: '',
        errText: ''
      }
    },
    mounted: function () {
      this.integral()
    },
    methods: {
      change2: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/alterPhone.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/phonechange'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      change3: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/alterEmail.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/emilechange'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      change4: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/alterPassword.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/password'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      tosignin: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/exitRegister.do').then(
          this.$router.push({
            path: '/signin'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      tosigninx: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/exitUser.do').then(
          this.$router.push({
            path: '/signin'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      tosignin2: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/myuser.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/signin2'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      integral: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/userList.do').then(resp => {
          let data = resp.data
          this.data2.push(data)
        }).catch(error => {
          console.log(error)
        })
      },
      change1: function () {
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/user/saveNickname.do',
          'contentType': 'application/json:charset=utf-8'
        }).then(
          this.$router.push({
            path: '/names'
          })
        ).catch(error => {
          console.log(error)
        })
      },
      handleFileChange (e) {
        if (typeof e.target === 'undefined') this.file = e[0]
        else this.file = e.target.files[0]
        this.errText = ''
        let size = Math.floor(this.file.size / 1024)
        if (size > 5120) {
          this.errText = `文件大小不能超过${this.sizeHumanRead}`
          return false
        }
        // 双向绑定
        this.$emit('input', this.file)
        if (this.autoUpload) this.uploadFile()
        this.onChange && this.onChange(this.file, this.file.name)
        this.$emit('onChange', this.file, this.file.name)
        this.imgPreview(this.file)
        this.fileName = this.file.name
      },
      imgPreview (file) {
        let self = this
        if (!file || !window.FileReader) return
        if (/^image/.test(file.type)) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = function () {
            self.dataUrl = this.result
          }
        }
      },
      submitData () {
        let formData = new FormData()
        formData.append('files', this.file)
        axios({
          method: 'post',
          url: 'http://172.20.10.9：80/user/saveHead.do',
          data: formData
        }).then(
          // this.$router.push({
          //   path: '/signin2'
          // })
        ).catch(error => {
          console.log(error)
        })
      },
      tomodify2: function () {
        this.$router.push({
          path: '/informChange'
        })
      },
      toname: function () {
        this.$router.push({
          path: '/names'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modify{width:750px;}
  .header {
    font-size: 32px;
    height: 100px;
    line-height: 98px;
    text-align: left;
    img {
      width: 25px;
      height: 34px;
      margin-left:30px;
      margin-right:246px;
    }
    p{
      width:750px;height:2px;background-color:#e6e6e6;
    }

  }
  .portrait{
    font-size:32px;
    height:132px;
    line-height:130px;
    text-align:left;
    margin-left:40px;
    margin-right:40px;
    position: relative;
    input {
      position: absolute;
      left: -9999px;
    }
    #img1{
      position:absolute;
      top:14px;
      width:102px;
      height:102px;
      border-radius:50%;

    }
    #img2{
      width:25px;
      height:32px;
      margin-left:15px;
    }
    p{
      width:670px;
      height:2px;
      background-color:#e6e6e6;
    }
    button{
      margin-left:510px;
      outline:none;
      font-size:32px;
      width:150px;
      height:50px;
      background-color:#ffe253;
    }
  }
  .middle {
    margin-left: 40px;
    margin-right: 40px;
    position: relative;
    div {
      height: 90px;
      font-size: 32px;
      line-height: 90px;
      text-align: left;
      p{width:128px;}
    }
    img {
      position: absolute;
      width: 25px;
      height: 32px;
      margin-top: 29px;
      right: 0;
    }
    span {
      text-align: right;
      display: inline-block;
      width: 350px;
      color: #a7a7a7;
    }
    #sp1{margin-left:214px;}
    #sp3{margin-left:214px;}
    #sp4{margin-left:182px;}
    #sp5{margin-left:150px;}
    #sp6{margin-left:214px;}
    #sp7{margin-left:214px;}
    #sp10{margin-left:214px;}
  }
  .tail{
    width:670px;
    height:100px;
    background-color:#ffe253;
    margin-left:40px;
    font-size:32px;
    line-height:100px;
    margin-top:140px;
  }
  p{width:670px;height:2px;background-color:#e6e6e6;}
  .photo{
    position: relative;
    input {
      position: absolute;
      left: -9999px;
    }
    /* 使label充满整个box*/
    label {
      position: absolute;
      top: 0;left: 0;right: 0;bottom: 0;
      z-index: 10;
      width:102px;
      height:102px;
      /*margin-left:382px;*/
      border-radius:50%;
    }}

</style>
