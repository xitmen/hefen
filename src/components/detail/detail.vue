<template lang='pug'>
.detail
    .banner
        .banner-list
            img(v-for='(item, index) in proData.images' :src='item' :key='index')
        .banner-page
            span(v-for='(item, index) in proData.images' :key='index')
    .pro-intro
        .into-left
            p.name {{proData.name}}
                span.hot(v-show='proData.hot') 热门
            p.intro {{proData.intro}}
            p.price &yen; {{proData.price}}
        .intro-share 分享
    ul.pro-params
        li(v-for='(item, index) in proData.params')
            img(:src='item.image')
            p.title {{item.title}}
            p.sub-title {{item.subTitle}}
    ul.pro-info
        li(v-for='(item, index) in proData.info')
            label {{item.key}}
            p {{item.value}}
    p.pro-more
        router-link(to="/detail-intro?id=proData.id" tag='a') 了解更多详情>>
    .cart
        span.add-cart(@click='addCart(proData)') 加入购物车
        span.go-buy(@click='goBuy(proData)') 立即购买
    shopping-cart(ref='shoppingCart' :proData='proData')
</template>

<script>
import ShoppingCart from '@/base/shopping-cart/shopping-cart'
export default {
  name: 'Detail',
  data () {
    return {
      proData: {
        id: 122,
        images: ['static/img/pro01.png', 'static/img/pro01.png', 'static/img/pro01.png'],
        name: '钱盒POS（600及608随机发放）',
        intro: '(10台/箱，起始数量：1箱）',
        price: 999.00,
        hot: true,
        params: [
            {
                image: 'static/img/WI-FI.png',
                title: '刷卡随时随地',
                subTitle: '支持蓝牙接入无线自由链接'
            },
            {
                image: 'static/img/anquan.png',
                title: '输密安全',
                subTitle: '独立物理键盘硬盘加密'
            },
            {
                image: 'static/img/kuaisudaozhang.png',
                title: '快速到账',
                subTitle: '快速回款，稳定及时高效率地使用现金'
            },
            {
                image: 'static/img/fapiao.png',
                title: '电子发票',
                subTitle: '自动生成数字签购单永久保存自由查询'
            }
        ],
        info: [
            {key: '活动', value: '现在购买可参加**活动'},
            {key: '配送', value: '16点之前下单当天发货,支持自提、顺丰、德邦。'},
            {key: '说明', value: '600及608随机发送。'}
        ]
      }
    }
  },
  created () {
    console.log(1)
  },
  methods: {
    addCart (proData) {
        this.$refs.shoppingCart.show()
    },
    goBuy (proData) {
        this.$refs.shoppingCart.show()
    }
  },
  components: {
      ShoppingCart
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail
    background-color #FBFBFB
    width 100%
    .banner
        overflow hidden
        height 275px
        position relative
        .banner-list
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            img
                position absolute
                top 0
                left 0
                width 100%
                height 275px
        .banner-page
            text-align center
            position absolute
            left 0
            right 0
            bottom 10px
            span
                display inline-block
                margin 0 4px
                width 5px
                height 5px
                font-size 0
                border-radius 100%
                background-color #D2D0D0
                &.cur
                    background-color #FF7500
    .pro-intro
        background-color #fff
        display flex
        justify-content space-between
        margin-top 11px
        .into-left
            padding-left 31px
            line-height 20px
            .name
                font-size 14px
                color #2C2C2C
            .intro
                font-size 12px
                color #2C2C2C
            .price
                font-size 18px
                color #FF7500        
        .intro-share
            width 60px
            height 70px
            padding-right 10px
            line-height 70px
            text-align right
            font-size 15px
            color #fff
            background-size contain
            background-image url('./fenxiang.png')
    .pro-params
        margin-top 11px
        background-color #fff
        display flex
        li
            flex 1
            text-align center
            padding 10px 0
            border-right 1px solid #F4F4F4
            &:last-child
                border-right 0 none
            img
                width 7vw
            .title
                font-size 11px
                color #2C2C2C
                margin 5px 0
            .sub-title
                font-size 8px
                color #B3B3B3
                padding 0 9px
    .pro-info
        margin 11px 0
        background-color #fff
        padding 10px 31px
        li
            display flex
            font-size 12px
            line-height 20px
            label
                flex 0 0 50px
                color #B3B3B3
            p
                color #333333
    .pro-more
        padding 10px 0
        text-align center
        background-color #fff
        margin-bottom 50px
        a
            color #FF7500
            font-size 13px
    .cart
        font-size 0
        text-align right
        overflow hidden
        height 49px
        background-color #fff
        margin-top 11px
        position fixed
        left 0
        right 0
        bottom 0
        .add-cart, .go-buy
            display inline-block
            width 105px
            text-align center
            height 49px
            line-height 49px
            color #fff
            font-size 15px
        .add-cart
            background-color #FCBE17
        .go-buy
            background-color #FF7500    

</style>
