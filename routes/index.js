var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8')
var db = require('../db');

//Get all numbers
router.get('/:userID', function(req, res, next) {
  db.close();
  db.connect().then(() => {
    db.request().query(`SELECT * FROM CONTACTLIST WHERE USERID = ${req.params.userID}`, (err, result) => {
          if(err){
            console.log(err);
          }
          res.type('application/json');
          res.send({
            data: result.recordset
          })
      })
  })
});

module.exports = router;
