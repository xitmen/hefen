<template>
  <div class="card-list">
    <tab :goAppHome="goAppHome" title="信用卡申请" type="1" :share="share" :isBack=isBack></tab>
    <div class="card-list-wrapper">
      <left-nav :data="cardList" :currentCard="currentCard" @selectItem="selectCard"></left-nav>
      <div class="card-list-content">
        <scroll :data="cardListData" class="card-list-scroll">
          <div>
            <ul>
              <li class="item" v-for="(item, index) in cardListData" :key="index" @click="applyCardHandler(item)">
                <div class="header-img">
                  <img :src="item.img" alt="car01">
                </div>
                <div class="text">
                  <h2 class="title">{{item.productName}}</h2>
                  <h3 class="sub-title">{{item.settlementPeriod}}/{{item.feedbackType}}</h3>
                  <h4 class="sub-price" v-show="share">【&yen;{{item.amount}}/张】</h4>
                  <div class="desc">
                    <span class="num">{{item.applications}}</span>
                    <span>人已申请</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="default-wrapper" v-show="cardListData && cardListData.length === 0">
              <default></default>
            </div>
          </div>
        </scroll>
        <div class="loading-content" v-show="!cardListData">
          <loading></loading>
        </div>
        <tips :text="text" ref="tips"></tips>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Tips from 'base/tips/tips'
import Scroll from 'base/scroll/scroll'
import LeftNav from 'base/left-nav/left-nav'
import Loading from 'base/loading/loading'
import Default from 'base/default/default'
import {getLoanList} from 'base/api/api'
import {SUCCESS} from 'base/api/config'
import {mapMutations} from 'vuex'

export default {
  name: 'loan',
  data () {
    return {
      isBack: false,
      catachData: [],
      cardList: [],
      currentCard: 0,
      cardId: null,
      cardListData: null
    }
  },
  created () {
    this.text = '该银行暂未开通。。。'
    this.getCardList()
    this.goAppHome = true
    if (this.$route.query.uid) {
      this.setUid(this.$route.query.uid)
    }
    if ('box' in window) {
      this.isBack = true
      this.share = true
    } else {
      this.share = false
    }
  },
  methods: {
    setUserUid (uid) {
      this.setUid(uid)
    },
    selectCard (index) {
      this.currentCard = index
      this.cardListData = this.catachData[this.cardList[index].name]
    },
    getCardList () {
      getLoanList().then((data) => {
        if (data.code === String(SUCCESS)) {
          let cardListData = {}
          let _this = this
          data.data.forEach(item => {
            if (!(item.productType in cardListData)) {
              cardListData[item.productType] = []
              _this.cardList.push({name: item.productType})
            }
            cardListData[item.productType].push(item)
          })
          _this.catachData = cardListData
          _this.cardListData = cardListData[_this.cardList[0].name]
        }
      })
    },
    applyCardHandler (item) {
      if (item.url) {
        this.$router.push({
          path: `/loan-list/${item.id}`
        })
        this.setCardInfo(item)
      } else {
        this.$refs.tips.show()
      }
    },
    ...mapMutations({
      setCardInfo: 'SET_CARD_INFO',
      setUid: 'SET_UID'
    })
  },
  watch: {
    '$route' (to, from) {
      if (to.query.uid) {
        this.setUid(this.$route.query.uid)
      }
    }
  },
  components: {
    Tab,
    Tips,
    Scroll,
    LeftNav,
    Default,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .card-list-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    display flex
    .card-list-content
      flex 1
      position relative
      .card-list-scroll
        height 100%
        overflow hidden
      .item
        display flex
        box-sizing border-box
        padding 12px
        .header-img
          flex 0 0 (249/2)px
          height (157/2)px
          margin-right (19/2)px
          border-radius 5px
          overflow hidden
          img
            width 100%
            height 100%
        .text
          h2
            font-size (28/2)px
            line-height (34/2)px
            padding-bottom 5px
          h3
            font-size (24/2)px
            color $color-gray-5
            line-height 22px
          h4 
            font-size (28/2)px
            line-height 22px
            color $color-gray-5
          .desc
            font-size 12px
            color $color-gray-5
            .num
              color $color-red
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
