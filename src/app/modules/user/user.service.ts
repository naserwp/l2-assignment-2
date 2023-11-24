import UserModel from './user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
// export const getUserByIdFromDB = async (userId: string): Promise<User[]> => {
//   try {
//     const users = await UserModel.findOne(
//       { userId },
//       'username fullName age email address',
//     );
//     return users;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

const getUserByIdFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// Add the following function for updating user information
const updateUserInDB = async (userId: string, updatedUserData: User) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });
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
