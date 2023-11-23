import { getUserByIdFromDB } from './user.service';
// import { getAllUsersFromDB } from './user.service';
// import { User } from './user.interface';
// import { getAllUsers, createUser } from './user.controller';
import { Request, Response } from 'express';
import UserModel from './user.model';
import { UserServices, getAllUsersFromDB } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIdFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Users is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// export const getUserById = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const user = await UserServices.getUserByIdFromDB(Number(userId));

//     if (user) {
//       res.status(200).json({
//         success: true,
//         message: 'User retrieved successfully',
//         data: user,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };

// export const getTotalPriceOfOrders = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const totalPrice = await UserService.calculateTotalPriceOfOrders(
//       Number(userId),
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Total price of orders calculated successfully',
//       data: {
//         userId: Number(userId),
//         totalPrice,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 404) {
//       res.status(404).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Something went wrong',
//         error,
//       });
//     }
//   }
// };

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  //   getUserById,
  //   getTotalPriceOfOrders,
};
