const fs = require('fs');
const path = require('path');
const moment = require('moment');

const Logger = (filename, log) => {
	// Get current date
	const folderName = moment().format('YYYYMMDD');

	// folder directory
	const dir = path.join('logs', folderName);

	// Check if log folder has a folder name with current date; else create
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	// write to the file path;
	const filePath = path.join(dir, filename);

	// append data to file
	const time = moment().format('YYYY-MM-DD kk:mm:ss');

	const data = time + '|' + log + '\n';

	try {
		fs.appendFileSync(filePath, data, 'utf8');
	} catch (error) {
		console.log(error);
	}
};

module.exports = Logger;
