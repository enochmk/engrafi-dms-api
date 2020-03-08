const axios = require('axios');
const logger = require('../utils/logger');

const SMS = async (msisdn, message, requestID = null) => {
	const HOST = `${process.env.SMS_HOST}:${process.env.SMS_PORT}`;
	const USERNAME = process.env.SMS_USERNAME;
	const PASSWORD = process.env.SMS_PASSWORD;

	// take the last 9 characters from the msisdn
	msisdn = msisdn.substr(msisdn.length - 9);

	const URL = `http://${HOST}/send?username=${USERNAME}&password=${PASSWORD}&to=233${msisdn}&content=${message}`;

	try {
		const response = await axios.post(URL);

		// log to the file
		logger(
			'sms.log',
			`${requestID}|${msisdn}|${JSON.stringify(message)}|${response.data}`
		);

		return response;
	} catch (error) {
		// log to the file
		logger(
			'sms.log',
			`${requestID}|${msisdn}|${JSON.stringify(message)}|${JSON.stringify(
				error
			)}`
		);

		return error;
	}
};

module.exports = SMS;
