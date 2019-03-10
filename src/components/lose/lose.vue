<template>
  <div class="backMoneyNo">
    <!--头部-->
    <header>
      <div><img src="./img/left.png" class="img1" width="19" height="19" @touchend="toBack"/></div>
      <p>退款详情</p>
      <div></div>
    </header>
    <content>
      <div class="case2">
        <div class="text2"><img src="./img/said.png" width="30" height="30"/><br>对不起<br>您的订单已失效</div>
        <button class="backHome" @touchend="toOrdermanagement">返回我的订单</button>
      </div>
    </content>
  </div>
</template>

<script>
  export default {
    name: 'backMoneyNo',
    data () {
      return {}
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      toOrdermanagement: function () {
        this.$router.push({
          path: '/ordermanagement'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .backMoney{
    width: 750px;
  }
  header{
    width: 100%;
    height: 90px;
    align-items:center;
    display: flex;
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
    position: relative;
  }
  .case2{
    width: 478px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: absolute;top:400px;left: 136px;right: 136px;
    div{
      border: 2px #d8d8d8 solid;
      border-radius: 12px;
      font-size: 34px;
      box-sizing:border-box;
      padding: 20px;
      margin-bottom: 30px;
    }
    button{
      width: 100%;
      background-color: #f9de57;
      height: 90px;
      border-radius: 8px;
      font-size: 38px;
      border: none;
    }
  }
</style>
