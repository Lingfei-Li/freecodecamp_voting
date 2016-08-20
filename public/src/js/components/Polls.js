import React from 'react'
import * as axios from 'axios'
import uuid from "uuid"



export default class Polls extends React.Component {


    constructor() {
        super();
        this.state = {
            polls:[]
        };
        axios.get('api/polls')
            .then((res)=> {
                console.log(res.data);
                this.setState({polls: res.data});
            }).catch((res)=> {
                console.log(res);
        });
    }

    gotoPoll(e) {
        console.log(e.target.id);
    }



    render() {

        const pollsComponent = this.state.polls.map((poll)=>{
            const optionsComponent = poll.options.map((option)=>{
                return (
                    <li key={option._id}>
                        {option.title}:{option.vote}
                    </li>
                );

            });
            return (
                <div className='row well' onClick={this.gotoPoll.bind(this)} key={poll._id} id={poll._id}>
                    <div className="col-xs-6">
                        <h3>
                            {poll.title}
                        </h3>
                    </div>
                    <div className="col-xs-4">
                        A Pie Chart
                    </div>
                    <div className="col-xs-2">
                        <ul>
                            {optionsComponent}
                        </ul>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h2>Vote for equal rights, Vote for our children</h2>
                <div>
                    {pollsComponent}
                </div>
            </div>

        );
    }
}