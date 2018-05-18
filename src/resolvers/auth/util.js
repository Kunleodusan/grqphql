/**
 * Created by kunle on 5/18/18.
 */

const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../../config');
function isLoggedIn(context) {
	const authorization = context.request.get('Authorization');
	if(!authorization || validator.isEmpty(authorization)) {
		throw  new Error("Not logged in");
	}

	const token = authorization.replace("Bearer ", '');
	const {userId} = jwt.verify(token, config.app_secret);
	return userId;
}
module.exports = {
	isLoggedIn
};