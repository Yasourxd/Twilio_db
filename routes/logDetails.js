var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Twili Voice Call Data import
const accountSid = require('../env2').accountSid;
const authToken = require('../env2').authToken;
const phoneNumber = require('../env2').phoneNumber;
const agent = require('../env2').agent;
const twLink = require('../env2').twLink;
const client = require('twilio')(accountSid, authToken);

//Twilio Call log Information
router.get('/:callSID', function(req, res, next){
    
    client.calls(req.params.callSID)
           .fetch()
           .then(call => {
                res.type('application/json');
                res.send({data: call});
            })
    
})

module.exports = router;