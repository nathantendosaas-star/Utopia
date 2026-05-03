import { z } from 'zod';

export const ProductSpecSchema = z.object({
  gsm: z.string().optional(),
  composition: z.string().optional(),
  fit: z.string().optional(),
  modelHeight: z.string().optional(),
  modelSize: z.string().optional(),
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
  image: z.string().url().or(z.string().startsWith('/')),
  secondaryImage: z.string().url().or(z.string().startsWith('/')).optional(),
  images: z.array(z.string()),
  video: z.string().optional(),
  category: z.string().optional(),
  badge: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  specs: ProductSpecSchema.optional(),
  description: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userName: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  status: z.enum(['pending', 'approved']),
  createdAt: z.any(), // Firebase Timestamp
});

export const OrderItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
});

export const OrderSchema = z.object({
  id: z.string(),
  date: z.string(),
  items: z.array(OrderItemSchema),
  total: z.number().nonnegative(),
});

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  orders: z.array(OrderSchema),
  prestigePoints: z.number().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CartItem = z.infer<typeof OrderItemSchema>;
export type User = z.infer<typeof UserSchema>;
export type ProductSpecs = z.infer<typeof ProductSpecSchema>;
