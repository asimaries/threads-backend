const queries = {
  hello: async (_: any, {}: {}) => {
    return "hello";
  },
};

const mutations = {
  createUser: async (_: any, {}: {}) => {
    return "randomid";
  },
};

export const resolvers = { queries, mutations };
