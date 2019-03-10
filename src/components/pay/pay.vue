<template>
  <div class="pay">
    <header>
      <div><img src="./img/left.png" width="19" height="19" @touchend="toBack"/></div>
      <p>支付详情</p>
      <div></div>
    </header>
    <div class="content">
      <div class="ok">
        <div><img src="./img/ok.png" width="60" height="60"/>支付成功</div>
        <button @touchend="toOrder">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay',
    data () {
      return {
      }
    },
    methods: {
      toBack: function () {
        this.$router.back(-1)
      },
      toOrder: function () {
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
  .pay{
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
      padding-top: 50px;
      line-height: 38px;
      font-size: 36px;
      color:black;
    }
  }
  .content{
    width: 750px;
    position: relative;
  }
  .ok{
    width: 478px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;top:400px;left: 136px;right: 136px;
    div{
      width: 80%;
      border: 2px #d8d8d8 solid;
      border-radius: 12px;
      font-size: 50px;
      box-sizing:border-box;
      padding: 20px;
      margin-bottom: 100px;
    }
    button{
      width: 91%;
      background-color: #f9de57;
      height: 90px;
      border-radius: 8px;
      font-size: 38px;
      border: none;
      margin: 0 auto;
    }
  }
</style>
