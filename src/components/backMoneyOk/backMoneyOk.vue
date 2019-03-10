<template>
  <div class="backMoneyOk">
    <!--头部-->
    <header>
      <div><img src="./img/left.png" class="img1" width="19" height="19" @touchend="toBack"/></div>
      <p>退款详情</p>
      <div></div>
    </header>
    <content>
      <div class="case1">
        <div class="text1"><img src="./img/happy.png" width="30" height="30"/><br>您的订单成功退款</div>
        <button class="backOrder" @touchend="toapp">重新预定</button>
      </div>
    </content>
  </div>
</template>

<script>
  export default {
    name: 'backMoneyOk',
    data () {
      return {}
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      toapp: function () {
        this.$router.push({
          path: '/searchResults'
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
    position: relative;
  }
  .case1{
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
