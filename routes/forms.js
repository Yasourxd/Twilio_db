var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var db = require('../db');
var jf = require('jotform');



jf.options({
    debug: true,
    apiKey: "69144066531945e2a1979e118a0b3ddd"
});

//Get Forms
router.get('/:apiKey/:offset?', function(req, res, next) {
    jf.options({
        debug: true,
        apiKey: req.params.apiKey
    });

    jf.getForms({
        limit:20,
        offset: req.params.offset || 0
    })
    .then(function(r){
        var data = r.filter(item => item.status == "ENABLED")
        res.type('application/json');
        res.send({
            data: data
        })
    })
    
});

module.exports = router;