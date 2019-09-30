var express = require('express');
var router = express.Router();
const sql = require('mssql/msnodesqlv8')

const db = new sql.ConnectionPool({
  database: 'master',
  server: '(LocalDB)\\Twilio',
  driver: 'msnodesqlv8',
  options: {
      trustedConnection: true
  }
})

//Del numbers
router.get('/:userID/:PHONEID', function(req, res, next) {
    let userID = parseInt(req.params.userID);
    let PHONEID = parseInt(req.params.PHONEID)
    db.close();
    db.connect().then(() => {
    db.request().query(
        `DELETE FROM CONTACTLIST WHERE USERID = ${userID} and PHONEID = ${PHONEID}
         DELETE FROM FORMNUMBERS WHERE USERID = ${userID} and PHONEID = ${PHONEID}
        `, (err, result) => {
            if(err){
                res.send(err);
                
            }else{
                console.dir(result)
                res.type('text/html')
                res.send('Number is deleted.')
            }
        })
    })
});

module.exports = router;