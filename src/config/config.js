const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		PORT: Joi.number().default(3000),
		MONGODB_URL: Joi.string(),
	})
	.unknown();

const { error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	mongoose: {
		// don't know why, but my url was not being able to get from process.env, was always pointing to an old project url here.
		// That's why I forced it here to investigate more
		url: process.env.URL,
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
