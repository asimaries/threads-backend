import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String
      say(name: String) : String
    }
    `, // Schema
    resolvers: {
      Query: {
        hello: () => "hey from graphql ",
        say: (_, { name }: { name: String }) => `hello ${name}`,
      },
    },
  });
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "hello threads" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`http://localhost:${PORT} 🚀`));
}

init();
