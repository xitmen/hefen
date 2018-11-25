<template>
  <div class="home">
    <ul>
      <router-link tag="li" to="/card-list">
        <span>信用卡申请</span>
      </router-link>
      <router-link tag="li" to="/bankPoints">
        <span>银行卡兑换</span>
      </router-link>
      <router-link tag="li" to="/points">
        <span>积分兑换</span>
      </router-link>
       <router-link tag="li" to="/bank-and-points">
        <span>银行卡和积分</span>
      </router-link>
      <router-link tag="li" to="/loan-list">
        <span>贷款超市</span>
      </router-link>
      <router-link tag="li" to="/visitingCard">
        <span>名片</span>
      </router-link>
      <router-link tag="li" to="/pointsChange">
        <span>积分兑换</span>
      </router-link>
      <router-link tag="li" to="/team">
        <span>团队</span>
      </router-link>
      <router-link tag="li" to="/download">
        <span>下载</span>
      </router-link>
      <router-link tag="li" to="/signIn">
        <span>注册</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home
    display flex
    justify-content center
    align-items center
    ul
      li
        margin 35px 0
        height 35px
        line-height 25px
        text-align center
</style>
