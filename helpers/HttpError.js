const errorMessageList = {
    '400': 'Email or password is incorrect',
    '401': 'Not authorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '409': 'Conflict',
    '500': 'Internal Server Error',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
};


const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;
