import React from "react"
import {Link} from "react-router"


export default class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Vote!</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/newPoll"><span class="glyphicon glyphicon-plus"></span> New Poll</Link></li>
                        <li><Link to="/login"><span class="glyphicons glyphicons-user"></span>Login</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
