
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
        type: Array,
        required: false
    }
});

var Poll = module.exports = mongoose.model('poll', pollSchema);

module.exports.getAllPolls = (callback) => {
    Poll.find(callback);
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
