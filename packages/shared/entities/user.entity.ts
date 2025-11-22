export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface UserWithoutPassword {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}
