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
// export const getAllUsersFromDB = async (): Promise<User[]> => {
//   try {
//     const users = await UserModel.find(
//       {},
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

/*
export const calculateTotalPriceOfOrders = async (
  userId: number,
): Promise<number> => {
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
*/

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};