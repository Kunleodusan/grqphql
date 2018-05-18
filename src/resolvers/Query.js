/**
 * Created by kunle on 5/18/18.
 */
function hello(root, args, context, info) {
	return `Hello ${args.name || 'World'}`;
}

module.exports = Object.assign({},
		{hello},
	require('./event/EventQueries')
);
