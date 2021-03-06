const ErrorResponse = require('../utils/ErrorResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${err}`);
	}

	let message = 'Server Error. Please contact admin';

	let error = { ...err };

	error.message = err.message;

	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	const MSISDN = req.query ? req.query.MSISDN : 'null';

	/* DB ERROR HANDLER */
	if (error.errorno === 'ECONNRESET') {
		message = `DB not responding.. Please try again later`;
		error = new ErrorResponse(message, 500, MSISDN);
	} else if (error.errorno === 'ETIMEDOUT') {
		message = `Request Timeout. Please try again later`;
		error = new ErrorResponse(message, 500, MSISDN);
	} else {
		// unknown error, only in development
		if (process.env.NODE_ENV !== 'production') console.log(err);
		// let errorText = JSON.stringify(error);
	}

	const errorResponse = {
		responseCode: error.statusCode || 500,
		status: 'error',
		message: error.message || 'Serverside Error. Please contact admin',
		msisdn: MSISDN,
		password: null
	};

	// log to the file
	logger(
		'errors.log',
		`${req.requestID}|${fullUrl}|${JSON.stringify(errorResponse)}`
	);

	// Return error response
	res.status(error.statusCode || 500).json(errorResponse);
};

module.exports = errorHandler;
