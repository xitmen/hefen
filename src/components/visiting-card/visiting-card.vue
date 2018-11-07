<template>
  <transition name="slide">
    <div class="visiting-card">
      <tab ref="tab" title="名片" :goAppHome="goAppHome" :bgColor="bgColor" :share="share"></tab>
      <div class="visiting-card-content">
        <div class="code-img">
          <div id="qrcode"></div>
          <img src="/static/img/logo.jpg" />
        </div>
        <span><em>邀请码:</em>{{code}}</span>
      </div>
      <p class="share-btn">
        <a href="javascript:;" class="btn" @click="shareHandler">{{text}}</a>
      </p>
    </div>
  </transition>
</template>

<script>
import {getCusinessCard} from 'base/api/api'
import Tab from 'components/tab/tab'
import {SUCCESS, SIGN_IN} from 'base/api/config'
export default {
  name: 'apply-card',
  data () {
    return {
      text: '分享',
      code: ''
    }
  },
  created () {
    this.share = false
    this.bgColor = false
    this.goAppHome = true
    try {
      if ('box' in window) {
        this.isApp = window.box.getAppSystem()
      } else {
        this.text = '立即下载'
        this.isApp = false
      }
    } catch (e) {
      this.isApp = false
      this.text = '立即加入'
    }
  },
  beforeMount () {
    if (this.$route.query.uid) {
      this.uid = this.$route.query.uid
    } else {
      try {
        this.uid = window.box.getUidFromApp()
      } catch (e) {
        this.uid = '2'
      }
    }
    this.getUserImg()
  },
  methods: {
    getUserImg () {
      getCusinessCard({uid: this.uid}).then((data) => {
        if (data.code === SUCCESS && data.data) {
          this.code = data.data.code
          this.setCodeImg()
        } else {
          alert('UID错误')
        }
      })
    },
    setCodeImg() {
      let qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 200,
        height: 200
      })
      qrcode.makeCode(`${SIGN_IN}signIn?upCode=${this.code}`)
    },
    shareHandler () {
      if (this.isApp) {
        this.$refs.tab.shareHandler(true)
      } else {
        // this.$refs.tab.download()
        this.$router.push({
          path: `/signIn?upCode=${this.code}`
        })
      }
    }
  },
  components: {
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .visiting-card
    position fixed
    overflow-y auto
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color #fff
    bg-image('banner.png')
    background-repeat no-repeat
    background-size contain
    background-position center top
    padding 160px 15px 35px 15px
    .visiting-card-content
      position relative
      width 300px
      height 300px
      margin 0 auto
      background-color $color-background
      border-radius 15px
      display flex
      justify-content center
      flex-direction column
      align-items center
      box-shadow 0 0 10px #ccc
      .code-img
        position absolute
        width 200px
        height 200px
        img
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          width 60px
          height 60px
          margin-bottom 15px
      span
        position absolute
        width 100%
        text-align center
        bottom 20px
        color #FF6154
        font-size 18px
        em
          font-style normal
          color $color-gray-5
          padding-right 10px
    p
      margin-top (113/2)px
      text-align center
      a
        btn()
        width 250px
        height 44px
        line-height 44px
        color $color-background
        background-image: linear-gradient(-27deg, #FFA976 5%, #FF6154 100%)
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
