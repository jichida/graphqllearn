const { ApolloServer, gql } =  require("apollo-server-express");
const express =  require("express");
const mongoose =  require( "mongoose");
const cors = require('cors');
const schema = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs:schema,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://yc.i2u.top/graphqllearn", {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();