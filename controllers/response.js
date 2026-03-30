const response = (res, status, message, data) => {
    res.status(status).json([{
        message: message,
        data: data,
        metadata: {
            prev: null,
            next: null,
            current: null
        }
    }]);
}