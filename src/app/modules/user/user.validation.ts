import { z } from 'zod';

// Define the Zod schema for the Name object
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name can't be empty" })
    .max(20, { message: "First name can't be more than 20 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name can't be empty" })
    .max(20, { message: "Last name can't be more than 20 characters" }),
});

// Define the Zod schema for the Address object
const addressValidationSchema = z.object({
  street: z
    .string()
    .min(1, { message: "Street can't be empty" })
    .max(255, { message: "Street can't be more than 255 characters" }),
  city: z
    .string()
    .min(1, { message: "City can't be empty" })
    .max(255, { message: "City can't be more than 255 characters" }),
  country: z
    .string()
    .min(1, { message: "Country can't be empty" })
    .max(255, { message: "Country can't be more than 255 characters" }),
});

// Define the Zod schema for the Order object
const orderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name can't be empty" })
    .max(255, { message: "Product name can't be more than 255 characters" }),
  price: z.number(),
  quantity: z.number(),
});

// Define the Zod schema for the User object
export const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(1, { message: "Username can't be empty" })
    .max(255, { message: "Username can't be more than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password can't be empty" })
    .max(30, { message: "Password can't be more than 30 characters" }),
  fullName: nameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.string(),
  hobbies: z
    .array(
      z
        .string()
        .min(1, { message: "Hobby can't be empty" })
        .max(255, { message: "Hobby can't be more than 255 characters" }),
    )
    .min(1),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});

export default userValidationSchema;
