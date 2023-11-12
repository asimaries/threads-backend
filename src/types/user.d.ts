interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

interface GetUserTokenPayload {
  email: string;
  password: string;
}
