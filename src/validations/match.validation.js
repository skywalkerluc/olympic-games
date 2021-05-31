const Joi = require('joi');

const filterMatches = {
	query: Joi.object().keys({
		sport: Joi.string().lowercase(),
	}),
};

const saveMatch = {
	body: Joi.object().keys({
		sport: Joi.string().lowercase().required(),
		location: Joi.string().lowercase().required(),
		teamA: Joi.string().lowercase().required(),
		teamB: Joi.string().lowercase().required(),
		matchStart: Joi.date().required(),
		matchEnd: Joi.date().greater(Joi.ref('matchStart')).required(),
		stage: Joi.string()
			.lowercase()
			.valid('eliminatórias', 'oitavas de final', 'quartas de final', 'semifinal', 'final')
			.required(),
	}),
};

module.exports = {
	filterMatches,
	saveMatch,
};
