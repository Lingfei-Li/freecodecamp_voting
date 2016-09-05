import React from "react"
import * as axios from 'axios'
import {browserHistory} from 'react-router'


export default class NewPoll extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "",
            options: ""
        };
    }

    updateTitle(e) {
        const title = e.target.value;
        this.setState({title});
    }

    updateOptions(e) {
        const options = e.target.value;
        this.setState({options});
    }

    submit() {
        const optionsArray = this.state.options.split(',')
            .filter((optionTitle)=> {
                return optionTitle.trim().length != 0;
            })
            .map((optionTitle)=> {
                var option = {
                    title: optionTitle.trim(),
                    vote: []
                };
                return option;
            });
        const poll = {
            title: this.state.title,
            options: optionsArray
        };
        console.log(poll);
        axios.post('/api/polls', poll)
            .then((response)=> {
                console.log("success: " + response.data);
                this.props.history.pushState(null, '/');
            })
            .catch((err)=> {
                alert(err);
            });
    }

    render() {
        return (
            <div>
                <h2>Save even more lives?</h2>
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input class="form-control input-sm" id="title" type="text" value={this.state.title}
                           onChange={this.updateTitle.bind(this)}/>
                </div>
                <div class="form-group">
                    <label for="options">Options (separate with commas):</label>
                    <input class="form-control input-sm" id="options" type="text" value={this.state.options}
                           onChange={this.updateOptions.bind(this)}/>
                </div>
                <div class="form-group">
                    <button className="btn btn-default" onClick={this.submit.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}
