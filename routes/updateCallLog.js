var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Update Call Log
router.post('/:callSID/:status/:subID?', function(req, res, next){
    db.close();
    db.connect().then(() => {
        var queryText = 
        `
        UPDATE CALLOGS
        SET CALLSTATUS = '${req.params.status}'
        `
        if(req.params.subID){
            queryText += `, SUBID = '${req.params.subID}'`
        }
        queryText += ` WHERE CALLSID= '${req.params.callSID}'`

        db.request().query(queryText, (err, result) => {
            if(err){
                console.log(err);
            }
            res.send("Call log is updated!")
        })
    })
})

module.exports = router;