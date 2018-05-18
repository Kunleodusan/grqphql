/**
 * Created by kunle on 5/18/18.
 */
const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const resolvers = Object.assign(
		{
			Query: require('./resolvers/Query'),
			Mutation: require('./resolvers/Mutation')
		},
		require('./resolvers/Type')
);

const server = new GraphQLServer({
	typeDefs: './src/application_schema.graphql',
	resolvers: resolvers,
	context: req => {
		req.db = new Prisma({
			typeDefs: './src/generated/prisma.graphql',
			endpoint: 'https://eu1.prisma.sh/public-amberhyena-808/api/dev',
			secret: 'kunle-odusan',
			debug: false
		});
		return req;
	}
});

server.start(() => console.log('Server is running on localhost:4000'));