import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import createApolloGraphQLServer from "./graphql";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "hello threads" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphQLServer()));

  app.listen(PORT, () => console.log(`http://localhost:${PORT} 🚀`));
}

init();
