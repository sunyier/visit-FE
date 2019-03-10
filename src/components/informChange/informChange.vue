<template>
  <div class="informChange">
    <header>
      <div><img src="./img/left.png" width="19" height="19" @touchend="toBack"/></div>
      <p>编辑个人资料</p>
      <div></div>
    </header>
    <div class="content">
      <form class="change" id="myForm">
        <div class="name">
          <div class="name1">真实姓名</div>
          <input type="text" class="name2" name="userName" id="userName" placeholder="*请填写你的真实姓名" required="required" v-model="name[0]"/>
        </div>
        <div class="sex">
          <div class="sex1">性别</div>
          <div class="sex2">
            <div><input  type="radio" name ="userSex" id="sex1" value="男" v-model="sex[0]" :class="{'checked':judge}" checked/><img src="./img/man.png" width="50px" height="50px"/></div>
            <div><input  type="radio" name ="userSex" id="sex2" value="女" v-model="sex[0]" :class="{'checked':judge}"/><img src="./img/woman.png" width="50px" height="50px"/></div>
          </div>
        </div>
        <div class="time">
          <div class="time1">出生日期</div>
          <!--<input type="text" class="time2" ref="d" name="userBorn" id="userBorn" placeholder="*请输入你的真实生日 例：1998-02-10" required="required" v-model="born[0]"/>-->
          <input type="date" class="time2" name="userBorn" id="userBorn" v-model="born[0]"/>
        </div>
        <p class="hint"  v-show="ok">*请完善您的全部信息</p>
        <div class="blank"></div>
        <div class="save">
          <button type="button" value="Submit" @touchend="returnInform()">保存</button>
        </div>
      </form>
    </div>
    <img src="./img/imge.jpg" width="300" height="300" class="pic"/>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'informChange',
    data () {
      return {
        data1: [],
        name: [],
        sex: [],
        born: [],
        ok: false
      }
    },
    mounted: function () {
      this._initData()
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      toOrdermanagement: function () {
        this.$router.push({
          path: '/ordermanagement'
        })
      },
      _initData: function () {
        axios.get('http://60.205.208.7/Travel_Summer_war/user/alterPerson.do').then(resp => {
          let data = resp.data
          this.name.push(data.userName)
          this.born.push(data.userBorn)
          this.sex.push(data.userSex)
        }).catch(error => {
          console.log(error)
        })
      },
      returnInform: function () {
        if (this.name[0] === '' || this.sex[0] === '' || this.born[0] === '') {
          if (this.ok) {
            this.ok = true
          } else {
            this.ok = !this.ok
          }
        } else {
          let data1 = {'userName': this.name[0], 'userSex': this.sex[0], 'userBorn': this.born[0]}
          axios({
            method: 'post',
            url: 'http://60.205.208.7/Travel_Summer_war/user/savePerson.do',
            'Content-Type': 'application/json;charset=utf-8',
            data: data1
          }).then(
            this.$router.push({
              path: '/modify'
            })
          ).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .informChange{
    width: 750px;
  }
  header{
    width: 100%;
    height: 90px;
    align-items:center;
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom: 20px;

    div{
      text-align: left;
      padding-left: 20px;
      width: 150px;
      height: 38px;
    }

    p{
      text-align: center;
      line-height: 38px;
      font-size: 36px;
      color:black;
    }
  }
  .content{
    width: 750px;
  }
  input{
    border: none;
    padding: 0;
    border-top:1px #e4e4e4 solid ;
  }
  .change{
    margin-left: 6px;
    margin-right: 6px;
    text-align: left;
    font-size: 34px;
  }
  .name{
    justify-content: space-between;
    flex-wrap:wrap;
    display: flex;
    width:736px;
    height: 100px;
    border-top:1px #e4e4e4 solid;
    margin-bottom: 10px;
  }
  .name1{
    width:200px ;
    line-height: 100px;
    margin: 0;
  }
  .name2{
    width:536px;
    line-height: 100px;
    margin: 0;

  }
  .sex{
    justify-content: space-between;
    align-items: center;
    flex-wrap:wrap;
    display: flex;
    width:736px;
    border-top:1px #e4e4e4 solid;
    margin-bottom: 10px;
    .sex2{
      width: 536px;
      display: flex;
    }
    img{
      margin-right: 50px;
    }
    input{
      height: 80px;
    }
  }
  .time{
    justify-content: space-between;
    flex-wrap:wrap;
    display: flex;
    width:736px;
    border-top: 1px #e4e4e4 solid ;
    border-bottom: 1px #e4e4e4 solid;
    margin-bottom: 10px;
  }
  .time1{
    width:200px ;
    height: 100px;
    line-height:100px;
    /*border-top:1px #e4e4e4 solid;*/
    margin: 0;
  }
  .time2{
    width:536px;
    height: 100px;
    line-height: 100px;
    /*border-top:1px #e4e4e4 solid;*/
    margin: 0;
    background-color: white;
  }
  .save{
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    button {
      width: 91%;
      background-color: #f9de57;
      height: 90px;
      border-radius: 8px;
      font-size: 38px;
      border: none;
      margin: 0 auto;
      position: absolute;
    }
  }
  .blank{
    height: 100px;
  }
  .hint{
    width: 50%;
    font-size: 26px;
    color: #ff0000;
    margin: 0 auto;
    /*display: none;*/
  }
  input[type="date"]::-webkit-clear-button {
    display: none;
  }
  .pic{
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
