process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const https = require('https');
const fs = require('fs');
const app = require('./src/server/routes');
const PORT = process.env.PORT || 2002;
const HTTPS_PORT = process.env.HTTPS_PORT || 2003;

// app.listen(PORT, () => { console.log(`TINNAT WEBAPP & API RUNNING ON PORT ${PORT}`) });

https.createServer({
    key: fs.readFileSync('tinnat.key'),
    cert: fs.readFileSync('tinnat.cert'),
}, app)
    .listen(HTTPS_PORT, function () {
        console.log(`TINNAT HTTPS WEBAPP & API RUNNING ON PORT ${HTTPS_PORT}`)
    });