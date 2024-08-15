const notFound = (req , res , next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.status(400);
    next(error);
}

const errorHandler = (err , req , res , next) => {
    let statussCode = res.statusCode === 200 ? 500 : res.statusCode ;
    let message = err.message;

    //Check for mongoose  bad object ID
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statussCode = 404;
        message = 'Resource not found'
    }

    res.status(statussCode).json({
            message,
            stack: process.env.NODE_ENV === 'production' ? '🃏' : err.stack
        });
};

export { notFound , errorHandler };