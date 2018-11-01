<template>
  <transition name="list-fade">
    <div class="compute-wrapper" v-show="showFlag" @click="hide">
      <div class="compute-content" @click.stop>
        <div class="header">
          <h2>{{goodsName}}</h2>
          <h3>最小起兑换<em>{{min}}</em></h3>
          <span class="close" @click="hide">
            <i class="icon-close"></i>
          </span>
        </div>
        <div class="compute-input">
          <div class="input-list">
            <input type="text" class="icon-computed" placeholder="请输入金额" v-model="points" ref="inputElem" />
            <input type="text" class="icon-price" placeholder="约等于0.00元" v-model="price" rel="result" />
          </div>
          <div class="compute-btn">
            <a href="javascript:;">算一算</a>
          </div>
        </div>
        <div class="compute-box">
          <div class="compute-btn-list">
            <div class="line">
              <span ref="numList" @click="addNum">1</span>
              <span ref="numList" @click="addNum">2</span>
              <span ref="numList" @click="addNum">3</span>
            </div>
            <div class="line">
              <span ref="numList" @click="addNum">4</span>
              <span ref="numList" @click="addNum">5</span>
              <span ref="numList" @click="addNum">6</span>
            </div>
            <div class="line">
              <span ref="numList" @click="addNum">7</span>
              <span ref="numList" @click="addNum">8</span>
              <span ref="numList" @click="addNum">9</span>
            </div>
            <div class="line">
              <span ref="numList" @click="delNum" class="gray">删除</span>
              <span ref="numList" @click="addNum">0</span>
              <span ref="numList" class="red" @click="exchangeHandler">确定</span>
            </div>
          </div>
          <div class="submit-btn" @click="exchangeHandler">
            马上<br/>兑换
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'compute',
  props: {
    min: {
      type: Number,
      default: 1000
    },
    exchangeRate: {
      type: Number,
      default: 13000
    },
    goodsName: {
      type: String,
      default: ''
    },
    goodsId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showFlag: false,
      points: '',
      price: ''
    }
  },
  methods: {
    hide () {
      this.showFlag = false
      this.points = ''
      this.price = ''
    },
    show () {
      this.showFlag = true
    },
    addNum (e) {
      let num = e.target.innerText
      this.points += num
    },
    delNum () {
      let num = this.points.substr(0, this.points.length - 1)
      this.points = num
    },
    exchangeHandler () {
      this.$router.push({
        path: '/exchange'
      })
      this.setGoodsName({name: this.goodsName, id: this.goodsId})
    },
    ...mapMutations({
      setGoodsName: 'SET_GOODS_NAME'
    })
  },
  watch: {
    points () {
      if (this.points !== '' && !isNaN(this.points)) {
        let price = Math.max(0, (parseInt(this.points) / this.exchangeRate))
        this.price = price.toFixed(2)
      } else {
        this.price = ''
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .compute-wrapper
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    position fixed
    background-color rgba(0, 0, 0, .5)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .compute-content
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .compute-content
        transform: translate3d(0, 100%, 0)
    .compute-content
      left 0
      right 0
      bottom 0
      position fixed
      background-color $color-background
      .header
        padding-bottom 5px
        border-bottom 1px solid #EAEAEA
        h2
          color #333
          line-height 24px
          text-align center
          padding 5px 0
          font-size $font-size-large
        h3
          color #999
          line-height 18px
          text-align center
          font-size $font-size-small-s
          em
            color $color-red
            font-style normal
            padding-left 5px
        .close
          top 0
          right 0
          width 30px
          height 30px
          font-size 0
          position absolute
          display inline-block
          .icon-close
            width 100%
            height 100%
            display block
            bg-image('./close.png')
            background-size: contain
    .compute-input
      display flex
      padding 16px 15px
      justify-content space-between
      .input-list
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        input
          font-size 12px
          padding 8px 5px 8px 35px
          border-radius 5px
          border 1px solid #C8C8C8
          background-size 26px
          background-repeat no-repeat
          background-position 4px 2px
          &.icon-computed
            bg-image('./icon_bag.png')
          &.icon-price
            bg-image('./icon_price.png')
          &:placeholder
            color #999
      .compute-btn
        overflow hidden
        height (162/2)px
        flex 0 0 (142/2)px
        border-radius 5px
        margin-left 15px
        display flex
        justify-content center
        align-items center
        line-height 129px
        background-image linear-gradient(#FFA373, #FF6355)
        a
          display block
          width 100%
          height 100%
          text-align center
          background-repeat no-repeat
          font-size 13px
          bg-image('./icon_computed.png')
          background-size 40px
          background-position center 10px
          color $color-background
    .compute-box
      display flex
      .compute-btn-list
        flex 1
        height 300px
        font-size 0
        padding-top 1px
        .line
          display flex
          justify-content space-around
          align-items self-end
          span
            border 1px solid #D2D2D2
            height (300/4)px
            display flex
            flex 1
            margin-top -1px
            margin-left -1px
            align-items center
            justify-content center
            font-size 18px
            color #333
            &.gray
              color #999
            &.red
              color #FF8464
      .submit-btn
        flex 0 0 100px
        display flex
        justify-content center
        align-items center
        line-height 26px
        color $color-background
        background-image linear-gradient(#FFA373, #FF6355)
</style>
