import { Schema, model } from 'mongoose';
import { User, Order, Name, Address } from './user.interface';

const orderSchema = new Schema<Order>({
  productName: String,
  price: Number,
  quantity: Number,
});

const fullNameSchema = new Schema<Name>({
  firstName: String,
  lastName: String,
});
const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  country: String,
});
const userSchema = new Schema<User>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: String,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
