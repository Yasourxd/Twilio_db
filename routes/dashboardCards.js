var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

router.get('/:userID', function(req, res, next){
    const {userID} = req.params
    db.close();
    db.connect().then(() => {
        db.request().query(
            `SELECT DISTINCT
            TOTALCALL = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID}),
            CALL1 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 7),
            CALL2 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 14),
            TOTALNUMBER = (SELECT COUNT(PHONEID) FROM CONTACTLIST WHERE USERID = ${userID}),
            NUMBER1 = (SELECT COUNT(PHONEID) FROM CONTACTLIST WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 7),
            NUMBER2 = (SELECT COUNT(PHONEID) FROM CONTACTLIST WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 14),
            TOTALSUB = (SELECT COUNT(SUBID) FROM CALLOGS WHERE USERID = ${userID}),
            SUB1 = (SELECT COUNT(SUBID) FROM CALLOGS WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 7),
            SUB2 = (SELECT COUNT(SUBID) FROM CALLOGS WHERE USERID = ${userID} AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 14),
            TOTALFAILED = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID} AND CALLSTATUS = 'Failed'),
            FAILED1 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID} AND CALLSTATUS = 'Failed' AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 7),
            FAILED2 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE USERID = ${userID} AND CALLSTATUS = 'Failed' AND DATEDIFF(DAY, DATECREATED, GETDATE()) >= 0 AND DATEDIFF(DAY, DATECREATED, GETDATE()) <= 14)
            FROM CALLOGS WHERE USERID = ${userID}
            `,
            (err, result) => {
                res.type('application/json');
                res.send({data: result.recordset})
            }
        )
    })
})

module.exports = router;