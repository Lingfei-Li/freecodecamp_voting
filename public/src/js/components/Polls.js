import React from 'react'
import * as axios from 'axios'
import uuid from "uuid"
import {browserHistory, Link} from "react-router"
import rd3 from "react-d3"



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

    gotoPoll(_id) {
        console.log(_id);
        this.props.history.pushState(null, `viewPoll/${_id}`);
        // browserHistory.push(`#/viewPoll/${_id}`);
    }

    render() {
        const pollsComponent = this.state.polls.map((poll)=>{
            var totalVote = poll.options.reduce((previousValue, option)=>{
                return previousValue+option.vote.length;
            }, 0);
            
            var rd3_data = poll.options.map((option)=>{
                return {label:option.title, value: (totalVote===0)?0:(option.vote.length/(totalVote)).toFixed(1)*100};
            });
            
            return (
                <div className='row well' onClick={()=>{this.gotoPoll(poll._id)}} key={poll._id} id={poll._id}>
                        <div className="col-xs-7">
                            <h3>
                                {poll.title}
                            </h3>
                        </div>
                        <div className="col-xs-5">
                            <rd3.PieChart
                                data={rd3_data}
                                width={200}
                                height={200}
                                radius={50}
                                innerRadius={20}
                                sectorBorderColor="white"
                                title=""
                            />
                            
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