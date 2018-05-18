/**
 * Created by kunle on 5/18/18.
 */
const {isLoggedIn} = require('../auth/util');

function createEvent(root, args, context, info) {
	const userId = isLoggedIn(context);
	args.data.createdBy = {connect: {id: userId}};
	return context.db.mutation.createEvent({data: args.data}, info);
}

function editEvent(root, args, context, info) {
	const userId = isLoggedIn(context);
	return context.db.mutation.updateEvent(
			{
				data: args.data,
				where: {id: args.id}
			},
			info)
}

function deleteEvent(root, args, context, info) {
	const userId = isLoggedIn(context);
	return context.db.mutation.deleteEvent(
			{
				where: {id: args.id}
			},
			info)
}

module.exports = {
	createEvent,
	editEvent,
	deleteEvent
};