const mysql = require('mysql2');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

// Create connectionPool
const pool = mysql.createPool(
	{
		host: process.env.DB_HOST_SECONDARY,
		user: process.env.DB_USER,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		connectionLimit: 50,
		multipleStatements: true,
		waitForConnections: true,
		queueLimit: 0
	},
	() =>
		console.log(
			`Connected to Database. Name: ${process.env.DB_DATABASE}. Host: ${process.env.DB_HOST}`
				.cyan.underline.bold
		)
);

// Get a connection
pool.getConnection((err, connection) => {
	if (err) {
		let message = null;

		if (err.errorno === 'PROTOCOL_CONNECTION_LOST') {
			console.error(
				'Database connection was closed.'.red.inverse.bold.underline
			);
			message = 'Database connection was closed.'.red.inverse.bold.underline;
		} else if (err.errorno === 'ER_CON_COUNT_ERROR') {
			console.error(
				'Database has too many connections.'.red.inverse.bold.underline
			);
			message = 'Database has too many connections.'.red.inverse.bold.underline;
		} else if (err.errorno === 'ECONNREFUSED') {
			console.error(
				'Database connection was refused.'.red.inverse.bold.underline
			);
			message = 'Database connection was refused.'.red.inverse.bold.underline;
		} else if (err.errorno === 'ETIMEDOUT') {
			console.error(
				'Database connection timed out.'.red.inverse.bold.underline
			);
			message = 'Database connection timed out.'.red.inverse.bold.underline;
		} else if (err.errorno === 'EHOSTUNREACH') {
			console.error('Database Unreachable.'.red.inverse.bold.underline);
			message = 'Database Unreachable.'.red.inverse.bold.underline;
		} else {
			console.log(err.message);
			message = 'Unknown database error';
			process.exit(1);
		}
	}

	if (connection) {
		console.log(
			`MySQL Connected: DB Name: ${process.env.DB_DATABASE} | Secondary DB: ${process.env.DB_HOST_SECONDARY}`
				.cyan.underline.bold
		);
		connection.release();
	}

	return;
});

module.exports = pool;
