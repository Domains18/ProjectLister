const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);


module.exports = asyncHandler;


async function errorHandler(err, req, res, next) {
    const statusCode = statusCode === 200 ? 500 : statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

module.exports = {errorHandler};
