const app = require('./src/server/routes');
const PORT = process.env.PORT || 2002;

app.listen(PORT, () => { console.log(`TINNAT WEBAPP & API RUNNING ON PORT ${PORT}`) });