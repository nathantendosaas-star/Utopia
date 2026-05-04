export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
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
    secondaryImage: "/shirt-2.jpg",
    images: [
      "/shirt-1.jpg",
      "/shirt-2.jpg",
      "/shirt-3.jpg",
      "/shirt-4.jpg",
      "/hero-img.jpg",
      "/hero-desktop.png"
    ],
    video: "/hero-video.mp4",
    category: "SHIRTS",
    badge: "THE SIGNATURE",
    colors: ["BLACK"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    specs: {
      gsm: "220GSM",
      composition: "100% COTTON",
      fit: "OVERSIZED FIT",
      modelHeight: "184CM",
      modelSize: "MEDIUM"
    },
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  },
  { 
    id: '2', 
    name: "UTOPIA SIGNATURE T-SHIRT", 
    price: 40000, 
    image: "/shirt-3.jpg", 
    secondaryImage: "/shirt-4.jpg",
    images: ["/shirt-3.jpg", "/shirt-4.jpg"],
    category: "SHIRTS",
    badge: "ARCHIVE",
    colors: ["VINTAGE WHITE"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      gsm: "240GSM",
      composition: "100% ORGANIC COTTON",
      fit: "BOX CUT",
    },
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  },
  { 
    id: '3', 
    name: "UTOPIA SIGNATURE T-SHIRT", 
    price: 40000, 
    image: "/hero-img.jpg", 
    secondaryImage: "/shirt-1.jpg",
    images: ["/hero-img.jpg", "/shirt-1.jpg"],
    category: "SHIRTS",
    badge: "NEW SEASON",
    colors: ["MIDNIGHT BLACK"],
    sizes: ["M", "L", "XL"],
    specs: {
      gsm: "450GSM",
      composition: "80% COTTON, 20% POLYESTER",
      fit: "HEAVY OVERSIZED",
    },
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  },
  { 
    id: '4', 
    name: "UTOPIA SIGNATURE T-SHIRT", 
    price: 40000, 
    image: "/shirt-2.jpg", 
    secondaryImage: "/shirt-3.jpg",
    images: ["/shirt-2.jpg", "/shirt-3.jpg"],
    category: "SHIRTS",
    colors: ["CHARCOAL"],
    sizes: ["S", "M", "L", "XL"],
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  },
  { 
    id: '6', 
    name: "UTOPIA SIGNATURE T-SHIRT", 
    price: 40000, 
    image: "/shirt-4.jpg", 
    images: ["/shirt-4.jpg"],
    category: "SHIRTS",
    colors: ["BLACK", "GREY", "NAVY"],
    description: "The Utopia Signature T-Shirt in premium cotton is crafted from luxury medium weight fabric. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our signature Utopia branding to the chest and back. Engineered for the streets of Kampala, refined for the world."
  }
];
