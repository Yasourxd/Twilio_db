var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Add numbers
router.get('/:userID/:FNAME/:LNAME/:PHONE', function(req, res, next) {
    let userID = parseInt(req.params.userID);
    const {FNAME, LNAME, PHONE} = req.params;
    console.log(req.params);
    console.log(userID)
    console.log("here");
    db.close();
    db.connect().then(() => {
    db.request().query(
        `INSERT INTO CONTACTLIST (USERID, FNAME, LNAME, PHONE)
        VALUES (${userID}, '${FNAME}', '${LNAME}', '${PHONE}')`, (err, result) => {
            if(err){
                res.send(err);
                console.log(`INSERT INTO CONTACTLIST (USERID, FNAME, LNAME, PHONE) VALUES (${userID}, '${req.params.FNAME}', '${req.params.LNAME}', '${req.params.PHONE}')`)
            }else{
                res.type('text/html')
                res.send('Number is added.')
            }
        })
    })
});

module.exports = router;