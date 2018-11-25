import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}

const CardList = (resolve) => {
  import('components/card-list/card-list').then((module) => {
    resolve(module)
  })
}

const ApplyCard = (resolve) => {
  import('components/apply-card/apply-card').then((module) => {
    resolve(module)
  })
}

const Points = (resolve) => {
  import('components/points/points').then((module) => {
    resolve(module)
  })
}

const BankPoints = (resolve) => {
  import('components/bank-points/bank-points').then((module) => {
    resolve(module)
  })
}

const Agreement = (resolve) => {
  import('components/agreement/agreement').then((module) => {
    resolve(module)
  })
}

const VisitingCard = (resolve) => {
  import('components/visiting-card/visiting-card').then((module) => {
    resolve(module)
  })
}

const PointsChange = (resolve) => {
  import('components/points-change/points-change').then((module) => {
    resolve(module)
  })
}

const Team = (resolve) => {
  import('components/team/team').then((module) => {
    resolve(module)
  })
}

const Exchange = (resolve) => {
  import('components/exchange/exchange').then((module) => {
    resolve(module)
  })
}

const Guide = (resolve) => {
  import('components/guide/guide').then((module) => {
    resolve(module)
  })
}

const Download = (resolve) => {
  import('components/download/download').then((module) => {
    resolve(module)
  })
}

const SignIn = (resolve) => {
  import('components/sign-in/sign-in').then((module) => {
    resolve(module)
  })
}

const Loan = (resolve) => {
  import('components/loan/loan').then((module) => {
    resolve(module)
  })
}

const ApplyLoan = (resolve) => {
  import('components/apply-loan/apply-loan').then((module) => {
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
      path: '/card-list',
      name: 'CardList',
      component: CardList,
      children: [
        {
          path: ':id',
          name: 'ApplyCard',
          component: ApplyCard
        }
      ]
    },
    {
      path: '/points',
      name: 'Points',
      component: Points
    },
    {
      path: '/bankPoints',
      name: 'BankPoints',
      component: BankPoints
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/visitingCard',
      name: 'visitingCard',
      component: VisitingCard
    },
    {
      path: '/pointsChange',
      name: 'PointsChange',
      component: PointsChange
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/loan-list',
      name: 'Loan',
      component: Loan,
      children: [
        {
          path: ':id',
          name: 'ApplyLoan',
          component: ApplyLoan
        }
      ]
    }
  ]
})
