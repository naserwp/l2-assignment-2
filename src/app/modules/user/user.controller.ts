import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodValidation = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodValidation);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        'Something went wrong to create user/ User Could not be created',
      error: err,
    });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error.message ||
        'Something went wrong / all User could not be retrieved',
      error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIdFromDB(userId);

    if (!result) {
      res.status(400).json({
        success: false,
        message: 'User not found',
        data: result,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong / on the server',
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: updatedUserData } = req.body;

    const result = await UserServices.updateUserInDB(userId, updatedUserData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { user: updatedUserData } = req.body;

//     const result = await UserServices.updateUserInDB(userId, updatedUserData);

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     });
//   }
// };

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(userId);

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// add new product to order list
// const addNewProductToOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { productName, price, quantity } = req.body;

//     const result = await UserServices.addNewProductToOrderInDB(
//       userId,
//       productName,
//       price,
//       quantity,
//     );

//     if (!result) {
//       res.status(404).json({
//         success: false,
//         message: 'User not found',
//         data: null,
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: 'Order created successfully!',
//         data: null,
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

const addNewProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    const result = await UserServices.addNewProductToOrderInDB(
      userId,
      productName,
      price,
      quantity,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: result.message,
        data: { userId: result.userId },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserOrdersFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: {
        orders: result,
      },
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

// calculate total order single user by id
const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await UserServices.calculateTotalPriceOfOrders(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    // console.error(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).code === 404) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addNewProductToOrder,
  getUserOrders,
  getTotalPriceOfOrders,

  //   getTotalPriceOfOrders,
};
