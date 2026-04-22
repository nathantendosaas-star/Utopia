export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  video?: string;
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
    images: [
      "/shirt-1.jpg",
      "/shirt-2.jpg",
      "/shirt-3.jpg",
      "/shirt-4.jpg",
      "/hero-img.jpg",
      "/hero-desktop.png"
    ],
    video: "/hero-video.mp4",
    category: "Shirts",
    badge: "THE SIGNATURE",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    specs: {
      gsm: "220GSM",
      composition: "100% Cotton",
      fit: "Oversized Fit",
      modelHeight: "184cm",
      modelSize: "Medium"
    },
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  }
];
