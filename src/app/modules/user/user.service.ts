import UserModel from './user.model';
import { User } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

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

// const updateUserInDB = async (userId: string, updatedUserData: User) => {
//   try {
//     if (updatedUserData.password) {
//       updatedUserData.password = await bcrypt.hash(
//         updatedUserData.password,
//         Number(config.bcrypt_salt_rounds),
//       );
//     }

//     // Find the user before the update
//     const existingUser = await UserModel.findOne({ userId });

//     // Update the user
//     const result = await UserModel.findOneAndUpdate(
//       { userId },
//       updatedUserData,
//       {
//         new: true,
//       },
//     );

//     if (!result) {
//       throw new Error('User not found');
//     }

//     // Compare the updated user with the existing user to determine the modified fields
//     const modifiedFields: string[] = [];
//     Object.keys(updatedUserData).forEach((key) => {
//       if (existingUser[key] !== updatedUserData[key]) {
//         modifiedFields.push(key);
//       }
//     });

//     if (modifiedFields.length === 0) {
//       throw new Error('No fields were updated');
//     }

//     return { user: result, modifiedFields };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// delete user information
const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

// add new product to order in db by user id

// const addNewProductToOrderInDB = async (
//   userId: string,
//   productName: string,
//   price: number,
//   quantity: number,
// ) => {
//   const user = await UserModel.findOne({ userId });
//   if (!user) {
//     return null;
//   }
//   if (!user.orders) {
//     user.orders = [];
//   }
//   user.orders.push({
//     productName,
//     price,
//     quantity,
//   });
//   await user.save();
//   return user;
// };

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

    // Add the new product to the order list
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
