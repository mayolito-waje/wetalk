export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  profilePicture?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
