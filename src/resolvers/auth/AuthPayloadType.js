/**
 * Created by kunle on 5/18/18.
 */
function user(root, args, context, info) {
	return context.db.query.user({ where: { id: root.user.id } }, info)
}

module.exports = {
	user
};