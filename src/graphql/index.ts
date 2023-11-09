import { ApolloServer } from "@apollo/server";
import { User } from "./user";

export default async function createApolloGraphQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs: User.typeDefs, // Schema
    resolvers: {
      Query: { ...User.resolvers.queries },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await gqlServer.start();
  return gqlServer;
}
