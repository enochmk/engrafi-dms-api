class ErrorResponse extends Error {
	constructor(message, statusCode, msisdn = null) {
		super(message);
		this.statusCode = statusCode;
		this.msisdn = msisdn;
	}
}

module.exports = ErrorResponse;
