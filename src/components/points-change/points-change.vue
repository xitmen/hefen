<template>
  <transition name="slide">
    <div class="points-change">
      <tab ref="tab" title="分享" :goAppHome="goAppHome" :bgColor="bgColor" :share="share"></tab>
      <div class="points-change-content">
        234251232SZ4671
      </div>
      <p class="share-btn">
        <a href="javascript:;" class="btn" @click="shareHandler">{{text}}</a>
      </p>
    </div>
  </transition>
</template>

<script>
import Tab from 'components/tab/tab'
export default {
  name: 'apply-card',
  data () {
    return {
      text: '分享'
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
  methods: {
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
  .points-change
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
    .points-change-content
      position fixed
      top 40%
      left 50%
      transform translateX(-50%)
      width 320px
      height (163/2)px
      margin 30px auto 60px auto
      border-radius 15px
      bg-image('title.png')
      background-size contain
      display flex
      justify-content center
      flex-direction column
      align-items center
      color #FF6154
      font-size 22px
    p
      position fixed
      top 70%
      left 50%
      transform translateX(-50%)
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
