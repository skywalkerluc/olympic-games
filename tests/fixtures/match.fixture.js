const faker = require('faker');
const Match = require('../../src/models/match.model');

const matchOne = {
	sport: 'soccer',
	location: 'Arruda',
	teamA: faker.address.country(),
	teamB: faker.address.country(),
	matchStart: '2021-06-01 12:47:30.120Z',
	matchEnd: '2021-06-01 13:30:30.120Z',
	stage: 'semifinal',
};

const matchTwo = {
	sport: 'tennis',
	location: 'Arruda',
	teamA: faker.address.country(),
	teamB: faker.address.country(),
	matchStart: '2021-06-01 11:47:30.120Z',
	matchEnd: '2021-06-01 12:30:30.120Z',
	stage: 'semifinal',
};

const matchThree = {
	...matchTwo,
	matchStart: '2021-06-01 13:47:30.120Z',
	matchEnd: '2021-06-01 14:47:30.120Z',
}

const samePlaceMatch = {
	...matchThree,
	matchStart: '2021-06-01 19:47:30.120Z',
	matchEnd: '2021-06-01 20:47:30.120Z',
}

const insertMatches = async (matches) => {
	await Match.insertMany(matches);
};

module.exports = {
	matchOne,
	matchTwo,
	matchThree,
	samePlaceMatch,
	insertMatches,
};
