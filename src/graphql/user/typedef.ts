import { mutations } from "./mutations";
import { queries } from "./queries";

export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String! 
    email: String!
  }
  type Query {
    ${queries}
  }
  type Mutation {
    ${mutations}
  }
`;
