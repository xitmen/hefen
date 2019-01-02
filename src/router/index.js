import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}

const Detail = (resolve) => {
  import('components/detail/detail').then((module) => {
    resolve(module)
  })
}

const DetailIntro = (resolve) => {
  import('components/detailIntro/detailIntro').then((module) => {
    resolve(module)
  })
}

const Order = (resolve) => {
  import('components/order/order').then((module) => {
    resolve(module)
  })
}

const OrderList = (resolve) => {
  import('components/order-list/order-list').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/detail-intro',
      name: 'DetailIntro',
      component: DetailIntro
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/order-list',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
