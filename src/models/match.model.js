const mongoose = require('mongoose');
const { setTimeToZero, getDatePlusNDays } = require('../utils/dateFixer');

const matchSchema = mongoose.Schema(
	{
		sport: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
		},
		teamA: {
			type: String,
			required: true,
			lowercase: true,
		},
		teamB: {
			type: String,
			required: true,
			lowercase: true,
		},
		matchStart: {
			type: Date,
			required: true,
		},
		matchEnd: {
			type: Date,
			required: true,
		},
		stage: {
			type: String,
			lowercase: true,
			required: true,
		},
	},
	{ timestamps: true }
);

matchSchema.statics.conditionsAllowed = async function () {
	// date comparison was not working here, something related to datetime format.
	// at robo 3t for mongo the query was going well
	// db.getCollection('matches').find({ matchStart: { $gte: ISODate('2021-06-01 11:47:30.120Z'), $lt: ISODate('2021-06-01 12:30:30.120Z') }, matchEnd: { $gte: ISODate('2021-06-01 11:47:30.120Z'), $lt: ISODate('2021-06-01 12:30:30.120Z') }, location: 'aflitos', sport: 'soccer'})
	return true;
};

matchSchema.statics.isDurationValid = (matchStart, matchEnd, minDuration = 30) => {
	const start = new Date(matchStart);
	const end = new Date(matchEnd);

	const durationInMinutes = (end - start) / 60000;
	return durationInMinutes > minDuration;
};

const isFinalStages = (stage) => stage === 'semifinal' || stage === 'final';

matchSchema.statics.allowSameCountriesByStage = (teamA, teamB, stage) => {
	return teamA === teamB ? isFinalStages(stage) : false;
};

matchSchema.statics.maxDailyMatchesReached = async function (matchStart, location, maxMatches = 4) {
	const referenceDate = setTimeToZero(matchStart);
	const nextDate = getDatePlusNDays(referenceDate, 1);

	const matches = await this.find({
		matchStart: {
			$gte: referenceDate,
			$lt: nextDate,
		},
		location,
	});

	return matches.length >= maxMatches;
};

const Match = mongoose.model('matches', matchSchema);

module.exports = Match;
