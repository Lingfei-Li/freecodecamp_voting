
import React from "react"
import ReactDom from "react-dom"
import App from "./pages/App"
import NewPoll from "./components/NewPoll"
import Polls from "./components/Polls"
import { Router, IndexRoute, Route, hashHistory } from 'react-router'


var app = document.getElementById("app");

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Polls}></IndexRoute>
            <Route path="newPoll" component={NewPoll}/>
        </Route>
    </Router>
, app);