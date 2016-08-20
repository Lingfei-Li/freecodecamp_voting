var express = require('express');
var router = express.Router();
var Poll = require('../model/Poll');
var uuid = require('uuid');


router.get('/', (req, res) => {
    Poll.getAllPolls((err, data)=>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    });
});

router.post('/', (req, res)=>{
    var poll = req.body;
    poll.create_date = new Date();
    if(poll.options === undefined) {
        throw new Error("options field of the data is missing");
    }
    poll.options.forEach((option)=>{
        validatePollOption(option);
    });
    console.log(poll);
    Poll.addPoll(poll, (err, data) => {
        if(err) throw err;
        res.json(data);
    });
});

router.delete('/', (req, res)=>{
    Poll.deleteAllPolls((err)=>{
        if(err) throw err;
        res.send('all polls deleted');
    });
});

router.delete('/:_id', (req, res)=>{
    const _id = req.params._id;
    Poll.deletePollsById(_id, (err)=>{
        if(err) throw err;
        res.send('poll id= ' +_id+ ' deleted');
    });
});

const validatePollOption = (option)=>{
    if(option.title === undefined || option.vote === undefined){
        throw new Error("Poll Option format is invalid. Title or Vote field is missing");
    }
    option._id = uuid.v4();
};

module.exports = router;
