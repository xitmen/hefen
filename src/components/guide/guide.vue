<template>
  <div class="guide">
    <tab title="" :bgColor="bgColor" :share="share"></tab>
    <div class="guide-wrapper">
      <div class="guide-banner">
        <img src="./banner.png" width="100%" alt="banner">
      </div>
      <div class="step" v-for="(item, index) in pageInfo" :key="index">
        <h3 class="title">
          <span class="num">0{{index + 1}}</span>
          <span class="text">{{item.title}}</span>
        </h3>
        <dl>
          <dt class="tips">TIP{{index + 1}}</dt>
          <dd class="text">{{item.text}}</dd>
        </dl>
        <div class="img-list">
          <img :src="n" alt="" v-for="(n, j) in item.img" :key="j" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import Tab from 'components/tab/tab'
import {getExchangePointsGuide} from 'base/api/api'
import {SUCCESS} from '../../base/api/config'

export default {
  name: 'guide',
  data () {
    return {
      pageInfo: [],
      bankId: 20
    }
  },
  computed: {
    ...mapGetters([
      'bankCode'
    ])
  },
  created () {
    this.bgColor = false
    this.share = false
    this.bankId = this.$route.query.bankId
    this.getGuide()
  },
  methods: {
    getGuide () {
      getExchangePointsGuide(this.bankId).then((data) => {
        let pageInfo = []
        if (data.code === SUCCESS && data.data.content) {
          data.data.content.map((item) => {
            item.img = item.img.split(',')
          })
          pageInfo = data.data.content
        }
        this.pageInfo = pageInfo
      })
    }
  },
  components: {
    Scroll,
    Tab
  },
  watch: {
    '$route' (to, from) {
      this.bankId = to.query.bankId
      if (this.bankId) {
        this.getGuide()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .guide
    background-color #FFFBF7
    .guide-wrapper
      .step
        padding 0 15px
        margin-bottom 30px
        .title
          background-image url("./title.png")
          background-repeat no-repeat
          background-position top center
          background-size 62px 62px
          height 62px
          text-align center
          position relative
          margin-bottom 25px
          .num
            position absolute
            top 0
            left 50%
            transform translateX(-50%)
            display inline-block
            font-size 50px
            z-index 0
            color #FFE8DF
          .text
            position absolute
            bottom 12px
            left 50%
            transform translateX(-50%)
            display inline-block
            font-size 20px
            text-align center
            z-index 1
            color #FF6154
        dl
          margin-bottom 10px
          dt.tips
            bg-image('tipsBg.png')
            height 30px
            line-height 30px
            text-indent 12px
            color #fff
            background-repeat no-repeat
            background-size contain
            margin-bottom 10px
          dd.text
            color #FF8F6A
            line-height 25px
        .img-list
          text-align center
          img
            display inline-block
            width 44%
            margin 10px
</style>
