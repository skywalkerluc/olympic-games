const faker = require('faker');
const Match = require('../../src/models/match.model');

const matchOne = {
	sport: 'Soccer',
	location: faker.address.county(),
	teamA: faker.address.country(),
	teamB: faker.address.country(),
	matchStart: '2021-06-01 11:47:30.120Z',
	matchEnd: '2021-06-01 12:30:30.120Z',
	stage: 'semifinal',
};

const matchTwo = {
	sport: 'Tennis',
	location: faker.address.county(),
	teamA: faker.address.country(),
	teamB: faker.address.country(),
	matchStart: '2021-06-01 11:47:30.120Z',
	matchEnd: '2021-06-01 12:30:30.120Z',
	stage: 'semifinal',
};

const insertMatches = async (matches) => {
	await Match.insertMany(matches);
};

module.exports = {
	matchOne,
	matchTwo,
	insertMatches,
};
