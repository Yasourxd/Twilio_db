var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Add Form Number
router.post('/:userID/:formID', function(req,res,next){
    db.close();
    db.connect().then(() => {
        var queryText = `INSERT INTO FORMNUMBERS (FORMNUMBER, USERID, PHONEID) VALUES`;
        for(var i=0;i<req.body.notAddNum.length;i++){
            if(req.body.selectedNum[i]){
                queryText += `('${req.params.formID}', ${parseInt(req.params.userID)}, ${parseInt(req.body.notAddNum[i].ID)}),`
            }
        }
        console.log("body", queryText.slice(0,-1));
        db.request().query(queryText.slice(0,-1), (err, result) =>{
            res.send("add is done!");
            if(err){
                console.log(err);
            }
        })
    })
})

module.exports = router;