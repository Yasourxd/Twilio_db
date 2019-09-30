var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Add Call Log
router.post('/:callStatus/:formID/:userID/:callSID', function(req, res, next){
    db.close();
    db.connect().then(() => {
        db.request().query(
            `
            INSERT INTO CALLOGS (CALLSTATUS, FORMID, USERID, CALLSID)
            VALUES ('${req.params.callStatus}', ${req.params.formID}, ${req.params.userID}, '${req.params.callSID}')
            `,
            (err, result) => {
                if(err){
                    console.log(err);
                }
                res.send("Call log is added.")
            }
        )
    })
})

module.exports = router;