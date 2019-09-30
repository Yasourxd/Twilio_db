var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var axios = require('axios');
var fetch = require('node-fetch')
var db = require('../db');

//Twili Voice Call Data import
const accountSid = require('../env2').accountSid;
const authToken = require('../env2').authToken;
const phoneNumber = require('../env2').phoneNumber;
const agent = require('../env2').agent;
const twLink = require('../env2').twLink;
const client = require('twilio')(accountSid, authToken);

//Get all form numbers
router.get('/:userID/:formID', function(req, res, next) {
  db.close();
  db.connect().then(() => {
    db.request().query(
        `
        SELECT DISTINCT FORMID, 
        FORMNUMBER, 
        PHONEID, 
        FNAME = (SELECT FNAME FROM CONTACTLIST WHERE PHONEID = f.PHONEID),
        LNAME = (SELECT LNAME FROM CONTACTLIST WHERE PHONEID = f.PHONEID),
        PHONE = (SELECT PHONE FROM CONTACTLIST WHERE PHONEID = f.PHONEID),
	    	CALLSTATUS = ISNULL((SELECT TOP 1 CALLSTATUS FROM CALLOGS WHERE FORMID = f.FORMID ORDER BY LOGID DESC), 'Not Started'),
        LOGID = (SELECT TOP 1 LOGID FROM CALLOGS WHERE FORMID = f.FORMID ORDER BY LOGID DESC),
        SUBID = (SELECT TOP 1 SUBID FROM CALLOGS WHERE FORMID = f.FORMID ORDER BY LOGID DESC),
        CALLSID = (SELECT TOP 1 CALLSID FROM CALLOGS WHERE FORMID = f.FORMID ORDER BY LOGID DESC)
        FROM FORMNUMBERS as f
        WHERE userID = ${req.params.userID} and FORMNUMBER = ${req.params.formID}
        `, 
        (err, result) => {
          result.recordset.forEach((item) => {
            if(item.CALLSTATUS == 'In progress' && item.CALLSID != null){
                if(twilioLogs(item.callSID)){
                  item.CALLSTATUS = "Failed"
                }
            }
          })
          
          res.type('application/json');
          res.send({data: result.recordset})
      })
  })
});

function twilioLogs (callSID){
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
