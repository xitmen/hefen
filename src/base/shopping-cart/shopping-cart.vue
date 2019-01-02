<template lang='pug'>
transition(name='list-fade')
    .content(v-show='showFlag')
        .content-box
            a.close(@click='hide()')
            .intro
                h2 &yen; {{proData.price}}
                h3 {{proData.intro}}
            ul.params
                li(v-for='(item, index) in params') 
                    label {{item.key}}
                    span {{item.value}}
            div.goods
                label 数量
                .options
                    span.del(@click.stop='delNum()') -
                    input(v-model='num')
                    span.add(@click.stop='addNum()') +
            p.submit-buy(@click='goBuy()') 确认购买     
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'ShoppingCart',
  props: {
      proData: {
          type: Object,
          default: null
      }
  },
  data () {
    return {
      showFlag: false,
      num: 1,
      params: [
          {key: '规格', value: '默认'}
      ]
    }
  },
  methods: {
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
    },
    addNum (e) {
        this.num++
    },
    delNum () {
        if (this.num < 2) return
        this.num--
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    position fixed
    background-color rgba(0, 0, 0, .5)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .content-box
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .content-box
        transform: translate3d(0, 100%, 0)
    .content-box
        position fixed
        bottom 0
        left 0
        right 0
        background-color #fff
        .close
            display block
            position absolute
            top 0
            right 0
            background-position center
            width 40px
            height 40px
            background-repeat no-repeat
            background-size 20px
            background-image url(./quxiao.png)
        .intro
            padding 12px 0
            line-height 24px
            border-bottom 1px solid #FBFBFB
            h2
                font-size 15px
                color #FF7500
                padding 0 31px
            h3
                font-size 15px
                color #333
                padding 0 31px
        .params
            border-bottom 1px solid #FBFBFB
            li
                display flex
                justify-content space-between
                line-height 24px
                padding 12px 31px
                label, span
                    font-size 15px
                    color #333
        .goods
            border-bottom 1px solid #FBFBFB
            display flex
            justify-content space-between
            padding 12px 31px
            label
                font-size 15px
                color #333
            .options
                border 1px solid #B3B3B3
                display flex
                justify-content space-around
                border-radius 3px
                span
                    display inline-block
                    width 20px
                    height 20px
                    line-height 20px
                    font-size 12px
                    text-align center
                    &.del
                        border-right 1px solid #B3B3B3
                    &.add
                        border-left 1px solid #B3B3B3
                input
                    width 20px
                    height 20px
                    text-align center
        .submit-buy
            margin-top 12px
            background-color #FF7500
            text-align center
            color #fff
            height 43px
            line-height 43px
</style>
