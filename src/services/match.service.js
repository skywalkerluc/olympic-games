const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Match } = require('../models');

const queryMatches = async (filter) => {
	const { sport } = filter;
	const query = {};
	if (sport) {
		query.sport = sport;
	}
	return Match.find(query).sort({ matchStart: -1 });
};

const createMatch = async (matchBody) => {
	const { teamA, teamB, stage, matchStart, matchEnd, location } = matchBody;

	if (!Match.allowSameCountriesByStage(teamA, teamB, stage)) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'You can`t add same country representatives unless at Semifinals or Finals stage'
		);
	}

	if (!Match.isDurationValid(matchStart, matchEnd)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'A match must have at least 30 minutes defined as duration');
	}

	if (await Match.maxDailyMatchesReached(matchStart, location, 4)) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Max number of matches scheduled to same location. Please choose another date or place'
		);
	}

	if (!(await Match.conditionsAllowed(matchBody))) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Selected conditions for a match not allowed');
	}

	const match = await Match.create(matchBody);
	return match;
};

module.exports = {
	createMatch,
	queryMatches,
};
