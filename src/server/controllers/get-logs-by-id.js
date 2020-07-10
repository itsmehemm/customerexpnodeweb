const LoggerModal = require('../modals/LoggerModal');
const { GET_LOGS_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const getLogsById = async (req, res) => {
    console.log(GET_LOGS_BY_ID_CONTROLLER, `request to fetch logs for id: ${req.params.debugid}`);
    const loggerModal = new LoggerModal(req.params.debugid);
    await loggerModal.load();
    const logs = loggerModal.getLogs();
    if (logs.length > 0) {
        return res.status(200).send({
            ...apiMessages.SUCCESS,
            logs: loggerModal.getLogs(),
            formatted: loggerModal.getFormattedLogs()
        });
    }
    return res.status(404).send({
        ...errorConstants.LOGS_NOT_FOUND
    });
};

module.exports = getLogsById;