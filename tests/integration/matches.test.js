const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');
const { matchOne, matchTwo, matchThree, samePlaceMatch, insertMatches } = require('../fixtures/match.fixture');

setupTestDB();

describe('Matches routes', () => {
	describe('GET /v1/match', () => {

		test('should return 200 and apply default query param (none)', async () => {
			await insertMatches([matchOne, matchTwo]);

			const res = await request(app)
				.get('/v1/match')
				.send()
				.expect(httpStatus.OK);

			expect(res.body).toHaveLength(2);
		});

		test('should return NO Content to filter sport not existant in the base', async () => {
			await insertMatches([matchOne, matchTwo]);

			const res = await request(app)
				.get('/v1/match')
				.query({ sport: 'Basketball' })
				.send()
				.expect(httpStatus.NO_CONTENT);

			expect(res.body).toEqual({});
		});

		test('should return just 1 item to sport filtered {soccer}', async () => {
			const hockeyMatch = {
				sport: 'hockey',
				location: 'ilha do retiro',
				teamA: 'russia',
				teamB: 'canada',
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 12:30:30.120Z',
				stage: 'semifinal',
			};

			await insertMatches([matchOne, matchTwo, hockeyMatch]);

			const res = await request(app)
				.get('/v1/match')
				.query({ sport: 'hockey' })
				.send()
				.expect(httpStatus.OK);

			expect(res.body).toHaveLength(1);
			expect(res.body[0].sport).toEqual(hockeyMatch.sport);
		});
	});

	describe('POST /v1/match', () => {
		test('should get an Error when values is not provided as well', async () => {
			const newMatch = {
				sport: 'soccer',
				location: faker.address.county(),
				teamA: faker.address.country(),
				teamB: faker.address.country(),
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 12:30:30.120Z',
				stage: 'groupstage'
			};

			const res = await request(app)
				.post('/v1/match')
				.send(newMatch)
				.expect(httpStatus.BAD_REQUEST);

			expect(res.body).toBeDefined();
			expect(res.body).toEqual({
				code: 400,
				message: "\"stage\" must be one of [eliminatórias, oitavas de final, quartas de final, semifinal, final]"
			});
		});

		test('should get an Error when same teams at early stages is being provided', async () => {
			const newMatch = {
				sport: 'tennis',
				location: faker.address.county(),
				teamA: 'brazil',
				teamB: 'brazil',
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 12:30:30.120Z',
				stage: 'eliminatórias'
			};

			const res = await request(app)
				.post('/v1/match')
				.send(newMatch)
				.expect(httpStatus.BAD_REQUEST);

			expect(res.body).toBeDefined();
			expect(res.body).toEqual({
				code: 400,
				message: "You can`t add same country representatives unless at Semifinals or Finals stage"
			});
		});

		test('should not get an Error when same teams` countries are being provided', async () => {
			const newMatch = {
				sport: 'tennis',
				location: faker.address.county(),
				teamA: 'brazil',
				teamB: 'brazil',
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 12:30:30.120Z',
				stage: 'final'
			};

			const res = await request(app)
				.post('/v1/match')
				.send(newMatch)
				.expect(httpStatus.CREATED);

			expect(res.body).toBeDefined();
			expect(res.body.code).toBeUndefined();
		});

		test('should get an error when match duration is smaller than 30 minutes', async () => {
			const newMatch = {
				sport: 'soccer',
				location: faker.address.county(),
				teamA: 'canada',
				teamB: 'russia',
				matchStart: '2021-06-01 11:47:30.120Z',
				matchEnd: '2021-06-01 11:58:30.120Z',
				stage: 'final'
			};

			const res = await request(app)
				.post('/v1/match')
				.send(newMatch)
				.expect(httpStatus.BAD_REQUEST);

				expect(res.body).toEqual({
					code: 400,
					message: "A match must have at least 30 minutes defined as duration"
			});
		});

		test('should get an error when more than 4 matches are being scheduled for same day and location', async () => {
			await insertMatches([matchOne, matchTwo, matchThree, samePlaceMatch]);
			const newMatch = {
				...samePlaceMatch,
				matchStart: '2021-06-01 16:47:30.120Z',
				matchEnd: '2021-06-01 17:58:30.120Z',
			};

			const res = await request(app)
				.post('/v1/match')
				.send(newMatch)
				.expect(httpStatus.BAD_REQUEST);

				expect(res.body).toEqual({
					code: 400,
					message: 'Max number of matches scheduled to same location. Please choose another date or place'
			});
		});
	});
});
