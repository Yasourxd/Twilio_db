var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8')
var db = require('../db');

//Update numbers
router.get('/:userID/:PHONEID/:FNAME/:LNAME/:PHONE', function(req, res, next) {
    let userID = parseInt(req.params.userID);
    let PHONEID = parseInt(req.params.PHONEID);
    const {FNAME, LNAME, PHONE} = req.params;
    db.close();
    db.connect().then(() => {
    db.request().query(
        `UPDATE CONTACTLIST
        SET FNAME = '${FNAME}', LNAME = '${LNAME}', PHONE = '${PHONE}'
        WHERE USERID = ${userID} and PHONEID = ${PHONEID}`,
        (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.type('text/html')
                res.send('Number is updated.')
            }
        })
    })
});

module.exports = router;