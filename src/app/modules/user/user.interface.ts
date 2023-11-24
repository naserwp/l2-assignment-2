import { Model } from 'mongoose';

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type Name = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: Name;
  age: number;
  email: string;
  hobbies: string[];
  address: Address;
  orders: Order[];
  isActive: 'active' | 'blocked';
  isDeleted?: boolean;
};

export type UserMethod = {
  //   eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<User | null>;
};
export type UserModel = Model<User, Record<string, never>, UserMethod> & {
  isUserExists(userId: string): Promise<User | null>;
};

// export type UserMethod = {
//   //   eslint-disable-next-line no-unused-vars
//   isUserExists(userId: string): Promise<User | null>;
// };
// export type UserModel = Model<User, Record<string, never>, UserMethod>;
