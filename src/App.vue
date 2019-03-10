<template>
  <div id="app">
    <!--< img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{
    padding: 0;
    margin: 0;
  }
  ul,li{
    list-style: none;
  }
  input,button{
    /*border: none;*/
    margin: 0;
    padding: 0;
  }
  input,select,option,textarea{
    outline: none;
  }
  header {
    background-color: white;
    letter-spacing: 4px;
  }
  .content {
    width: 93%;
    margin: 0 auto;
  }
  p, h1, h2, h3, h4, h5, h6, ul, ol, dl, li, form, table {
    margin: 0;
    padding: 0;
  }
  a, img, input, button {
    border: none;
  }
  img {
    border: 0;
  }
  i, em {
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: #000000;
    border: 0;
  }
</style>
