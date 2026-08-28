import { z } from "zod";

export const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Name is required").max(200),
    email: z.union([z.string().email("Enter a valid email"), z.literal("")]).optional(),
    phone: z.string().min(1, "Phone number is required").max(50),
    addressLine1: z.string().min(1, "Address is required").max(200),
    addressLine2: z.string().max(200).optional(),
    city: z.string().min(1, "City is required").max(100),
    state: z.string().max(100).optional(),
    postalCode: z.string().min(1, "Postal code is required").max(20),
    country: z.string().min(1).max(100).default("Pakistan"),
    note: z.string().max(1000).optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1, "Your cart is empty"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const customOrderSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(50).optional(),
  description: z.string().min(10, "Tell us a bit more about your idea").max(2000),
  budgetCents: z.number().int().min(0).optional(),
});

export type CustomOrderInput = z.infer<typeof customOrderSchema>;

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required").max(4000),
  priceRupees: z.coerce.number().min(0, "Price must be 0 or more"),
  category: z.enum([
    "EMBROIDERY",
    "CROCHET_APPAREL",
    "AMIGURUMI",
    "KEYCHAINS",
    "BAGS_ACCESSORIES",
    "FLOWERS_BOUQUETS",
    "HOME_DECOR",
    "CUSTOM",
  ]),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  isCustom: z.coerce.boolean().default(false),
  isFeatured: z.coerce.boolean().default(false),
  isActive: z.coerce.boolean().default(true),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

export const reviewSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  rating: z.coerce.number().int().min(1, "Pick a rating").max(5),
  comment: z.string().min(10, "Tell us a bit more about your experience").max(1000),
  productId: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
