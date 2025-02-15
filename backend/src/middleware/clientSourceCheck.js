

// this is the middleware thhat will check the client source

const sourceCheckMiddleware = (req, res, next) => {
    const clientSource = req.headers['x-client-source'];

   
    console.log('Source de la requête:', clientSource);

    if (clientSource === 'carambar-frontend') {
        next();
    } else {
        res.status(403).json({
            status: 'error',
            message: 'Source non autorisée'
        });
    }
};

export default sourceCheckMiddleware;