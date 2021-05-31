const express = require('express');
const validate = require('../../middlewares/validate');
const matchValidation = require('../../validations/match.validation');
const matchController = require('../../controllers/match.controller');

const router = express.Router();

router
	.route('/')
	.get(validate(matchValidation.filterMatches), matchController.getScheduledMatches)
	.post(validate(matchValidation.saveMatch), matchController.saveMatch);

module.exports = router;
