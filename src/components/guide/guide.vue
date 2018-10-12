<template>
  <div class="guide">
    <tab title="" :bgColor="bgColor" :share="share"></tab>
    <div class="guide-wrapper">
      <div class="guide-banner">
        <img src="./banner.png" width="100%" alt="banner">
      </div>
      <div class="step" v-for="(item, index) in pageInfo" :key="index">
        <h3 class="title">
          <span class="num">0{{index + 1}}</span>
          <span class="text">{{item.title}}</span>
        </h3>
        <dl>
          <dt class="tips">TIP{{index + 1}}</dt>
          <dd class="text">{{item.text}}</dd>
        </dl>
        <div class="img-list">
          <img :src="n" alt="" v-for="(n, j) in item.img" :key="j" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import Tab from 'components/tab/tab'
import {getExchangePointsGuide} from 'base/api/api'
import {SUCCESS} from '../../base/api/config'

export default {
  name: 'guide',
  data () {
    return {
      helpText: {
        df: [
          {
            title: '微信关注',
            text: '微信搜索关注公众号“花积分”，点击下方“花积分”；',
            imgs: ['/static/img/guide/df/1_1.png']
          },
          {
            title: '点击更多',
            text: '下拉至“电子礼卷”，点击“更多”',
            imgs: ['/static/img/guide/df/2_1.png', '/static/img/guide/df/2_2.png', '/static/img/guide/df/2_3.png']
          },
          {
            title: '登录',
            text: '登录，点击“添加银行卡”，填写个人相关信息，完成支付;',
            imgs: ['/static/img/guide/df/3_1.png', '/static/img/guide/df/3_2.png', '/static/img/guide/df/3_3.png']
          },
          {
            title: '支付',
            text: '支付完成后，会收到一条沃尔玛的短信，包含券号以及二维码链接，将整条短信复制，在乐享积分页面点击“去兑换”，粘贴短信内容提交至客服即可',
            imgs: ['/static/img/guide/df/4_1.png']
          },
          {
            title: '完成',
            text: '兑换完成后，当天即可结算，客服会将金额划拨至您的账户，请至我的钱包提现。',
            imgs: []
          }
        ],
        zx: [
          {
            title: '微信关注',
            text: '微信关注“中信银行信用卡”，绑定个人信用卡，回复“积分”即可查询信用卡积分；',
            imgs: ['/static/img/guide/zx/1_1.png', '/static/img/guide/zx/1_2.png']
          },
          {
            title: '点击蓝色链接',
            text: '点击蓝色链接“请点击进入信运汇”—【搜索“小米移动电源”】—【选择“小米任性兑新小米移动电源2”】；',
            imgs: ['/static/img/guide/zx/2_1.png', '/static/img/guide/zx/2_2.png']
          },
          {
            title: '登录并绑定',
            text: '登录并绑定卡片，勾选“积分”按钮，点击“立即兑换”，确认订单地址请填写：收货人请填写报单人姓名、电话17715367788、收货地址江苏省苏州市虎丘区竹园路209号1号楼+报单人电话号码；',
            imgs: ['/static/img/guide/zx/3_1.png', '/static/img/guide/zx/3_2.png', '/static/img/guide/zx/3_3.png', '/static/img/guide/zx/3_4.png', '/static/img/guide/zx/3_5.png']
          },
          {
            title: '支付完成',
            text: '支付完成后，点击订单详情进入，将刚刚支付完成的订单详情页截图保存，之后在乐享积分-中信银行对应产品页面根据个人兑换数量选择，发送截图即完成兑换，平台会在收到货后1个工作日内将兑换金额划拨至你的账户，至我的钱包提现即可。',
            imgs: ['/static/img/guide/zx/4_1.png', '/static/img/guide/zx/4_2.png']
          }
        ],
        zh: [
          {
            title: '微信关注',
            text: '微信搜索关注公众号“花积分”，点击下方“商超网购”',
            imgs: ['/static/img/guide/zh/1_1.png']
          },
          {
            title: '立即兑换',
            text: '根据个人积分数勾选相应产品，点击“立即兑换”',
            imgs: ['/static/img/guide/zh/2_1.png']
          },
          {
            title: '完成支付',
            text: '登录，点击“添加银行卡”，填写个人相关信息，完成支付；',
            imgs: ['/static/img/guide/zh/3_1.png', '/static/img/guide/zh/3_2.png', '/static/img/guide/zh/3_3.png']
          },
          {
            title: '支付完成',
            text: '支付完成后，会收到一条沃尔玛的短信，包含券号以及二维码链接，将整条短信复制，在乐享积分页面点击“去兑换”，粘贴短信内容提交至客服即可；',
            imgs: ['/static/img/guide/zh/4_1.png']
          },
          {
            title: '兑换完成',
            text: '兑换完成后，当天即可结算，客服会将金额划拨至您的账户，请至我的钱包提现。',
            imgs: []
          }
        ],
        js: [
          {
            title: '加油卡',
            text: '点击下方二维码识别进入链接',
            imgs: ['/static/img/guide/js/jyk/1_1.png']
          },
          {
            title: '搜索“加油”',
            text: '搜索“加油”，根据个人卡种选择相应产品，其中：普卡、家庭卡5、4万积分起兑，车卡2.5万积分起兑（个人积分查询可使用银行预留手机号编辑短信“CXJF”至95533）；',
            imgs: ['/static/img/guide/js/jyk/2_1.png', '/static/img/guide/js/jyk/2_2.png']
          },
          {
            title: '用户登录',
            text: '用户登录，选择建行账号登录',
            imgs: ['/static/img/guide/js/jyk/3_1.png']
          },
          {
            title: '输入手机号',
            text: '输入手机号以及确认手机号，此处手机号用于接收加油卡卡密信息，请填写最后金额划拨账户人员手机号，提交支付即可；',
            imgs: ['/static/img/guide/js/jyk/4_1.png']
          },
          {
            title: '兑换结束',
            text: '约3个工作日后会收到一条加油卡卡密短信，如未收到，请拨打建设银行加油卡供应商电话：400-926-6612，复制短信内容点击去兑换粘贴即完成兑换。客服会在1个工作日内将金额划拨至您的账户。',
            imgs: ['/static/img/guide/js/jyk/5_1.png']
          },
          {
            title: '沃尔玛代金卷',
            text: '扫描下方二维码或者点击二维码进入，选择相应产品，点击购买（以100元为例）；',
            imgs: ['/static/img/guide/js/wrm/1_1.png']
          },
          {
            title: '建行账号登录',
            text: '选择建行账号登录，根据银行提示操作登录，完善会员信息，填写收货地址，地址随便填，手机号码一定要填写自己现在用的手机号码；',
            imgs: ['/static/img/guide/js/wrm/2_1.png', '/static/img/guide/js/wrm/2_2.png', '/static/img/guide/js/wrm/2_3.png', '/static/img/guide/js/wrm/2_4.png', '/static/img/guide/js/wrm/2_5.png']
          },
          {
            title: '提交订单',
            text: '提交订单，勾选“使用积分”支付确认即可，支付完成后会收到一条拉卡拉短信，复制短信内容，在乐享积分页面点击“去兑换”粘贴即可。',
            imgs: ['/static/img/guide/js/wrm/3_1.png', '/static/img/guide/js/wrm/3_2.png', '/static/img/guide/js/wrm/3_3.png', '/static/img/guide/js/wrm/3_4.png']
          }
        ],
        jt: [
          {
            title: '下载“买单吧”APP',
            text: '下载“买单吧”APP，搜索“必胜客”，随意选择一家必胜客店铺点入；',
            imgs: ['/static/img/guide/jt/1_1.png', '/static/img/guide/jt/1_2.png']
          },
          {
            title: '必胜客92元购100元券',
            text: '点击“必胜客92元购100元券”进入，点击“立即购买”，支付方式选择交通银行信用卡，使用积分抵扣。',
            imgs: ['/static/img/guide/jt/2_2.png', '/static/img/guide/jt/2_3.png', '/static/img/guide/jt/2_4.png']
          },
          {
            title: '支付完成',
            text: '支付完成后将订单二维码截图发送至乐享积分相应产品后台，三个工作日即可完成结算。',
            imgs: ['/static/img/guide/jt/3_1.png']
          }
        ],
        pf: [
          {
            title: '京东E卡',
            text: '下载“浦大喜奔”APP（如已下载请跳过，如未下载识别下方二维码下载）；',
            imgs: ['/static/img/guide/pf/1_1.png']
          },
          {
            title: '绑定',
            text: '在“浦大喜奔”APP上绑定需兑换积分的浦发银行卡号，绑卡步骤：注册并登录账户→我的→卡片管理→添加银行卡（如已绑卡请跳过）；',
            imgs: ['/static/img/guide/pf/2_1.png']
          },
          {
            title: '查询信用卡积分',
            text: '查询信用卡积分（在“我的”→“积分明细”页面即可看到）；',
            imgs: ['/static/img/guide/pf/3_1.png']
          },
          {
            title: '选择相应的京东E卡并进行兑换',
            text: '选择相应的京东E卡并进行兑换（浦大喜奔→精品→礼券银行→搜索京东→根据个人积分数选择相应商品→积分支付）；',
            imgs: ['/static/img/guide/pf/4_1.png', '/static/img/guide/pf/4_2.png', '/static/img/guide/pf/4_3.png', '/static/img/guide/pf/4_4.png', '/static/img/guide/pf/4_5.png']
          },
          {
            title: '积分支付完成',
            text: '积分支付完成后直接发送可使用券号至瑞升达兑换页面即可。（订单截图获取：我的→我的订单→可使用券号）；',
            imgs: ['/static/img/guide/pf/5_1.png']
          }
        ],
        gs: [
          {
            title: '打开连接',
            text: '电脑端打开下面连接，立即购买→登录或注册→打开连接→立即购买→输入配送手机号并勾选下方积分抵扣→提交订单→支付',
            imgs: []
          },
          {
            title: '填写代理会员',
            text: '收货手机号填写代理会员的，单笔最多购买3件！可重复下单',
            imgs: []
          },
          {
            title: '发微信客服',
            text: '次日在收到卡密后转发微信客服！65700积分兑换连接 100面值（断货请购买200面值）\n' +
              'http://mall.icbc.com.cn/products/pd_0000240044.jhtml?DisplayOrder=1\n' +
              '131400积分积分兑换连接 200面值\n' +
              'http://mall.icbc.com.cn/products/pd_0000241277.jhtml?DisplayOrder=3\n',
            imgs: []
          }
        ],
        pn: [
          {
            title: '手机下载壹钱包',
            text: '手机下载壹钱包→购物→搜索 沃尔玛礼品卡 （切记是沃尔玛礼品卡，仅限于100,500,1000元面值)→立即兑换，勾选万里通积分，确认支付',
            imgs: []
          },
          {
            title: '填写信息',
            text: '填写收货手机号信息，建议填写代理会员的手机号（接受卡密信息）',
            imgs: []
          },
          {
            title: '登陆平安口袋银行',
            text: '如显示积分和实际积分不符，需登陆平安口袋银行→点击我的→积分转区→激活积分→验证并提交',
            imgs: []
          },
          {
            title: '秒审',
            text: '隔天会收到卡密信息；复制报单即可；秒审！！！',
            imgs: []
          }
        ],
        gd: [
          {
            title: '打开链接',
            text: '打开链接，点击立即兑换，起兑积分553000积分；输入卡号或ID获取验证码登陆→修改收货信息：（指定地址；收件人：报单会员名称或者电话）→确认配送信息提交订单；',
            imgs: []
          },
          {
            title: '输入兑换卡',
            text: '输入兑换卡信息并确认支付→兑换完成！！兑换成功1-3个工作日会收到快递单号；收到快递单号自助报单；',
            imgs: []
          },
          {
            title: '填写信息',
            text: '收件人和快递单号是唯一识别兑换人的重要信息，请务必认真填写！！',
            imgs: []
          },
          {
            title: '链接',
            text: '链接：https://xyk.cebbank.com/jfmall/items/4?t=1536717441875553000积分',
            imgs: []
          }
        ],
        xy: [
          {
            title: '扫描二维码',
            text: '点击或截图保存微信扫描识别下图二维码进入兑换页面并登陆；',
            imgs: ['/static/img/xy.png']
          },
          {
            title: '进入兑换',
            text: '进入兑换连接搜索 阅读器 →选择kindle电子阅读器→立即兑换→登陆→验证→提交订单填写数量（552000倍数）→添加收货地址→设置新地址为默认地址→立即支付→支付完成面；',
            imgs: []
          },
          {
            title: '修改收货',
            text: '设修改 收货信息（指定地址；收件人：报单会员名称或者电话）→确认配送信息提交订单；',
            imgs: []
          },
          {
            title: '收货电话',
            text: '1-3工作日收货电话会收到快递单号反馈；提交报单即可面',
            imgs: []
          },
          {
            title: '货到秒审',
            text: '审核时间：货到秒审',
            imgs: []
          }
        ],
        hx: [
          {
            title: '发送短信',
            text: '使用持卡人预留手机用户发送 HL142239#卡号后四位 到106902895577',
            imgs: []
          },
          {
            title: '兑换成功',
            text: '兑换成功1-3个工作日会收到卡密；',
            imgs: []
          },
          {
            title: '秒审',
            text: '收到卡密后点击自助报单，将收到的卡密短信（卡号和卡密）复制报单即可；秒审；',
            imgs: []
          }
        ],
        yz: [
          {
            title: '注册邮政手机银行',
            text: '下载注册邮政手机银行绑定信用卡卡号；',
            imgs: []
          },
          {
            title: '点击信用卡',
            text: '点击信用卡→进入积分商城→顶部搜索 ‘必胜客’→选择‘必胜客代金卷50元’→立即兑换（输入手机号以及数量50000积分倍数）→确认付款',
            imgs: []
          },
          {
            title: '支付完成后',
            text: '支付完成后，会收到卷码短信连接（每个手机号当天限兑5件；可修改接受手机号）',
            imgs: []
          },
          {
            title: '提交报单',
            text: '复制短信全部内容提交报单!',
            imgs: []
          }
        ],
        bj: [
          {
            title: '兑换礼品',
            text: '兑换礼品银行限量；先到先得；',
            imgs: []
          },
          {
            title: '70000积分兑换链接 100面值',
            text: 'https://card.bankofbeijing.com.cn/mall/product/productDetail.action?productId=59524',
            imgs: []
          },
          {
            title: '140000积分兑换链接 100面值',
            text: 'https://card.bankofbeijing.com.cn/mall/product/productDetail.action?productId=59523',
            imgs: []
          },
          {
            title: '350000积分兑换链接 100面值',
            text: 'https://card.bankofbeijing.com.cn/mall/product/productDetail.action?productId=59522',
            imgs: []
          }
        ],
        hf: [
          {
            title: '打开链接登陆兑换',
            text: '打开链接登陆兑换',
            imgs: []
          },
          {
            title: '25000积分兑换链接 50面值',
            text: 'https://creditcards.hsbc.com.cn/mall/product/productDetail.action?productId=44619',
            imgs: []
          },
          {
            title: '50000积分兑换链接',
            text: 'https://creditcards.hsbc.com.cn/mall/product/productDetail.action?productId=44618',
            imgs: []
          },
          {
            title: '收到卡密发给客服即可',
            text: '2、收到卡密发给客服即可',
            imgs: []
          }
        ]
      },
      pageInfo: [],
      bankId: 20
    }
  },
  computed: {
    ...mapGetters([
      'bankCode'
    ])
  },
  created () {
    this.bgColor = false
    this.share = false
    this.bankId = this.$route.query.bankId
    this.getGuide()
  },
  methods: {
    getGuide () {
      getExchangePointsGuide(this.bankId).then((data) => {
        let pageInfo = []
        if (data.code === SUCCESS) {
          data.data.content.map((item) => {
            item.img = item.img.split(',')
          })
          pageInfo = data.data.content
        }
        this.pageInfo = pageInfo
      })
    }
  },
  components: {
    Scroll,
    Tab
  },
  watch: {
    '$route' (to, from) {
      this.bankId = to.query.bankId
      if (this.bankId) {
        this.getGuide()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .guide
    background-color #FFFBF7
    .guide-wrapper
      .step
        padding 0 15px
        margin-bottom 30px
        .title
          background-image url("./title.png")
          background-repeat no-repeat
          background-position top center
          background-size 62px 62px
          height 62px
          text-align center
          position relative
          margin-bottom 25px
          .num
            position absolute
            top 0
            left 50%
            transform translateX(-50%)
            display inline-block
            font-size 50px
            z-index 0
            color #FFE8DF
          .text
            position absolute
            bottom 12px
            left 50%
            transform translateX(-50%)
            display inline-block
            font-size 20px
            text-align center
            z-index 1
            color #FF6154
        dl
          margin-bottom 10px
          dt.tips
            bg-image('tipsBg.png')
            height 30px
            line-height 30px
            text-indent 12px
            color #fff
            background-repeat no-repeat
            background-size contain
            margin-bottom 10px
          dd.text
            color #FF8F6A
            line-height 25px
        .img-list
          text-align center
          img
            display inline-block
            width 44%
            margin 10px
</style>
