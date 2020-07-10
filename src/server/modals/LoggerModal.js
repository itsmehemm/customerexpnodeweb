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
        this.logs = [];
    }

    async load() {
        console.log(LOGGER_MODAL, `loading logs from database for debugid: ${this.debug_id}`);
        if (!this.debug_id) {
            console.log(LOGGER_MODAL, `invalid debugid`);
            this.logs = [];
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
                        return resolve(JSON.parse(result[0].logs || '[]'));
                    }
                    return resolve([]);
                }).catch(() => resolve([]));
        }));
        if (this.logs.length > 0) {
            console.log(LOGGER_MODAL, `logs found for debugid: ${this.debug_id}`);
        } else {
            console.log(LOGGER_MODAL, `logs not found for debugid: ${this.debug_id}`);
        }
        return;
    }

    async persist() {
        this.logs = cache.get(this.debug_id) || '[]';
        if (this.logs.length === 0) {
            return;
        }
        const status = await new Promise(resolve => mongoClient.connection(db => {
            db.
                collection(COLLECTION.DEBUG_LOG)
                .updateOne({
                    [KEY.DEBUG_ID]: this.debug_id
                }, {
                    [KEY.DEBUG_ID]: this.debug_id,
                    [KEY.LOGS]: JSON.stringify(this.logs)
                }, {
                    upsert: true
                })
                .then(() => resolve(true))
                .catch(() => resolve(false));
        }));
        if (status) {
            console.log(LOGGER_MODAL, `logs persisted in database successfully for debugid: ${this.debug_id}`);
        } else {
            console.log(LOGGER_MODAL, `there was an error persisting logs to database for debugid: ${this.debug_id}`);
        }
    }

    getLogs() { return this.logs };

    getFormattedLogs() {
        return this.logs;
    }
};

module.exports = LoggerModal;