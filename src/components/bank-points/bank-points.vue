<template>
  <div class="bank-list">
    <tab :goAppHome="goAppHome" class="tab" title="积分列表" type="2" :share="share" :isBack=isBack></tab>
    <div class="bank-list-wrapper">
      <left-nav :data="cardList" :currentCard="currentCard" @selectItem="selectCard"></left-nav>
      <div class="bank-list-content">
        <scroll :data="pointsData" class="bank-list-scroll">
          <div>
            <ul v-show="pointsData.length > 0">
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
            <div class="default-wrapper" v-show="pointsData.length === 0">
              <default></default>
            </div>
          </div>
        </scroll>
        <div class="loading-content" v-show="!pointsData">
          <loading></loading>
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
import Loading from 'base/loading/loading'
import Default from 'base/default/default'
import Compute from 'base/compute/compute'
import {getCardList, getCreditCardGoods, getMobileIntegralGoods, getTelecomIntegralGoods, getUnicomIntegralGoods} from 'base/api/api'
import {SUCCESS} from 'base/api/config'
import {mapMutations} from 'vuex'

export default {
  name: 'card-list',
  data () {
    return {
      isBack: false,
      pointsList: [{
        id: -1,
        name: '移动积分',
        code: -1
      }, {
        id: -2,
        name: '联通积分',
        code: -2
      }, {
        id: -3,
        name: '电信积分',
        code: -3
      }],
      cardList: [],
      currentCard: 0,
      cardId: null,
      currentItem: null,
      currentPoints: 0,
      keywords: '',
      goodsName: null,
      minPoints: 1000,
      proportion: 0,
      id: '',
      pointsData: []
    }
  },
  created () {
    this.getCardList()
    this.goAppHome = true
    this.map = {
      0: getMobileIntegralGoods,
      1: getUnicomIntegralGoods,
      2: getTelecomIntegralGoods
    }
    this.printsType = {0: '1', 1: '2', 2: '3'}
    this.mapKey = {
      '建设银行': 'js',
      '交通银行': 'jt',
      '浦发银行': 'pf',
      '中国银行': 'zh',
      '中信银行': 'zx',
      '工商银行': 'gs',
      '平安银行': 'pn',
      '光大银行': 'gd',
      '兴业银行': 'xy',
      '华夏银行': 'hx',
      '邮政银行': 'yz',
      '北京银行': 'bj',
      '汇丰银行': 'hf',
      '地方银行': 'df'
    }
    if ('box' in window) {
      this.isBack = true
      this.share = true
    } else {
      this.share = false
    }
    if (this.$route.query.uid) {
      this.setUid(this.$route.query.uid)
    }
  },
  methods: {
    selectCard (index, item) {
      this.currentItem = item
      this.currentCard = index
      // debugger
      this.cardId = item.id
      this.keywords = this.cardList[index].keywords
    },
    goGuide () {
      this.$router.push({
        path: `/guide?bankId=${this.cardId}`
      })
      this.setBankCode(this.keywords)
    },
    getCardList () {
      getCardList({type: 2}).then((data) => {
        if (data.code === SUCCESS) {
          data.data.map((item) => {
            item.keywords = this.mapKey[item.name]
          })
          data.data.sort((a, b) => {
            return Number(a.sort) - Number(b.sort)
          })
          this.cardList = data.data.filter(item => {
            return Number(item.goods_cnt)
          })
          this.cardList = this.pointsList.concat(this.cardList)
          this.cardId = this.cardList[0].id
          this.currentItem = this.cardList[0]
          this.keywords = this.cardList[this.currentCard].keywords
        }
      })
    },
    computeHandler (item) {
      this.goodsName = item.name
      this.minPoints = Number(item.integral)
      let price = Number(item.price)
      this.proportion = this.minPoints / price
      this.id = item.id
      this.$refs.compute.show()
      this.setPointsType('4')
    },
    exchangeHandler (item) {
      this.$router.push({
        path: '/exchange'
      })
      this.setPointsType('4')
      this.setGoodsName(item)
    },
    getCardData () {
      this.pointsData = []
      this.map[this.currentCard]().then((data) => {
        this.pointsData = data.data.goods_list
      })
    },
    ...mapMutations({
      setCardInfo: 'SET_CARD_INFO',
      setBankCode: 'SET_BANK_CODE',
      setGoodsName: 'SET_GOODS_NAME',
      setPointsType: 'SET_POINTS_TYPE',
      setUid: 'SET_UID'
    })
  },
  watch: {
    currentItem (newCurrent) {
      this.pointsData = []
      if (newCurrent.code) {
        this.getCardData()
      } else {
        getCreditCardGoods(this.cardId).then((data) => {
          this.pointsData = data.data.goods_list
        })
      }
    },
    '$route' (to, from) {
      if (to.query.uid) {
        this.setUid(this.$route.query.uid)
      }
    }
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
  .bank-list-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    display flex
    .bank-list-content
      flex 1
      position relative
      .bank-list-scroll
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
