var express = require('express');
var router = express.Router();
var Poll = require('../model/Poll');
var uuid = require('uuid');


/**
 * Get all polls
* */
router.get('/', (req, res) => {
    Poll.getAllPolls((err, data)=>{
        if(err) throw err;
        res.send(JSON.stringify(data));
    });
});

/**
 * Get poll by id
 * */
router.get('/:_id', (req, res) => {
    Poll.findPollById(req.params._id, (err, data)=>{
        if(err) throw err;
        res.json(data);
    });
});

/**
 * Create a new poll
 * */
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

const validatePollOption = (option)=>{
    if(option.title === undefined || option.vote === undefined){
        throw new Error("Poll Option format is invalid. Title or Vote field is missing");
    }
    option._id = uuid.v4();
};

/**
 * Delete all posts
 * */
router.delete('/', (req, res)=>{
    Poll.deleteAllPolls((err)=>{
        if(err) throw err;
        res.send('all polls deleted');
    });
});

/**
 * Delete post by id
 * */
router.delete('/:_id', (req, res)=>{
    const _id = req.params._id;
    Poll.deletePollsById(_id, (err)=>{
        if(err) throw err;
        res.send('poll id= ' +_id+ ' deleted');
    });
});

/**
 * Vote for a poll's option
 * */
router.put('/:_id/:option_id/:userId', (req, res)=>{
    const _id = req.params._id;
    const option_id = req.params.option_id;
    const userId = req.params.userId;
    Poll.voteOption(_id, option_id, userId, (err)=>{
        if(err) {
            if(err.name == "DuplicatedVoteError"){
                res.status(400).send(err.message);
            }
            else {
                res.status(500).send("Server Error");
            }
        }
        else {
            res.send("success");
        }
    });
});



module.exports = router;
