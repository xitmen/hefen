<template>
  <div class="exchange-box">
    <tab title="兑换" :share="share"></tab>
    <div class="exchange-wrapper">
      <scroll class=exchange-scroll>
        <div>
          <div class="exchange-order">
            <h2>订单号-运单号-短信兑换码</h2>
            <textarea placeholder="请输入:订单号/运单号/短信兑换码" v-model="orderInfo"></textarea>
          </div>
          <div class="exchange-image">
            <h2>订单截图</h2>
            <ul>
              <li class="order-image" v-for="(item, index) in imgList" :key="index">
                <img :src="item" alt="">
              </li>
              <li class="add-image needsclick"  @click="uploadHandler">上传图片</li>
            </ul>
          </div>
        </div>
      </scroll>
      <form action="" style="display: none">
        <input accept="image/*,audio/*" type="file" ref="upload" @change="inputChange" />
      </form>
      <div class="btn-list">
        <a href="javascript:;" class="btn btn01" @click="submitHandler(true)">提交后继续</a>
        <a href="javascript:;" class="btn btn02" @click="submitHandler">提交</a>
      </div>
    </div>
    <tips :text="text" ref="tips"></tips>
    <div class="loading-content" v-show="isLoading">
      <loading text="图片上传中..."></loading>
    </div>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Scroll from 'base/scroll/scroll'
import Tips from 'base/tips/tips'
import Loading from 'base/loading/loading'
import {upload, submitOrder} from 'base/api/api'
import {SUCCESS} from 'base/api/config'
import {mapGetters} from 'vuex'

export default {
  name: 'exchange',
  data () {
    return {
      imgList: [],
      imgKeys: [],
      orderInfo: '',
      isLoading: false,
      text: '请输入订单号，或者订单截图!'
    }
  },
  computed: {
    ...mapGetters([
      'goodsName',
      'pointsType'
    ])
  },
  created () {
    this.share = false
    try {
      this.uid = window.box.getUidFromApp()
    } catch (e) {
      this.uid = '2'
    }
  },
  mounted () {
    this.clearParam()
  },
  methods: {
    uploadHandler () {
      this.$refs.upload.click()
    },
    uploadImg (urlString) {
      return new Promise((resolve) => {
        upload({ uid: this.uid, base64_img: urlString }).then((data) => {
          resolve(data)
        })
      })
    },
    clearParam () {
      this.imgList = []
      this.imgKeys = []
      this.orderInfo = ''
    },
    submitHandler (next) {
      if (this.orderInfo.trim() === '' && this.imgKeys.length === 0) {
        this.$refs.tips.show()
      } else {
        this.isLoading = true
        submitOrder({uid: this.uid, title: this.goodsName.title, good_id: this.goodsName.id, type: this.pointsType, order_str: this.orderInfo, images: this.imgKeys.join('#')}).then((data) => {
          this.isLoading = false
          if (data.code === String(SUCCESS)) {
            this.clearParam()
            if (next === true) {
              this.text = '提交成功！您可以进行下一个订单的操作'
            } else {
              this.text = '提交成功!'
              this.$refs.tips.show()
              setTimeout(() => {
                this.$router.back()
              }, 2 * 1000)
            }
          } else {
            this.text = data.message
            this.$refs.tips.show()
          }
        })
      }
    },
    inputChange (e) {
      let _this = this
      let reader = new FileReader()
      reader.onload = (function () {
        return function () {
          let url = this.result.split(';base64,')
          let imgType = url[0].split('/')[1]
          _this.isLoading = true
          _this.uploadImg(`${imgType}:${url[1]}`).then((data) => {
            _this.isLoading = false
            if (data.code === SUCCESS) {
              _this.imgKeys.push(data.data.image_key)
              _this.imgList.push(this.result)
            } else {
              alert('图片上传失败')
            }
          })
        }
      })(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    }
  },
  watch: {
    goodsName () {
      this.clearParam()
    }
  },
  components: {
    Tab,
    Tips,
    Loading,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .exchange-wrapper
    position fixed
    .exchange-scroll
      position fixed
      top 48px
      left 0
      right 0
      bottom 60px
      overflow hidden
      .exchange-order,.exchange-image
        padding 5px 15px
        margin-bottom 25px
        h2
          line-height 25px
          color #636367
          font-size 14px
          margin 5px 0 15px 0
        textarea
          width 97%
          height 80px
          padding 5px
          border 1px solid #EFEEF4
        ul
          font-size 0
          li
            display inline-block
            width 100px
            height 126px
            margin 5px
            vertical-align top
            &.add-image
              bg-image('./add-btn.png')
              background-size contain
              background-repeat no-repeat
              background-position top center
              font-size 14px
              padding-top 136px
              text-align center
              height 0
            img
              display block
              width 100%
              height 100%
    .btn-list
      position fixed
      bottom 5px
      left 0
      right 0
      text-align center
      display flex
      justify-content space-between
      a
        height 40px
        line-height 40px
        flex 1
        color $color-background
        margin 0 5px
        font-size $font-size-medium
        &.btn01
          background-color #FFA172
        &.btn02
          background-color #FFD072
  .loading-content
    text-align center
    position absolute
    top 50%
    left 0
    right 0
    transform translateY(-50%)
</style>
