import {combineReducers} from "redux";

import {AppReducer} from './AppReducer';
import {LoginReducer} from './LoginReducer';
import {DashboardReducer} from './DashboardReducer';
import {PaymentRankReducer} from './PaymentRankReducer';
import {UserContentReducer} from './UserContentReducer';
import {AccountContentReducer} from './AccountContentReducer';
import {PaymentChannelReducer} from './PaymentChannelReducer';
import {TransactionReducer} from  './TransactionReducer';
import {TotalRevenueReducer} from './TotalRevenueReducer';
import {PaymentTypeReducer} from './PaymentTypeReducer';

export default combineReducers({
    App: AppReducer,
    Login: LoginReducer,
    Dashboard: DashboardReducer,
    UserContent: UserContentReducer,
    PaymentRank: PaymentRankReducer,
    AccountContent: AccountContentReducer,
    PaymentChannel: PaymentChannelReducer,
    Transaction: TransactionReducer,
    TotalRevenue: TotalRevenueReducer,
    PaymentType: PaymentTypeReducer,
})