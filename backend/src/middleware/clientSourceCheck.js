

// this is the middleware thhat will check the client source

const clientSourceCheck = (req, res, next) => {

    const clientSource = req.headers['X-client-source'];

    console.log(clientSource);

    if (!clientSource || clientSource != "carambar-frontend") {
        res.status(403).json({
            status: 'error',
            message: 'Forbidden',
        });
        return;
    }

    next();

}

module.exports = clientSourceCheck;