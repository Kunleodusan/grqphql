/**
 * Created by kunle on 5/18/18.
 */
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../../config');

async function register(root, args, context, info) {
	let {email, name, password} = args.data;
	if(validator.isEmpty(email) || validator.isEmpty(name) || validator.isEmpty(password)) {
		throw  new Error("Input fields are missing.")
	}

	if(! validator.isEmail(email)) {
		throw  new Error("Enter valid email")
	}
	password = await bcrypt.hash( password, config.salt);
	const user = await context.db.mutation.createUser({ data: {email, name, password}}, `{id}`);
	const token = jwt.sign({ userId: user.id }, config.app_secret);
	return {
		token,
		user
	}
}

async function login(root, args, context, info) {
	const {email, password} = args;
	if(validator.isEmpty(email) || validator.isEmpty(password)) {
		throw  new Error("Input fields are missing.")
	}

	if(! validator.isEmail(email)) {
		throw  new Error("Enter valid email")
	}

	const user = await context.db.query.user({ where: { email: email } }, ` { id password } `);
	if (!user) {
		throw new Error('No Account found.')
	}
	// 2
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new Error('Invalid password')
	}

	const token = jwt.sign({ userId: user.id }, config.app_secret);
	return {
		token,
		user
	}
}

module.exports = {
	register,
	login
};