/**
 * Created by kunle on 5/18/18.
 */
function events(root, args, context, info) {
	return context.db.query.events(args, info)
}

function event(root, args, context, info) {
	return context.db.query.event(args, info)
}

module.exports = {
	event,
	events
};