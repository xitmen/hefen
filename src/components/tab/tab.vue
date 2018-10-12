<template>
  <div class="tab" :class="{'isBg': !bgColor }">
    <div class="back" @click="back">
      <i :class="getIconBack()"></i>
    </div>
    <div class="title">{{title}}</div>
    <div class="share" @click="shareHandler">
      <i class="icon-share" v-show="share"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    title: {
      type: String,
      default: ''
    },
    share: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: Boolean,
      default: true
    },
    goAppHome: {
      type: Boolean,
      default: false
    }
  },
  created () {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS) {
      this.device = 'IOS'
    }
    if (isAndroid) {
      this.device = 'Android'
    }
    try {
      this.uid = window.box.getUidFromApp()
    } catch (e) {
      this.uid = '2'
    }
  },
  methods: {
    back () {
      if (this.goAppHome) {
        try {
          window.box.backFunction()
        } catch (e) {
          alert('没有找到window.box.backFunction')
        }
      } else {
        this.$router.back()
      }
    },
    getIconBack () {
      if (this.bgColor) {
        return 'icon-back'
      } else {
        return 'icon-back-white'
      }
    },
    shareHandler (flag) {
      if (flag === true || this.share) {
        try {
          window.box.shareFunction(`${location.href}?uid=${this.uid}`, '快快加入盒粉之家!')
        } catch (e) {
          alert(`没有找到window.box.shareFunction${location.href}`)
        }
      }
    },
    download (device) {
      if (device === 'IOS' || this.device === 'IOS') {
        alert('下载IOS版')
      } else if (device === 'Android' || this.device === 'Android') {
        location.href = 'https://www.pgyer.com/ccej'
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tab
    position fixed
    top 0
    right 0
    left 0
    height (88/2)px
    display flex
    align-items center
    justify-content space-between
    border-bottom 1px solid $color-gray-3
    background-color #fff
    &.isBg
      background-color transparent
      border-bottom 1px solid transparent
      color #fff
    .title
      font-size (36/2)px
      text-align center
    .back,.share
      width (44/2)px
      height (44/2)px
      &.back
        margin-left 14px
      &.share
        margin-right 14px
      .icon-back,.icon-share, .icon-back-white
        display inline-block
        width 100%
        height 100%
        background-position center
        background-repeat no-repeat
        background-size contain
        &.icon-back-white
          bg-image('arrow_white.png')
          transform rotate(180deg)
        &.icon-back
          bg-image('arrow.png')
        &.icon-share
          bg-image('share.png')
</style>
