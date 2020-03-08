const uuid = require('uuid/v4');
const logger = require('../utils/logger');
const ErrorResponse = require('../utils/ErrorResponse');
const { authViaMSISDN } = require('../model/Auth');
const asyncHandler = require('../middleware/async');
// @desc  	Authenticate user
// @route 	POST /auth?MSISDN=XXXXXXX
// @access	Public
exports.authenticateViaMSISDN = asyncHandler(async (req, res, next) => {
	let { MSISDN } = req.query;

	// invalid msisdn
	if (MSISDN.length < 9) {
		return next(new ErrorResponse(`Invalid MSISDN: ${MSISDN}`, 400), MSISDN);
	}

	// extract the last 9 digits from MSISDN : Handle 233 26 XXX XXXX | 26 XXX XXXX
	MSISDN = MSISDN.substr(MSISDN.length - 9);

	req.requestID = uuid();

	// log to the file
	logger('auth.log', `${req.requestID}|Auth|${JSON.stringify(req.query)}`);

	// no msisdn field
	if (!MSISDN) {
		return next(new ErrorResponse(`Please provide MSISDN`, 400));
	}

	// query from DB
	const result = await authViaMSISDN(MSISDN);

	// if result not found
	if (!result.length) {
		return next(new ErrorResponse(`Agent Not Present`, 404, MSISDN));
	}

	// log to the file
	logger('success.log', `${req.requestID}|Auth|${MSISDN}|`);

	res.status(200).json({
		status: 'Success',
		message: `Agent Present`,
		msisdn: MSISDN
	});
});
