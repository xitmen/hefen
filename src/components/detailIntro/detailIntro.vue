<template lang='pug'>
.detail-intro
    img.content(:src='intro')
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
      intro: 'static/img/intro.png',
      proData: {
        id: 122,
        images: ['static/img/pro01.png', 'static/img/pro01.png', 'static/img/pro01.png'],
        name: '钱盒POS（600及608随机发放）',
        intro: '(10台/箱，起始数量：1箱）',
        price: 999.00,
        hot: true,
        params: [
            {
                image: 'static/img/anquan.png',
                title: '刷卡随时随地',
                subTitle: '支持蓝牙接入无线自由链接'
            },
            {
                image: 'static/img/anquan.png',
                title: '输密安全',
                subTitle: '独立物理键盘硬盘加密'
            },
            {
                image: 'static/img/anquan.png',
                title: '快速到账',
                subTitle: '快速回款，稳定及时高效率地使用现金'
            },
            {
                image: 'static/img/anquan.png',
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
  .detail-intro
    img 
        width 100%
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
