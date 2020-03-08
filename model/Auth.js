const secondaryDB = require('../database/DB');

const authViaMSISDN = (MSISDN, conn = secondaryDB) => {
	return new Promise((resolve, reject) => {
		const stmt = `SELECT * FROM TBL_ENGRAFI_AUTHENTICATION WHERE ACTIVATORMSISDN = ?`;

		conn.query(stmt, [MSISDN], (error, results) => {
			if (error) return reject(error);
			return resolve(results);
		});
	});
};

module.exports = {
	authViaMSISDN
};
