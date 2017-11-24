import React from 'react'
import {Route, IndexRedirect} from "react-router";
import Main from "./Components/Main";

import Dashboard from './Components/Dashboard/Dashboard';
import DashboardContent from './Components/Dashboard/DashboardContent';

import Analysis from './Components/Analysis/Analysis';
import Transaction from './Components/Analysis/Transaction';
import TotalRevenue from './Components/Analysis/TotalRevenue';
import PaymentType from './Components/Analysis/PaymentType';
import A_PaymentChannel from './Components/Analysis/PaymentChannel';

import Apps from './Components/Apps/Apps';
import AppsContent from './Components/Apps/AppsContent';

import Pay from './Components/Pay/Pay';
import PaymentChannel from './Components/Pay/PaymentChannel';
import PaymentRank from './Components/Pay/PaymentRank';

import User from './Components/User/User';
import UserContent from './Components/User/UserContent';

import Account from './Components/Account/Account';
import AccountContent from './Components/Account/AccountContent';

export default (
    <Route path="/" component={Main}>
        <IndexRedirect to="Dashboard/DashboardContent"/>
            <Route path="Dashboard" component={Dashboard}>
                <Route path="/Dashboard/DashboardContent" component={DashboardContent}/>
            </Route>
            <Route path="Analysis" component={Analysis}>
                <Route path="/Analysis/Transaction" component={Transaction}/>
                <Route path="/Analysis/TotalRevenue" component={TotalRevenue}/>
                <Route path="/Analysis/PaymentType" component={PaymentType}/>
                <Route path="/Analysis/PaymentChannel" component={A_PaymentChannel}/>
            </Route>
            <Route path="Apps" component={Apps}>
                <Route path="/Apps/AppsContent" component={AppsContent}/>
            </Route>
            <Route path="Pay" component={Pay}>
                <Route path="/Pay/PaymentChannel" component={PaymentChannel}/>
                <Route path="/Pay/PaymentRank" component={PaymentRank}/>
            </Route>
            <Route path="User" component={User}>
                <Route path="/User/UserContent" component={UserContent}/>
            </Route>
            <Route path="Account" component={Account}>
                <Route path="/Account/AccountContent" component={AccountContent}/>
            </Route>
    </Route>
)
