// models/user.model.ts
// import mongoose, { Document, Schema } from 'mongoose';
// import { Schema, model, connect } from 'mongoose';
import { Schema, model, connect } from 'mongoose';

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
};
