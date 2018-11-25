import {HOST_NAME} from './config'
import ax from 'axios'
import qs from 'qs'

export const getCardList = (params) => {
  const url = `${HOST_NAME}api/index/getBankList`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const getCardInfo = (cardId) => {
  const url = `${HOST_NAME}api/index/getBankCardListByBankId`
  return new Promise((resolve, reject) => {
    let ajax = {bank_id: cardId}
    ax.post(url, qs.stringify(ajax))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const sendCardAndUserInfo = (params) => {
  const url = `http://boxfen.sf-epiaotong.cn/box-fans/api/index/fillUserInfo`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 获取移动积分
export const getMobileIntegralGoods = () => {
  const url = `${HOST_NAME}api/index/getMobileIntegralGoods`
  return new Promise((resolve, reject) => {
    ax.post(url)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 获取联通积分
export const getUnicomIntegralGoods = () => {
  const url = `${HOST_NAME}api/index/getUnicomIntegralGoods`
  return new Promise((resolve, reject) => {
    ax.post(url)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 获取电信积分
export const getTelecomIntegralGoods = () => {
  const url = `${HOST_NAME}api/index/getTelecomIntegralGoods`
  return new Promise((resolve, reject) => {
    ax.post(url)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 图片上传
export const upload = (params) => {
  const url = `${HOST_NAME}api/userCenter/uploadImage`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 订单提交
export const submitOrder = (params) => {
  const url = `${HOST_NAME}api/index/fillOrderInfo`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// getCusinessCard
export const getCusinessCard = (params) => {
  const url = `${HOST_NAME}api/userCenter/getCusinessCard`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// getCreditCardGoods
export const getCreditCardGoods = (cardId) => {
  const url = `${HOST_NAME}api/index/getCreditCardGoods`
  return new Promise((resolve, reject) => {
    let ajax = {bank_id: cardId}
    ax.post(url, qs.stringify(ajax))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// getExchangePointsGuide
export const getExchangePointsGuide = (cardId) => {
  const url = `${HOST_NAME}api/index/getExchangePointsGuide`
  return new Promise((resolve, reject) => {
    let ajax = {bank_id: cardId}
    ax.post(url, qs.stringify(ajax))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// sendVerificationCode 发送验证码
export const sendVerificationCode = (params) => {
  const url = `${HOST_NAME}api/common/sendVerificationCode`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 注册
export const register = (params) => {
  // const url = `http://boxfen.sf-epiaotong.cn/box-fans/api/common/register`
  const url = 'http://boxfen.sf-epiaotong.cn/box/api/common/register'
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 获取贷款列表
export const getLoanList = (params) => {
  const url = 'http://47.101.151.70:8080/box-test/api/index/getLoanList'
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// 申请贷款信息提交
export const applyLoan = (params) => {
  const url = `http://47.101.151.70:8080/box-test/api/index/applyLoan`
  return new Promise((resolve, reject) => {
    ax.post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}