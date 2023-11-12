import { prismaClient } from "@/lib/db";
import UserService from "../../services/users";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, payload: any, context: any) => {
    if (context && context.user) {
      const user = prismaClient.user.findUnique({
        where: { id: context.user.id },
      });
      return user;
    }
    throw new Error("please login");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
