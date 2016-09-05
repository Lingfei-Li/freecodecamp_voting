import React from "react"
import cookie from "react-cookie"


export default class ViewPoll extends React.Component {
    constructor() {
        super();
        this.state={
            user_id:"",
            cookie_user_id:""
        };
    }
    
    componentDidMount() {
        this.loadUserId();
    }
    
    changeUserId(e) {
        this.setState({user_id:e.target.value});
    }
    
    login() {
        cookie.save("userId", this.state.user_id, {path:'/'});
        this.loadUserId();
    }
    
    loadUserId(){
        const user_id = cookie.load("userId");
        this.setState({cookie_user_id:user_id});
        console.log(cookie.load("userId"));
    }
    
    render() {
        return (
            <div id="poll" class="form-group">
                <label for="userid">User Id:</label>
                <input type="text" id="userid" class="form-control" value={this.state.user_id} onChange={this.changeUserId.bind(this)} />
                <button class="btn btn-default" onClick={this.login.bind(this)}>Login</button>
                <div>
                    Current cookie for userId: {this.state.cookie_user_id}
                </div>
            </div>
        );
    }
}
