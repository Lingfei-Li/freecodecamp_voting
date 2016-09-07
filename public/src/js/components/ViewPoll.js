import React from "react"
import * as axios from "axios"
import cookie from "react-cookie"
import rd3 from "react-d3"

export default class ViewPoll extends React.Component {
    constructor() {
        super();
        this.state = {
            poll: {
                title:"Loading...",
                options: []
            }
        };
    }

    componentDidMount() {
        const _id = this.props.params._id;
        this.loadPoll(_id);
    }
    
    loadPoll(_id) {
        axios.get(`api/polls/${_id}`)
            .then((res)=> {
                this.setState({poll: res.data[0]});
            }).catch((res)=> {
            console.log(res);
        });
    }
    
    deletePoll() {
        axios.delete(`api/polls/${this.state.poll._id}`)
            .then(()=> {
                this.props.history.pushState(null, '/');
            }).catch((res)=> {
            console.log(res);
        });
    }
    
    vote(option_id) {
        const userId = cookie.load("userId");
        console.log("userId:" + userId);
        if(userId === undefined) {
            alert("Please login");
            return;
        }
        axios.put(`api/polls/${this.state.poll._id}/${option_id}/${userId}`)
            .then(()=> {
                this.loadPoll(this.state.poll._id);
            }).catch((error)=> {
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }
    
    editPoll() {
        alert("No way~");
    }
    
    render() {
        const optionsComponents = this.state.poll.options.map((option)=>{
            return (
                <li key={option._id}>
                    <a onClick={()=>{this.vote(option._id)}}>
                        <span>{option.title}</span>
                        {/*<span>{JSON.stringify(option.vote)}</span>*/}
                    </a>
                </li>
            );
        });

        var totalVote = this.state.poll.options.reduce((previousValue, option)=>{
            return previousValue+option.vote.length;
        }, 0);

        var rd3_data = this.state.poll.options.map((option)=>{
            return {label:option.title, value: (totalVote===0)?0:(option.vote.length/(totalVote)).toFixed(1)*100};
        });

        return (
            <div id="poll">
                <h2>
                    {this.state.poll.title}
                </h2>
                <div className="row">
                    <div className="col-xs-4">
                        <ul>
                            {optionsComponents}
                        </ul>
                    </div>
                    <div className="col-xs-8">
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
                <button class="btn btn-default btn-sm" onClick={this.editPoll.bind(this)}>Edit</button>
                <button class="btn btn-danger btn-sm" onClick={this.deletePoll.bind(this)}>Delete</button>
            </div>
        );
    }
}
