import { expressMiddleware } from "@apollo/server/express4";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import createApolloGraphQLServer from "./graphql";
import UserService from "./services/users";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "hello threads" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphQLServer(), {
      context: async ({ req }) => {
        const token = req.headers.token as string;

        try {
          const user = UserService.decodeJWTToken(token);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`http://localhost:${PORT} 🚀`));
}

init();
