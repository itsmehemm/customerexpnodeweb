const cache = require('../cache');
const mongoClient = require('../mongo/mongodb');
const {
    COLLECTION,
    KEY
} = require('../lib/constants/mongo-constants');
const { LOGGER_MODAL } = require('../lib/constants/logging-constants');

class LoggerModal {
    constructor(debugId) {
        this.debug_id = debugId;
        this.logs = null;
    }

    async load() {
        console.log(LOGGER_MODAL, `loading logs from database for debugid: ${this.debug_id}`);
        if (!this.debug_id) {
            console.log(LOGGER_MODAL, `invalid debugid`);
            this.logs = null;
            return;
        }
        this.logs = await new Promise(resolve => mongoClient.connection(db => {
            db.
                collection(COLLECTION.DEBUG_LOG)
                .find({
                    [KEY.DEBUG_ID]: this.debug_id
                })
                .toArray()
                .then(result => {
                    if (Array.isArray(result) && result.length === 1) {
                        return resolve(result[0].logs);
                    }
                    return resolve(null);
                }).catch(() => resolve(null));
        }));
        return;
    }

    async persist() {
        console.log(LOGGER_MODAL, `persisting logs in database for debugid: ${this.debug_id}`);
        this.logs = cache.get(this.debug_id);
        const status = await new Promise(resolve => mongoClient.connection(db => {
            db.
                collection(COLLECTION.DEBUG_LOG)
                .insertOne({
                    [KEY.DEBUG_ID]: this.debug_id,
                    [KEY.LOGS]: this.logs
                })
                .then(() => resolve(true))
                .catch(() => resolve(false));
        }));
        if (status) {
            console.log(LOGGER_MODAL, `logs persisted in database successfully`);
        } else {
            console.log(LOGGER_MODAL, `there was an error persisting logs to database`);
        }
    }

    getLogs() { return this.logs };

    getFormattedLogs() {
        let logs = this.logs;
        logs = logs.split('\n$');
        let formattedLogs = [];
        logs.forEach(log => {
            log = log.replace('\n$', '');
            log = log.split('$$');
            let formattedLog = {};
            if (log && log.length > 0) {
                log[0] && (formattedLog.time_stamp = parseInt(log[0]));
                log.length > 1 && (formattedLog.component = log[1]);
                log.length > 2 && (formattedLog.operation = log[2]);
                log.length > 3 && (formattedLog.additional_data = log[3]);
                if (Object.keys(formattedLog).length > 0) {
                    formattedLogs.push(formattedLog);
                }
            }
        });
        return formattedLogs;
    }
};

module.exports = LoggerModal;