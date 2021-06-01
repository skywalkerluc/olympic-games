const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { matchService } = require('../services');

const getScheduledMatches = catchAsync(async (req, res) => {
	const queriedMatches = await matchService.queryMatches(req.query);

	if (queriedMatches.length > 0) return res.status(httpStatus.OK).send(queriedMatches);
	res.status(httpStatus.NO_CONTENT).send({});
});

const saveMatch = catchAsync(async (req, res) => {
	const match = await matchService.createMatch(req.body);
	res.status(httpStatus.CREATED).send(match);
});

module.exports = {
	getScheduledMatches,
	saveMatch,
};
