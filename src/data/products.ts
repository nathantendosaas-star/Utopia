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
    name: "OWNERS' CLUB T-SHIRT - BLACK", 
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
    description: "The Owners' Club T-Shirt in black is crafted from luxury medium weight cotton. It has an oversized fit, with a ribbed crewneck collar. The t-shirt features our Owners' Club branding to the chest and back."
  },
  { 
    id: '2', 
    name: "BLANK T-SHIRT - VINTAGE GREY", 
    price: 40000, 
    image: "/shirt-2.jpg", 
    secondaryImage: "/shirt-3.jpg",
    category: "Shirts",
    badge: "RESTOCKED",
    colors: ["Vintage Grey", "Jet Black", "Cloud"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      gsm: "250GSM",
      composition: "100% Cotton",
      fit: "Boxy Fit",
      modelHeight: "189cm",
      modelSize: "Large"
    },
    description: "The Blank T-Shirt in vintage grey is a boxy fit t-shirt, crafted from a heavy weight jersey cotton. It is pre-shrunk and piece dyed for a vintage look and feel."
  },
  { 
    id: '3', 
    name: "UTOPIA GRAPHIC T-SHIRT - BONE", 
    price: 40000, 
    image: "/shirt-3.jpg", 
    secondaryImage: "/shirt-4.jpg",
    category: "Shirts",
    badge: "NEW DROP",
    colors: ["Bone"],
    sizes: ["M", "L", "XL"],
    specs: {
      gsm: "230GSM",
      composition: "100% Cotton",
      fit: "Oversized Fit",
      modelHeight: "184cm",
      modelSize: "Medium"
    },
    description: "Crafted for the streets of Kampala. The Utopia Graphic T-Shirt features high-density screen printed graphics on our signature oversized block."
  },
  { 
    id: '4', 
    name: "247 MISSION PANT - BLACK", 
    price: 40000, 
    image: "/shirt-4.jpg", 
    secondaryImage: "/shirt-1.jpg",
    category: "247",
    badge: "APP EXCLUSIVE",
    colors: ["Black", "Olive", "Grey"],
    sizes: ["28", "30", "32", "34", "36"],
    specs: {
      gsm: "Technical Nylon",
      composition: "88% Nylon, 12% Elastane",
      fit: "Slim/Tapered Fit",
      modelHeight: "187cm",
      modelSize: "32"
    },
    description: "The 247 Mission Pant is designed for every purpose. Crafted from a technical nylon blend with 4-way stretch, these pants are water repellent and highly breathable."
  },
  { 
    id: '5', 
    name: "INITIAL T-SHIRT - COBALT", 
    price: 40000, 
    image: "/shirt-1.jpg", 
    secondaryImage: "/shirt-2.jpg",
    category: "Shirts",
    colors: ["Cobalt", "Black", "White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    specs: {
      gsm: "220GSM",
      composition: "100% Cotton",
      fit: "Oversized Fit",
      modelHeight: "180cm",
      modelSize: "Small"
    }
  },
  { 
    id: '6', 
    name: "RACING TEAM HOODIE - BLACK", 
    price: 40000, 
    image: "/shirt-2.jpg", 
    secondaryImage: "/shirt-3.jpg",
    category: "Outerwear",
    badge: "LIMITED",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      gsm: "480GSM",
      composition: "100% Cotton",
      fit: "Oversized Fit",
      modelHeight: "184cm",
      modelSize: "Medium"
    }
  }
];
