declare namespace Express {
  interface Request {
    token: string;
    user: {
      email: string;
      username: string;
      profilePicture: string;
      createdAt: string;
      isActive: boolean;
    }
  }
}
