import UserModel from './user.model';
import { User } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

// create user into DB
const createUserIntoDB = async (userData: User) => {
  try {
    // Check if user already exists

    const existingUser = await UserModel.isUserExists(
      userData.userId.toString(),
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    // If user doesn't exist, create new user
    const newUser = await UserModel.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserByIdFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// update user in DB
const updateUserInDB = async (userId: string, updatedUserData: User) => {
  if (updatedUserData.password) {
    updatedUserData.password = await bcrypt.hash(
      updatedUserData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });

  if (result) {
    result.password = '';
  }

  return result;
};

// delete user information in DB
const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

// add new product to order into DB
const addNewProductToOrderInDB = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number,
) => {
  try {
    const user = await UserModel.findOne({ userId });

    if (!user) {
      throw { code: 404, description: 'User not found!' };
    }

    if (!user.orders) {
      user.orders = [];
    }

    user.orders.push({
      productName,
      price,
      quantity,
    });

    await user.save();

    return {
      userId: user.userId,
      message: 'Order created successfully!',
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//get user orders from DB
const getUserOrdersFromDB = async (userId: string) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw { code: 404, description: 'User not found!' };
  }

  return user.orders;
};

// calculate total price of orders in DB
const calculateTotalPriceOfOrders = async (userId: number): Promise<number> => {
  try {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      throw { code: 404, description: 'User not found!' };
    }

    const totalPrice = user.orders.reduce(
      (total, order) => total + order.price * order.quantity,
      0,
    );

    return totalPrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//export userServices
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addNewProductToOrderInDB,
  getUserOrdersFromDB,
  calculateTotalPriceOfOrders,
};
