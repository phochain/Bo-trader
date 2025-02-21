import {lazy} from "react";

const HomePage = lazy(() => import('./home'))
const BalancePage = lazy(() => import('./balance'))
const TradeHistoryPage = lazy(() => import('./trade-history'))


export {HomePage, BalancePage, TradeHistoryPage}