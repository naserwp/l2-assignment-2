import { Schema, model } from 'mongoose';
import {
  User,
  Order,
  Name,
  Address,
  UserMethod,
  UserModel,
} from './user.interface';

const orderSchema = new Schema<Order>({
  productName: String,
  price: Number,
  quantity: Number,
});

const fullNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});
const addressSchema = new Schema<Address>({
  street: String,
  city: {
    type: String,
    required: [true, 'City  is required'],
  },
  country: {
    type: String,
    required: [true, 'Country  is required'],
  },
});

const userSchema = new Schema<User, UserModel, UserMethod>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: Number,
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  isActive: String,
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required, at list one hobbies'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [orderSchema],
});

userSchema.index({ userId: 1, username: 1, email: 1 }, { unique: true });

// userSchema.methods.isUserExists = async function (userId: string) {
//   const existingUser = await UserModel.findOne({ userId });
//   return existingUser;
// };

// Define isUserExists method on the model itself
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await this.findOne({ userId });
  return existingUser;
};

const UserModel = model<User, UserModel>('User', userSchema);

export default UserModel;
