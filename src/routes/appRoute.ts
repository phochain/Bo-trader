import {AffiliatePage, BalancePage, HomePage, TradeHistoryPage} from "../pages";

const appRoute = {
  home: {
    path: '/',
    component: HomePage,
  },

  AffiliatePage: {
    path: "/affiliate",
    component: AffiliatePage
  },

  BalancePage: {
    path: '/balance',
    component: BalancePage
  },

  TradeHistoryPage: {
    path: '/trade-history',
    component: TradeHistoryPage
  }
}

export default appRoute