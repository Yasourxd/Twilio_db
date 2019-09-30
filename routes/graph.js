var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');

//Get Graph Data
router.get('/:userID', function(req, res, next){
    db.close();
    db.connect().then(() => {
        db.request().query(
        `
        SELECT DISTINCT
        DAY9 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 9),
        DAY8 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 8),
        DAY7 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 7),
        DAY6 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 6),
        DAY5 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 5),
        DAY4 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 4),
        DAY3 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 3),
        DAY2 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 2),
        DAY1 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 1),
        DAY0 = (SELECT COUNT(LOGID) FROM CALLOGS WHERE DATEDIFF(DAY, DATECREATED, GETDATE()) = 0)
        FROM CALLOGS
        WHERE USERID=${req.params.userID}
        `, (err, result) => {
            if(err) console.log(err)
            var days = ["DAY9","DAY8","DAY7","DAY6","DAY5","DAY4","DAY3","DAY2","DAY1","DAY0",]
            days = days.reverse();
            var data = {
                "id": "Calls",
                "data": [
                ]
            }
            days.map((item, count=9) => {
                let d = new Date();
                d.setDate(d.getDate() - count--);
                data.data.push({"x": `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,"y": result.recordset[0][item]})
            })
            data.data = data.data.reverse();
            res.type('application/json');
                res.send({data: data})
        })
    })
})

module.exports = router;