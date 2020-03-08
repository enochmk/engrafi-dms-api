const express = require('express');

const { authenticateViaMSISDN } = require('../controllers/authentication');

const router = express.Router();

/**
|--------------------------------------------------
| @route 				POST auth?msisdn=XXXXXXXX
|	@params				msisdn
| @description 	authenticate user using MSISDN
|	@access 			Public
|--------------------------------------------------
*/
router.route('/').post(authenticateViaMSISDN);

module.exports = router;
