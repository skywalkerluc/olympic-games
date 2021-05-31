/**
 * Fixing datetimes
 *
 */
const setTimeToZero = (referenceDate) => {
	const date = new Date(referenceDate).setHours(0, 0, 0, 0);
	return new Date(date);
};

const getDatePlusNDays = (referenceDate, extraDays) => {
	const date = new Date(referenceDate);
	return new Date(date.setDate(date.getDate() + extraDays));
};

module.exports = {
	setTimeToZero,
	getDatePlusNDays,
};
