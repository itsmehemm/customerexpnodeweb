const uniqid = require('uniqid');
const LoggerModal = require('../modals/LoggerModal');
const { X_TINNAT_SECURITY_CONTEXT } = require('../lib/constants');
const { INJECT_LOGGER_CONTROLLER } = require('../lib/constants/logging-constants');
const cache = require('../cache');

const injectLogger = (req, res, next) => {
    console.log(INJECT_LOGGER_CONTROLLER, `injecting logger to the request`);
    const securityContext = JSON.parse(req && req.headers && req.headers[X_TINNAT_SECURITY_CONTEXT] || '{}');
    let debugId = uniqid('d-').toLowerCase();
    console.log(INJECT_LOGGER_CONTROLLER, `new debug id genereated: ${debugId}`);
    if (securityContext && securityContext.debugId) {
        console.log(INJECT_LOGGER_CONTROLLER, `received debug id in security context: ${securityContext.debugId}`);
        debugId = securityContext.debugId;
    }
    console.log(INJECT_LOGGER_CONTROLLER, `debug id for this request: ${debugId}`);
    req.debugId = debugId;
    let _consoleLog;
    if (!_consoleLog) {
        _consoleLog = console.log;
    }
    console.log = function () {
        let args = Array.from(arguments);
        const log = args.join(' ');
        let logs = cache.get(debugId);
        logs = logs + "\n" + log;
        cache.put(debugId, logs);
        _consoleLog.apply(console, args);
    };
    res.set('x-tinnat-debug-id', debugId);
    const _resStatus = res.status;
    res.status = function (statusCode) {
        new LoggerModal(debugId).persist();
        return _resStatus.call(this, statusCode);
    };
    return next();
};

module.exports = injectLogger;