
var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        required: true
    },
    options: {
        /*
             option {
                 _id: String,
                 title: String,
                 vote: Array of userId
             }
         * */
        type: Array,
        required: false
    }
});

var Poll = module.exports = mongoose.model('poll', pollSchema);

module.exports.getAllPolls = (callback) => {
    Poll.find(callback);
};

module.exports.findPollById = (_id, callback) => {
    Poll.find({_id}, callback);
};

module.exports.voteOption = (_id, option_id, userId, callback) => {
    Poll.find({_id}, (err, result)=>{
        if(err) throw err;
        if(result.length == 0) throw new Error("Poll Not Found");
        var options = result[0].options;
        for(var i = 0; i < options.length; i ++){
            if(options[i].vote.indexOf(userId) != -1){
                console.log("duplicated votes");
                callback( {name : "DuplicatedVoteError", message : "Cannot vote for the same poll twice"} );
                return;
            }
        };
        options.forEach((option)=>{
            if(option._id == option_id) {
                option.vote.push(userId);
            }
        });
        Poll.update({_id}, {options}, callback);
    });
};

module.exports.addPoll = (poll, callback) => {
    Poll.create(poll, callback);
};

module.exports.deleteAllPolls = (callback)=>{
    Poll.find().remove(callback);
};

module.exports.deletePollsById = (_id,callback)=>{
    Poll.find({_id}).remove(callback);
};
