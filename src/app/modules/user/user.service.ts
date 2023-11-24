import UserModel from './user.model';
import { User } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
// const createUserIntoDB = async (user: User) => {
//   const result = await UserModel.create(user);
//   return result;
// };

// const createUserIntoDB = async (userData: User) => {
//   //   const result = await UserModel.create(user);
//   const user = new User(userData);
//   if (await user.isUserExists(userData.userId)) {
//     throw new Error('User already exists');
//   }

//   return user;
// };

const createUserIntoDB = async (userData: User) => {
  try {
    // Check if the user already exists
    const existingUser = await UserModel.isUserExists(userData.userId);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // If the user doesn't exist, create a new user
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

// Add the following function for updating user information
// const updateUserInDB = async (userId: string, updatedUserData: User) => {
//   const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
//     new: true,
//   });
//   return result;
// };

const updateUserInDB = async (userId: string, updatedUserData: User) => {
  // Check if a new password is provided
  if (updatedUserData.password) {
    // Hash the new password
    updatedUserData.password = await bcrypt.hash(
      updatedUserData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  // Use findOneAndUpdate to get the updated document
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });

  // Exclude the password field from the response
  if (result) {
    result.password = '';
  }

  return result;
};

// delete user information
const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

// add new product to order in db by user id

const addNewProductToOrderInDB = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number,
) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    return null;
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
  return user;
};

const getUserOrdersFromDB = async (userId: string) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw { code: 404, description: 'User not found!' };
  }

  return user.orders;
};

// calculate total price of orders
const calculateTotalPriceOfOrders = async (userId: number): Promise<number> => {
  try {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      throw { code: 404, description: 'User not found!' };
    }

    // Calculate total price of orders
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
