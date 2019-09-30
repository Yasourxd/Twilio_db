var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

router.get('/:userID/:formNumberID', function(req, res, next) {
    db.close();
    db.connect().then(() => {
        db.request().query(
            `DELETE FROM FORMNUMBERS 
            WHERE FORMID = ${req.params.formNumberID}
            DELETE FROM CALLOGS
            WHERE FORMID = ${req.params.formNumberID}
            `,
            (err, result) => {
                if(err){
                    console.log(err);
                }
                res.send("Deleting is done!");
            }
        )
    })
})

module.exports = router;