const faker = require('faker');
const { Match } = require('../../../src/models');

describe('Match model', () => {
	describe('Match validation', () => {
		let newMatch;
		beforeEach(() => {
			newMatch = {
				sport: 'Soccer',
				location: faker.address.county(),
				teamA: faker.address.country(),
				teamB: faker.address.country(),
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 12:30:30.120Z',
				stage: 'semifinal',
			};
		});

		test('should correctly validate a valid user', async () => {
			await expect(new Match(newMatch).validate()).resolves.toBeUndefined();
		});

		test('should throw a validation error if any of the required values are not being provided', async () => {
			newMatch.stage = '';
			await expect(new Match(newMatch).validate()).rejects.toThrow();
		});
	});
});
