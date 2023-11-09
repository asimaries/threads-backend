import { mutations } from "./mutations";
import { queries } from "./queries";

export const typeDefs = `#graphql
  type Query {
    ${queries}
  }
  type Mutation {
    ${mutations}
  }
`;
