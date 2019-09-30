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

//Get All Call Logs
router.post('/:userID', function(req,res, next){
    db.close();
    db.connect().catch(err => err).then(()=> {
        db.request().query(
            `SELECT LOGID, CALLSTATUS, FORMID, SUBID, CALLSID,
            FNAME = (SELECT FNAME FROM CONTACTLIST WHERE PHONEID = (SELECT PHONEID FROM FORMNUMBERS WHERE FORMID = C.FORMID)),
            LNAME = (SELECT LNAME FROM CONTACTLIST WHERE PHONEID = (SELECT PHONEID FROM FORMNUMBERS WHERE FORMID = C.FORMID)),
            PHONE = (SELECT PHONE FROM CONTACTLIST WHERE PHONEID = (SELECT PHONEID FROM FORMNUMBERS WHERE FORMID = C.FORMID)),
            FORMNUMBER = (SELECT FORMNUMBER FROM FORMNUMBERS WHERE FORMID = c.FORMID)
            FROM CALLOGS as c
            WHERE USERID = ${req.params.userID}`,
            (err, result) => {
                if(err){
                    console.log(err);
                    res.send({data: null})
                }
                result.recordset.forEach(item => {
                  if(item.CALLSTATUS == 'In progress' && item.CALLSID !=null){
                    if(twilioLogs(item.callSID)){
                      item.CALLSTATUS = "Failed"
                    }
                  }
                })
                res.type('application/json');
                res.send({data: result.recordset})
            }
        )
    })
})

function twilioLogs (callSID){
  console.log("buraya geliyor call logs with call sid twilio")
    return client.calls(`${callSID}`)
          .fetch()
          .then(call => {
          console.log(call.status)
          if(call.status == 'completed'){
            return true
          }else{
            return false
          }
        })
  }

module.exports = router;