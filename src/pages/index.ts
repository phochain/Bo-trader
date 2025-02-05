import {lazy} from "react";

const HomePage = lazy(() => import('./home'))
const AffiliatePage = lazy(() => import('./affiliate'))
const BalancePage = lazy(() => import('./balance'))
const TradeHistoryPage = lazy(() => import('./trade-history'))

const GreetingsPage = lazy(() => import('./greetings'))

export {HomePage, AffiliatePage, BalancePage, TradeHistoryPage, GreetingsPage}