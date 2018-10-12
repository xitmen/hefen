import * as types from './mutations-type'

const mutations = {
  [types.SET_CARD_INFO] (state, cardInfo) {
    state.cardInfo = cardInfo
  },
  [types.SET_UID] (state, uid) {
    state.uid = uid
  },
  [types.SET_BANK_CODE] (state, bankCode) {
    state.bankCode = bankCode
  },
  [types.SET_GOODS_NAME] (state, goods) {
    state.goodsName = goods
  },
  [types.SET_POINTS_TYPE] (state, pointsType) {
    state.pointsType = pointsType
  }
}

export default mutations
