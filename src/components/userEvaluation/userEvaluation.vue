<template>
  <div class="userEvaluation">
    <header>
      <div>
        <img src="./img/return.png" @touchend="toBack">
      </div>
      <p>评价晒单</p>
      <div></div>
    </header>
    <form class="content" action="http://192.168.43.29:8080/comment/commentOk.do" method="post" name="myform" enctype="multipart/form-data">
      <p class="score">产品评分</p>
      <div class="level">
        <div>
          <input id="commentScore1" type="radio" name="commentScore" value="1" v-model="score"/>
          <label for="commentScore1">差</label>
        </div>
        <div>
          <input id="commentScore2" type="radio" name="commentScore" value="2" v-model="score"/>
          <label for="commentScore2">一般</label>
        </div>
        <div>
          <input id="commentScore3" type="radio" name="commentScore" value="3" v-model="score"/>
          <label for="commentScore3">满意</label>
        </div>
        <div>
          <input id="commentScore4" type="radio" name="commentScore" value="4" v-model="score"/>
          <label for="commentScore4">很好</label>
        </div>
        <div>
          <input id="commentScore5" type="radio" name="commentScore" value="5" v-model="score"/>
          <label for="commentScore5">完美</label>
        </div>
      </div>
      <div class="comment">
        <textarea name="commentContent" title="comment" style="width:100%; height:200px" placeholder="您的评价是对我们最大的支持哦！"
                  v-model="content"></textarea>
        <div class="photo">
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" ref="photo"/>
          <label for="upload_file"><img src="./img/photo.png"></label>
          <div class="add-img" v-show="imgList.length">
            <p class="font14">图片(最多6张，还可上传<span v-text="6-imgList.length"></span>张)</p>
            <ul class="img-list">
              <li v-for="(url,index) in imgList" :key="url.id">
                <img class="del" @click.stop="delImg(index)"/>
                <img :src="url.file.src">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="details">
        <div class="prompt">
          <img src="./img/comment.png">服务评价
        </div>
        <div class="message">
          <span>行程安排</span>
          <div class="sch">
            <div>
              <input id="commentScheduling1" type="radio" name="commentScheduling" value="1" v-model="scheduling"/>
              <label for="commentScheduling1">差</label>
            </div>
            <div>
              <input id="commentScheduling2" type="radio" name="commentScheduling" value="2" v-model="scheduling"/>
              <label for="commentScheduling2">一般</label>
            </div>
            <div>
              <input id="commentScheduling3" type="radio" name="commentScheduling" value="3" v-model="scheduling"/>
              <label for="commentScheduling3">满意</label>
            </div>
            <div>
              <input id="commentScheduling4" type="radio" name="commentScheduling" value="4" v-model="scheduling"/>
              <label for="commentScheduling4">很好</label>
            </div>
            <div>
              <input id="commentScheduling5" type="radio" name="commentScheduling" value="5" v-model="scheduling"/>
              <label for="commentScheduling5">完美</label>
            </div>
          </div>
          <span>描述相符</span>
          <div class="sch">
            <div>
              <input id="commentDescribe1" type="radio" name="commentDescribe" value="1" v-model="describe"/>
              <label for="commentDescribe1">差</label>
            </div>
            <div>
              <input id="commentDescribe2" type="radio" name="commentDescribe" value="2" v-model="describe"/>
              <label for="commentDescribe2">一般</label>
            </div>
            <div>
              <input id="commentDescribe3" type="radio" name="commentDescribe" value="3" v-model="describe"/>
              <label for="commentDescribe3">满意</label>
            </div>
            <div>
              <input id="commentDescribe4" type="radio" name="commentDescribe" value="4" v-model="describe"/>
              <label for="commentDescribe4">很好</label>
            </div>
            <div>
              <input id="commentDescribe5" type="radio" name="commentDescribe" value="5" v-model="describe"/>
              <label for="commentDescribe5">完美</label>
            </div>
          </div>
          <span>导游讲解</span>
          <div class="sch">
            <div>
              <input id="commentExplain1" type="radio" name="commentExplain" value="1" v-model="explain"/>
              <label for="commentExplain1">差</label>
            </div>
            <div>
              <input id="commentExplain2" type="radio" name="commentExplain" value="2" v-model="explain"/>
              <label for="commentExplain2">一般</label>
            </div>
            <div>
              <input id="commentExplain3" type="radio" name="commentExplain" value="3" v-model="explain"/>
              <label for="commentExplain3">满意</label>
            </div>
            <div>
              <input id="commentExplain4" type="radio" name="commentExplain" value="4" v-model="explain"/>
              <label for="commentExplain4">很好</label>
            </div>
            <div>
              <input id="commentExplain5" type="radio" name="commentExplain" value="5" v-model="explain"/>
              <label for="commentExplain5">完美</label>
            </div>
          </div>
        </div>
      </div>
      <button type="button" value="Submit" @touchend="submitData">提交</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'userEvaluation',
    data () {
      return {
        items: ['行程安排', '描述相符', '导游讲解'],
        dataUrl: require('./img/photo.png'),
        select: ['很差', '差', '一般', '满意', '完美'],
        n: -1,
        score: '',
        content: '',
        scheduling: '',
        describe: '',
        explain: '',
        showFace: false,
        imgList: [],
        size: 0,
        limit: 6,
        tempImgs: [],
        id: ''
      }
    },
    mounted () {
      this.receiveData()
    },
    methods: {
      chooseType () {
        document.getElementById('upload_file').click()
      },
      fileChange (el) {
        if (!el.target.files[0].size) return
        this.fileList(el.target)
        el.target.value = ''
      },
      fileList (fileList) {
        let files = fileList.files
        for (let i = 0; i < files.length; i++) {
          // 判断是否为文件夹
          if (files[i].type !== '') {
            this.fileAdd(files[i])
          } else {
            // 文件夹处理
            this.folders(fileList.items[i])
          }
        }
      },
      // 文件夹处理
      folders (files) {
        let _this = this
        // 判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry()
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i])
            } else {
              _this.folders(file[i])
            }
          }
        })
      },
      foldersAdd (entry) {
        let _this = this
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd (file) {
        if (this.limit !== undefined) this.limit--
        if (this.limit !== undefined && this.limit < 0) return
        // 总大小
        this.size = this.size + file.size
        // 判断是否为图片文件
        if (file.type.indexOf('image') === -1) {
          this.$dialog.toast({mes: '请选择图片文件'})
        } else {
          let reader = new FileReader()
          let image = new Image()
          let _this = this
          reader.readAsDataURL(file)
          reader.onload = function () {
            file.src = this.result
            image.onload = function () {
              let width = image.width
              let height = image.height
              file.width = width
              file.height = height
              _this.imgList.push({
                file
              })
              console.log(_this.imgList)
            }
            image.src = file.src
          }
        }
      },
      delImg (index) {
        this.size = this.size - this.imgList[index].file.size
        // 总大小
        this.imgList.splice(index, 1)
        if (this.limit !== undefined) this.limit = 6 - this.imgList.length
      },
      toBack () {
        this.$router.back(-1)
      },
      receiveData () {
        let orderId = this.$route.query.orderId
        this.id = orderId
      },
      submitData () {
        let formData = new FormData()
        formData.append('commentScore', this.score)
        formData.append('commentContent', this.content)
        formData.append('commentScheduling', this.scheduling)
        formData.append('commentDescribe', this.describe)
        formData.append('commentExplain', this.explain)
        formData.append('commentOrderid', this.id)
        for (let i = 0; i < this.imgList.length; i++) {
          formData.append('files', this.imgList[i].file)
        }
        axios({
          method: 'post',
          url: 'http://60.205.208.7/Travel_Summer_war/comment/commentOk.do',
          data: formData,
          headers: {

          }
        }).then(
          this.$router.push({
            path: '/ordermanagement'
          })
        ).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userEvaluation{
    width: 750px;
  }
  header{
    width:100%;
    height:90px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    img{
      width:38px;
      height:38px;
    }
    p{
      width:200px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 36px;
      color: black;
    }
    div{
      width:100px;
      height: 38px;
      line-height: 38px;
      font-size: 36px;
      color: black;
    }
  }
  .content{
    .score{
      font-size: 38px;
      line-height: 50px;
      height: 50px;
      width: 85%;
      margin: 0 auto;
      text-align: left;
    }
    .level{
      width: 90%;
      margin: 0 auto;
      height: 130px;
      font-size: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div{
        position: relative;
        line-height: 30px;
        input[type="radio"] {
          width: 100px;
          height: 50px;
          opacity: 0;
        }
        label{
          position: absolute;
          left: 5px;
          top: 3px;
          width: 100px;
          height: 50px;
          line-height: 50px;
          border-radius: 10px;
          border: 1px solid #999;
        }
        input:checked+label {
          background-color: #f9de57;
          border: 1px solid #f9de57;
        }
      }
    }
    .comment{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      textarea{
        background-color: #f9f9f9;
        font-size: 34px;
        line-height: 40px;
        width: 100%;
        border: none;
      }
      img{
        width: 150px;
        height: 150px;
      }
      .photo{
        width: 100%;
        .app-bg >>>img{
          width: 100%;
          height: 100%;
          -webkit-transform: scale(1.03);
          -moz-transform: scale(1.03);
          -ms-transform: scale(1.03);
          -o-transform: scale(1.03);
          transform: scale(1.03);
        }
        .add-img {
          width: 100%;
          padding: 10px;
          p{
            color: #5d585f;
          }
        }
        .add-image {
          padding-top: 15px;
          margin-left: 10px;
          width: 80px;
          top: 20px;
          height: 80px;
          border: 1px dashed rgba(0, 0, 0, .2);
        }
        /*九宫格*/
        .img-list {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          li {
            width: 32%;
            text-align: center;
            margin-left: 1%;
            margin-top: 1%;
            position: relative;
          }
        }
        .del {
          position: absolute;
          top: 0;
          right: 35px;
          z-index: 999
        }
      }
    }
    .details{
      .prompt{
        font-size: 42px;
        width:40%;
        height: 100px;
        display: flex;
        align-items: center;
        letter-spacing: 4px;
        img{
          width: 40px;
          height: 40px;
          margin-right: 30px;
        }
      }
      .message{
        width: 90%;
        margin: 0 auto;
        font-size: 34px;
        display: flex;
        height: 200px;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        .sch{
          display: flex;
          width: 75%;
          justify-content: space-around;
          align-items: center;
          font-size: 28px;
          div{
            position: relative;
            line-height: 30px;
            input[type="radio"] {
              width: 80px;
              height: 40px;
              opacity: 0;
            }
            label{
              position: absolute;
              left: 5px;
              top: 3px;
              width: 80px;
              height: 40px;
              line-height: 40px;
              border-radius: 10px;
              border: 1px solid #999;
            }
            input:checked+label {
              background-color: #f9de57;
              border: 1px solid #f9de57;
            }
          }
        }
      }
    }
    button{
      width: 90%;
      height: 80px;
      line-height: 80px;
      margin: 30px auto;
      background-color: #f9de57;
      font-size: 30px;
      border-radius: 20px;
      outline: none;
    }
  }
</style>
