declare namespace Express {
  interface Request {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
      profilePicture: string;
      createdAt: string;
      isActive: boolean;
    }
  }
}
