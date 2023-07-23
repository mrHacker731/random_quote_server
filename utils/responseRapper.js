const success = (code, message) => {
    const response = {
        status: 'success',
        statusCode:code,
        response: message
    }
    return response;
};

const error = (code, message) => {
    const response = {
        status: 'error',
        statusCode:code,
        response: message
    }
    return response;
}

module.exports = {
    success,
    error
}