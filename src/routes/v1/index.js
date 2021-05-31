const express = require('express');
const matchRoutes = require('./match.route');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/match',
		route: matchRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
