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
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: fullNameSchema,
  age: Number,
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  isActive: String,
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
