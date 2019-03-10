<template>
  <div class="phonechange">
    <div class="top">
      <img src="./img/jiantou.jpg" @touchend="tomodify"/>
      <span>修改绑定手机</span>
      <p></p>
    </div>
    <div class="cent">
      <span>设置新手机号</span>
      <input type="text" placeholder="新手机号" id="puitCentent2"
             ref="sos" v-model="phone[0]">
      <p id="puitCentent2-user">*请输入正确的电话!!!</p>
      <p id="p2"></p>
      <input type='submit' placeholder="确定" id="sub" @touchend="toBlock1()"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data1: [],
        phone: []
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
      toBlock1: function () {
        var reg = /^1[3456789]\d{9}$/
        let user_name = document.getElementById('puitCentent2-user')
        if (!reg.test(this.$refs.sos.value)) {
          user_name.style.display = 'block'
        }
        else {
          let data1 = {'userPhone': this.$refs.sos.value}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/savePhone.do',
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
        axios.get('http://60.205.208.7/Travel_Summer_war/user/alterPhone.do').then(resp => {
          let data = resp.data
          this.data1.push(data)
          this.phone.push(data.userPhone)
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
        margin-left: 30px;
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
      span{display:block;font-size:38px;margin-top:340px;}
      #puitCentent2{
        margin-top:100px;
        font-size:33px;
        width:670px;
        text-align:left;
      }
      #p2{height:2px;
        width:670px;
        background-color:#e6e6e6;
        margin-left:40px;
        display:block;}
    }
    #sub{width:670px;height:100px;line-height:100px;
      background-color:#ffe040;margin-top:150px;}
    #puitCentent2-user{
      color: red;
      position: absolute;
      display: none;
      font-size:20px;
      margin-top:10px;
      margin-left:40px;
    }
  }
</style>
