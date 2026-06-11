const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Server Error';
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    else if (err.name === 'MulterError') {
        statusCode = 400;
        message = err.message;
    }
    else if (err.http_code) { // Cloudinary or external API error
        statusCode = err.http_code;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
export { notFound, errorHandler };
//# sourceMappingURL=errorMiddleware.js.map