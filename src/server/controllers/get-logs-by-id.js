const LoggerModal = require('../modals/LoggerModal');
const { GET_LOGS_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const getLogsById = async (req, res) => {
    console.log(GET_LOGS_BY_ID_CONTROLLER, `request to fetch logs for id: ${req.params.debugid}`);
    const loggerModal = new LoggerModal(req.params.debugid);
    await loggerModal.load();
    if (loggerModal.getLogs()) {
        return res.status(200).send({
            ...apiMessages.SUCCESS,
            logs: loggerModal.getLogs()
        });
    }
    return res.status(404).send({
        ...errorConstants.LOGS_NOT_FOUND
    });
};

module.exports = getLogsById;