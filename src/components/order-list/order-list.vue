<template lang='pug'>
  .order-list
    ul.nav-list
      li(v-for='(item, index) in navList' :class='{ cur: curIndex === index }' :key='index' @click='selectType(item, index)')
        span {{item.name}}
    .content
      scroll.srcoll-content(rel='srcoll')
        div
          .item(v-for='(item, index) in orderList')
            h3
              span.time {{item.time}}
              span.stauts 已付款
            .intro
              img(:src='item.images')
              div.intro-center
                p.title POS机（600/608随机发货）
                p.sub-title 10件一箱
              div.intro-right
                p.price &yen; 99.99
                p.num 1
            .intro-floor
              p.info 
                span 共1箱
                span 总额：
                  em.yellow-text &yen; 999.00
              p.btn
                a.gray.cancel-btn(@click='cancelHanlder(item)') 取消
                a.yellow.pay-btn(@click='payHanlder(item)') 支付
                a.yellow.call(@click='callHanlder(item)') 催件
</template>

<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'OrderList',
  data () {
    return {
      navList: [
        {
          name: '商城',
          id: '12',
          sub:[
            {name: '未付款', id: '12'},
            {name: '已付款', id: '13'},
            {name: '已发货', id: '14'}
          ]
        },
        {
          name: '贷款',
          id: '15',
          sub: []
        },
        {
          name: '办卡',
          id: '16',
          sub: []
        },
        {
          name: '积分',
          id: '17',
          sub: []
        }
      ],
      curIndex: 0,
      curId: 12,
      orderList: [
        {
          time: '2018-10-12',
          images: 'static/img/pro01.png'
        }
      ]
    }
  },
  methods: {
    selectType (item, index) {
      this.curIndex = index
      console.log(item)
    },
    cancelHanlder (item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item.id
        }
      })
    },
    payHanlder () {

    },
    callHanlder () {

    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.order-list
  .nav-list
    display flex
    justify-content space-around
    padding 16px 0
    overflow hidden
    box-shadow 0 0 3px #A9A9A9
    li
      text-align center
      span
        padding 3px 0
        border-bottom 1px solid #fff
      &.cur
        span
          border-bottom 1px solid #FF8003
  .content
    .item
      margin 11px 17px
      border-radius 5px
      box-shadow 0 0 8px #e8e8e8
      h3
        display flex
        justify-content space-between
        font-size 12px
        padding 12px 21px
        border-bottom 1px solid #F9F9F9
        .time
          color #333333
        .stauts
          color #FF8003
      .intro
        display flex
        justify-content space-around
        padding 13px 21px
        border-bottom 1px solid #F9F9F9
        img
          width 54px
          height 54px
        .intro-center
          color #333
          .title
            font-size 13px
            margin-bottom 5px
          .sub-title
            font-size 12px
        .intro-right
          text-align right
          color #333
          font-size 12px
      .intro-floor
        text-align right 
        font-size 12px
        padding 12px 21px
        line-height 22px
        em
          font-style normal
          color #FF8003
        .btn
          a 
            display inline-block
            padding 0 15px
            margin-left 10px
            border-radius 2px
            color #fff
            &.gray
              background-color rgba(173, 173, 173, 1)
            &.yellow
              background-color #FF8003
</style>
