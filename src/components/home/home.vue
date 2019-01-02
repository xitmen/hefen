<template lang='pug'>
  .home
    .nav-top
      a(v-for='(item,index) in nav', :key='index' :class='{selected: index === curIndex}' @click='selectType(item, index)')
        span {{item.name}}
    .mall-intro
      scroll.mall-scroll(ref='scroll')
        div.content
          .item(v-for='(item, index) in data' :key='index' @click='goDetail(item)')
            div.img
              img(:src='item.img')
            dl.intro
              dt.title {{item.title}}
              dd
                span.price &yen;{{item.price}}
                span.num  {{item.num}}人付款
                span.cart(@click.stop='addCart(item)') 加入购物车
</template>

<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'Home',
  data () {
    return {
      nav: [
        {name: '综合', key: '1'},
        {name: '人气', key: '2'},
        {name: '新品', key: '3'}
      ],
      data: [
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'},
        {title: '谦和POS机', price: 12.00, num: 214, id: 124, img: 'static/img/pro01.png'}
      ],
      curIndex: 0
    }
  },
  methods: {
    selectType (item, index) {
      this.curIndex = index
      console.log(item)
    },
    goDetail (item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item.id
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home
    .nav-top
      display flex
      justify-content center
      align-items center
      font-size 0
      margin-bottom 10px
      a
        flex 1
        padding 14px 0
        font-size (28/2)px
        text-align center
        span
          border-bottom 1px solid #fff
        &:hover,
        &.selected
          span
            color #FF7500
            border-bottom 1px solid #FF7500
    .mall-intro
      margin 0 27px
      position fixed
      top 52px
      bottom 0
      .mall-scroll
        height 100%
        overflow hidden
        .content
          display flex
          justify-content space-between
          flex-wrap wrap
          .item
            width 154px
            height 199px
            margin-bottom 12px
            border-radius 7px
            box-shadow 0 0 8px #e8e8e8
            .img
              width 154px
              height 129px
              display flex
              justify-content center
              align-items center
              background-color #F9F9F9
              img
                width 80%
                height 80%
            .intro
              padding 10px
              .title
                font-size 15px
                color #333
                height 24px
              dd
                display flex
                justify-content space-between
                align-items flex-end
                margin-top 5px
                span
                  font-size 0
                  &.price
                    color #FF7500
                    font-size 15px
                  &.num
                    color #828281
                    font-size 11px
                  &.cart
                    font-size 12px
                    background-repeat no-repeat
                    background-size contain
                    background-image url(./gouwuche.png)
                    text-indent -999rem
</style>
