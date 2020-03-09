const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const errorHandler = require('./middleware/error');

dotenv.config();

const app = express();
const corsOptions = {
	origin: 'http://localhost:8682'
};
// Set server port to listen based on environment mode
const PORT = process.env.NODE_ENV === 'development' ? 5000 : 8682;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/auth', require('./routes/auth'));
app.use(errorHandler);

// greetings
app.get('/', (_, res) => {
	res.json({
		app: 'Engrafi-DMS API',
		message: `ENGRAFI-DMS API started in ${process.env.NODE_ENV} mode on port: ${PORT}`,
		description: 'Engrafi App to authenticate on new DMS DB Servers',
		author: 'Enoch Klufio, Michael Affare',
		department: 'Solutions Team',
		company: 'AirtelTigo'
	});
});

// start the server
app.listen(PORT, () =>
	console.log(
		`ENGRAFI-DMS API started in ${process.env.NODE_ENV} mode on port: ${PORT}`
	)
);
