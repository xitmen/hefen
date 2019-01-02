<template lang='pug'>
  .order
    .order-status(v-show='orderSatus')
        i.icon(:class='iconOrder')
        div.intro
            p 已发货
            p 德邦物流：25678923566
            p 您的商品已安排发货，请注意查看物流信息
    .order-user-address
        i.icon(:class='addressIcon')
        div.intro
            p.user-info
                span.name 张三
                span.tel 165****5689
            p.user-address 江苏省苏州市高新区苏州创业园C楼
    .order-pro-info
        img(:src='image')
        div.pro-intro
            p.title 钱盒POS（600及608随机发货）
            p.sub-info
                span.yellow-text &yen; 990
                span x1
    ul.order-pro-other
        li
            label 商品金额
            span 990
        li
            label 运费
            span 0
        li
            label 总计
            span.yellow-text &yen; 990.00  
    ul.order-pay-info
        li
            label 订单编号：
            span 25678992420155896
        li
            label 下单时间：
            span 2018-12-15
        li
            label 付款时间：
            span 2018-12-15
    p.order-pay-btn
        a.cancel-btn 取消订单
        a.pay-btn 支付
</template>

<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'Home',
  data () {
    return {
      iconOrder: 'icon01',
      orderSatus: true,
      orderPlay: true
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
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .order
    .order-status
        padding 13px 22px
        background-color #FDA55C
        color #fff
        font-size 12px
        .icon
            position absolute
            top 13px
            left 10px
            height 20px
            width 20px
            &.icon01
                background-image url(./dingdan.png)
            &.icon02
                background-image url(./fahuo.png)
</style>
