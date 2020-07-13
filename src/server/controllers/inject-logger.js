const uniqid = require('uniqid');
const args = require('yargs').argv;
const cache = require('../cache');
const LoggerModal = require('../modals/LoggerModal');
const {
    X_TINNAT_SECURITY_CONTEXT,
    X_TINNAT_DEBUG_ID,
    API,
    WEB
} = require('../lib/constants');
const WOWO_DEV_OUTPUT_LOGS = args.WOWO_DEV_OUTPUT_LOGS;

const injectLogger = (req, res, next) => {
    const securityContext = JSON.parse(req && req.headers && req.headers[X_TINNAT_SECURITY_CONTEXT] || '{}');
    let debugId = uniqid('d-').toLowerCase();
    if (securityContext && securityContext.debugId) {
        debugId = securityContext.debugId;
    }
    req.debugId = debugId;
    let _consoleLog;
    if (!_consoleLog) {
        _consoleLog = console.log;
    }
    console.log = function () {
        let args = Array.from(arguments);
        let log = {};
        log.status = 0;
        log.time_stamp = new Date().getTime();
        if (args.length > 0) {
            log.component = args[0];
        }
        if (args.length === 2) {
            log.operation = 'LOG';
            log.additional_data = args[1];
        }
        if (args.length === 3) {
            log.operation = args[1];;
            log.additional_data = args[2];
        }
        let _logs = cache.get(debugId) || [];
        _logs.push(log);
        cache.put(debugId, _logs);
        if (WOWO_DEV_OUTPUT_LOGS === true) {
            _consoleLog.apply(console, args);
        }
    };
    let _consoleInfo;
    if (!_consoleInfo) {
        _consoleInfo = console.info;
    }
    console.info = function () {
        let args = Array.from(arguments);
        let log = {};
        log.status = 1;
        log.time_stamp = new Date().getTime();
        if (args.length > 0) {
            log.component = args[0];
        }
        if (args.length === 2) {
            log.operation = 'INFO';
            log.additional_data = args[1];
        }
        if (args.length === 3) {
            log.operation = args[1];;
            log.additional_data = args[2];
        }
        let _logs = cache.get(debugId) || [];
        _logs.push(log);
        cache.put(debugId, _logs);
        if (WOWO_DEV_OUTPUT_LOGS === true) {
            _consoleInfo.apply(console, args);
        }
    };
    let _consoleWarn;
    if (!_consoleWarn) {
        _consoleWarn = console.warn;
    }
    console.warn = function () {
        let args = Array.from(arguments);
        let log = {};
        log.status = 2;
        log.time_stamp = new Date().getTime();
        if (args.length > 0) {
            log.component = args[0];
        }
        if (args.length === 2) {
            log.operation = 'WARNING';
            log.additional_data = args[1];
        }
        if (args.length === 3) {
            log.operation = args[1];;
            log.additional_data = args[2];
        }
        let _logs = cache.get(debugId) || [];
        _logs.push(log);
        cache.put(debugId, _logs);
        if (WOWO_DEV_OUTPUT_LOGS === true) {
            _consoleWarn.apply(console, args);
        }
    };
    let _consoleError;
    if (!_consoleError) {
        _consoleError = console.error;
    }
    console.error = function () {
        let args = Array.from(arguments);
        let log = {};
        log.status = 3;
        log.time_stamp = new Date().getTime();
        if (args.length > 0) {
            log.component = args[0];
        }
        if (args.length === 2) {
            log.operation = 'ERROR';
            log.additional_data = args[1];
        }
        if (args.length === 3) {
            log.operation = args[1];;
            log.additional_data = args[2];
        }
        let _logs = cache.get(debugId) || [];
        _logs.push(log);
        cache.put(debugId, _logs);
        if (WOWO_DEV_OUTPUT_LOGS === true) {
            _consoleError.apply(console, args);
        }
    };
    res.set(X_TINNAT_DEBUG_ID, debugId);
    const _resStatus = res.status;
    res.status = function (statusCode) {
        console.log(API, 'status_code', statusCode);
        const loggerModal = new LoggerModal(debugId);
        loggerModal.persist();
        return _resStatus.call(this, statusCode);
    };
    const _resSendFile = res.sendFile;
    res.sendFile = function (file) {
        console.log(WEB, 'response', `rendering view: ${file}`);
        const loggerModal = new LoggerModal(debugId);
        loggerModal.persist();
        return _resSendFile.call(this, file);
    }
    const _resRedirect = res.redirect;
    res.redirect = function (url) {
        console.log(WEB, 'redirect_url', url);
        const loggerModal = new LoggerModal(debugId);
        loggerModal.persist();
        return _resRedirect.call(this, url);
    }
    return next();
};

module.exports = injectLogger;