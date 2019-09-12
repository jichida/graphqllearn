const { ApolloServer, gql } =  require("apollo-server-express");
const express =  require("express");
const mongoose =  require( "mongoose");
const { resolvers } =  require( "./src/resolvers");
const { typeDefs } =  require( "./src/typeDefs");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();