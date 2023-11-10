import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken";

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = randomBytes(32).toString("hex");

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: this.generateHash(salt, password),
        salt,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findFirst({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;

    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("user not found");
    const userSalt = user.salt;

    const usersHashPassword = this.generateHash(userSalt, password);
    if (usersHashPassword != user.password)
      throw new Error("Incorrect password");

    const token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY ?? "SECRET_KEY"
    );
    return token;
  }
}

export default UserService;
