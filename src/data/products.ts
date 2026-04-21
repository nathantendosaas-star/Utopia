export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  category?: string;
  badge?: string;
  colors?: string[];
  sizes?: string[];
  specs?: {
    gsm?: string;
    composition?: string;
    fit?: string;
    modelHeight?: string;
    modelSize?: string;
  };
  description?: string;
}

export const products: Product[] = [
  { 
    id: '1', 
    name: "UTOPIA SIGNATURE T-SHIRT", 
    price: 40000, 
    image: "/shirt-1.jpg", 
    secondaryImage: "/shirt-2.jpg",
    category: "Shirts",
    badge: "BESTSELLER",
    colors: ["Black", "White", "Cobalt", "Flat White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    specs: {
      gsm: "220GSM",
      composition: "100% Cotton",
      fit: "Oversized Fit",
      modelHeight: "184cm",
      modelSize: "Medium"
    },
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back."
  }
];
