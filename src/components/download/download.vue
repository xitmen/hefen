<template>
  <transition name="slide">
    <div class="team">
      <tab ref="tab" title="盒粉下载" :goAppHome="goAppHome" :bgColor="bgColor" :share="share"></tab>
      <p class="share-btn">
        <a href="javascript:;" class="btn" @click="shareHandler">{{text}}</a>
      </p>
    </div>
  </transition>
</template>

<script>
import Tab from 'components/tab/tab'
import {getCusinessCard} from 'base/api/api'
import {SUCCESS} from 'base/api/config'

export default {
  name: 'team',
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
      this.text = '立即下载'
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
    // this.getUserImg()
  },
  methods: {
    getUserImg () {
      getCusinessCard({uid: this.uid}).then((data) => {
        if (data.code === SUCCESS && data.data) {
          this.code = data.data.code
        } else {
          alert('UID错误')
        }
      })
    },
    shareHandler () {
      if (this.isApp) {
        this.$refs.tab.shareHandler(true)
      } else {
        this.$refs.tab.download()
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
  .team
    position fixed
    overflow-y auto
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    bg-image('bg.png')
    background-repeat no-repeat
    background-size cover
    background-position center top
    .team-content
      overflow hidden
      position relative
      width 250px
      height 309px
      margin 150px auto 0 auto
      background-size cover
      bg-image('title.png')
      box-sizing border-box
      text-align center
      img
        display inline-block
        margin 25px auto
        width (400/2)px
        height (400/2)px
      .team-code
        width (500/2)px
        height (107/2)px
        margin-top 23px
        color #FF6154
        font-size 22px
    .share-btn
      position fixed
      top 50%
      left 50%
      transform translate(-50%)
      text-align center
      a
        btn()
        width 250px
        height 44px
        line-height 44px
        color #FF6256
        background-color $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
