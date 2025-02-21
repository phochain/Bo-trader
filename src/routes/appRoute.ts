import { BalancePage, HomePage, TradeHistoryPage} from "../pages";

const appRoute = {
  home: {
    path: '/',
    component: HomePage,
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