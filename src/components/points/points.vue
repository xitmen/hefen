<template>
  <div class="points-list">
    <tab :goAppHome="goAppHome" title="积分列表" type="3"></tab>
    <div class="points-list-wrapper">
      <left-nav :data="pointsList" :currentCard="currentPoints" @selectItem="selectCard"></left-nav>
      <div class="points-list-content">
        <scroll :data="pointsData" class="points-list-scroll">
          <div>
            <ul v-show="pointsData && pointsData.length > 0">
              <li class="item" v-for="(item, index) in pointsData" :key="index">
                <div class="info-content">
                  <div class="header-img">
                    <img :src="item.img" alt="car01">
                  </div>
                  <div class="text">
                    <h2 class="title">{{item.name}}</h2>
                    <p class="subtitle">
                      <span>积分: {{item.integral}}</span>
                      <span>&yen;{{item.price}}</span>
                    </p>
                  </div>
                </div>
                <div class="button-list">
                  <a href="javascript:;" class="btn btn01" @click="computeHandler(item)">算一算</a>
                  <a href="javascript:;" class="btn btn02" @click="goGuide(index)">兑换教程</a>
                  <a href="javascript:;" class="btn btn03" @click="exchangeHandler(item)">兑换</a>
                </div>
              </li>
            </ul>
            <div class="default-wrapper" v-show="pointsData && pointsData.length === 0">
              <default></default>
            </div>
          </div>
        </scroll>
        <div class="loading-content" v-show="!pointsData">
          <loading title="卡片加载中..."></loading>
        </div>
      </div>
    </div>
    <compute ref="compute" :min="minPoints" :goodsName="goodsName" :exchangeRate="proportion" :goodsId="id"></compute>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Scroll from 'base/scroll/scroll'
import LeftNav from 'base/left-nav/left-nav'
import Default from 'base/default/default'
import Loading from 'base/loading/loading'
import Compute from 'base/compute/compute'
import {getMobileIntegralGoods, getTelecomIntegralGoods, getUnicomIntegralGoods} from 'base/api/api'
import {mapMutations} from 'vuex'

export default {
  name: 'points-list',
  data () {
    return {
      pointsList: [{
        id: 0,
        name: '移动',
        code: -1
      }, {
        id: 1,
        name: '联通',
        code: -2
      }, {
        id: 2,
        name: '电信',
        code: -3
      }],
      minPoints: 1000,
      goodsName: '',
      proportion: 0,
      id: '',
      currentPoints: 0,
      pointsData: null
    }
  },
  created () {
    this.map = {
      0: getMobileIntegralGoods,
      1: getUnicomIntegralGoods,
      2: getTelecomIntegralGoods
    }
    this.printsType = {0: '1', 1: '2', 2: '3'}
    this.goAppHome = true
    this.getCardData()
    this.setPointsType(this.printsType[this.currentPoints])
  },
  methods: {
    selectCard (index) {
      this.currentPoints = index
      this.getCardData()
      this.setPointsType(this.printsType[this.currentPoints])
    },
    getCardData () {
      this.pointsData = null
      this.map[this.currentPoints]().then((data) => {
        this.pointsData = data.data.goods_list
      })
    },
    applyCardHandler (item) {
      this.$router.push({
        path: `/card-list/${item.id}`
      })
    },
    goGuide () {
      this.$router.push({
        path: `/guide?bankId=${this.pointsList[this.currentPoints].code}`
      })
      this.setBankCode(this.keywords)
    },
    exchangeHandler (item) {
      this.$router.push({
        path: '/exchange'
      })
      this.setGoodsName(item)
    },
    computeHandler (item) {
      this.minPoints = Number(item.integral)
      this.goodsName = item.name
      let price = Number(item.price)
      this.proportion = this.minPoints / price
      this.id = item.id
      this.$refs.compute.show()
    },
    ...mapMutations({
      setPointsType: 'SET_POINTS_TYPE',
      setGoodsName: 'SET_GOODS_NAME',
      setBankCode: 'SET_BANK_CODE'
    })
  },
  components: {
    Tab,
    Scroll,
    LeftNav,
    Default,
    Loading,
    Compute
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .points-list-wrapper
    position fixed
    top 45px
    left 0
    right 0
    bottom 0
    display flex
    .points-list-content
      flex 1
      position relative
      .points-list-scroll
        height 100%
        overflow hidden
      .item
        padding 12px
        border-bottom 1px solid $color-line
        .info-content
          display flex
          box-sizing border-box
          margin-bottom 15px
          .header-img
            flex 0 0 (168/2)px
            height (158/2)px
            border-radius 15px
            overflow hidden
            margin-right 15px
            img
              width 100%
              height 100%
          .text
            display flex
            flex-direction column
            justify-content space-between
            flex 1
            h2
              font-size (28/2)px
              line-height (34/2)px
              margin-bottom 5px
            p
              display flex
              justify-content space-between
              vertical-align text-bottom
              span:nth-child(1)
                font-size 12px
                color #999
                line-height 18px
              span:nth-child(2)
                font-size 18px
                color #FF968A
        .button-list
          text-align center
          display flex
          justify-content space-between
          a
            btn()
            height 25px
            line-height 25px
            flex 1
            color $color-background
            margin 0 5px
            font-size $font-size-medium
            &.btn01
              background-color #FFA172
            &.btn02
              background-color #FFD072
            &.btn03
              background-color #FF6154
      .default-wrapper
        text-align center
        position absolute
        top 50%
        left 0
        right 0
        bottom 0
        transform translateY(-50%)
      .loading-content
        text-align center
        position absolute
        top 50%
        left 0
        right 0
        transform translateY(-50%)
</style>
