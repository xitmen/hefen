<template>
  <div class="tab" :class="{'isBg': !bgColor }">
    <div class="back" @click="back">
      <i :class="getIconBack()" v-show="isBack"></i>
    </div>
    <div class="title">{{title}}</div>
    <div class="share" @click="shareHandler">
      <i class="icon-share" v-show="share"></i>
    </div>
  </div>
</template>

<script>
const shareMsg = {
  1: {
    title: '免费在线办理信用卡，开启你的信用生活',
    subTitle: '免费办理信用卡，额度高、审核快、手续简单，银联在线办理信用卡全程为你服务'
  },
  2: {
    title: '信用卡积分一键兑换',
    subTitle: 'hi！你的银行卡积分过期了吗？超高兑换价、快速结算，所有热门银行积分兑换尽在掌握！'
  },
  3: {
    title: '联通、移动、电信通讯积分一键兑换',
    subTitle: 'hi！你的通讯积分过期了吗？联通、移动、电信通讯积分一键兑换，超高兑换价、快速结算！'
  }
}

const defaultShareMsg = {
  title: '快快加入盒粉之家!',
  subTitle: '盒粉之家' 
}

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
    isBack: {
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
    },
    type: {
      type: String,
      default: ''
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
    this.shareHandler()
  },
  methods: {
    back () {
      if (this.goAppHome) {
        try {
          window.box.backFunction()
        } catch (e) {
          history.go(-1)
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
    shareHandler (flag, team) {
      if (this.type) {
        defaultShareMsg.title = shareMsg[this.type].title
        defaultShareMsg.subTitle = shareMsg[this.type].subTitle
      }
      // alert(defaultShareMsg.title)
      if (flag === true || this.share) {
        try {
          if (team) {
            window.box.shareSinger(`${location.href}?uid=${this.uid}`, defaultShareMsg.title, defaultShareMsg.subTitle)
          } else {
            window.box.shareFunction(`${location.href}?uid=${this.uid}`, defaultShareMsg.title, defaultShareMsg.subTitle)
          }
        } catch (e) {
          // alert(`没有找到window.box.shareFunction${location.href}`)
        }
      }
    },
    download (device) {
      if (device === 'IOS' || this.device === 'IOS') {
        // alert('下载IOS版')
        location.href = 'https://itunes.apple.com/cn/app/id1437709892?mt=8'
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
    position absolute
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
      flex 1
      font-size (36/2)px
      text-align center
    .back,.share
      width (44/2)px
      height (44/2)px
      padding 13px
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
