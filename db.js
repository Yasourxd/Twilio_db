const sql = require('mssql/msnodesqlv8')

const db = new sql.ConnectionPool({
    database: 'master',
    server: '(LocalDB)\\Twilio',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
    pool: {
        max: 1000,
        min: 0,
        idleTimeoutMillis: 30000,
        autostart:false,
        idle: 10000,
        acquire: 10000,
        evict: 60000,
        handleDisconnects: true
    }
})

module.exports = db;