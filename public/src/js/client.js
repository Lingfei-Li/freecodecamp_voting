
import React from "react"
import ReactDom from "react-dom"
import App from "./pages/App"
import NewPoll from "./components/NewPoll"
import ViewPoll from "./components/ViewPoll"
import Polls from "./components/Polls"
import Login from "./components/Login"
import { Router, IndexRoute, Route, hashHistory } from 'react-router'



var app = document.getElementById("app");

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Polls} />
            <Route path="/newPoll" component={NewPoll}/>
            <Route path="/viewPoll/:_id" component={ViewPoll} />
            <Route path="/login" component={Login} />
        </Route>
    </Router>
    , app);