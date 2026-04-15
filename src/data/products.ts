export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  badge?: string;
}

export const products: Product[] = [
  { id: '1', name: "Essential Tee", price: 45, image: "/shirt-1.jpg", category: "Shirts" },
  { id: '2', name: "Heavyweight Boxy Tee", price: 65, image: "/shirt-2.jpg", category: "Shirts" },
  { id: '3', name: "Utopia Graphic Tee", price: 75, image: "/shirt-3.jpg", category: "Shirts" },
  { id: '4', name: "Archive Oversized Tee", price: 55, image: "/shirt-4.jpg", category: "Shirts" },
  { id: '5', name: "Vintage Wash Tee", price: 60, image: "/shirt-1.jpg", category: "Shirts" },
  { id: '6', name: "Premium Cotton Tee", price: 50, image: "/shirt-2.jpg", category: "Shirts" },
  { id: '7', name: "Utopia Logo Tee", price: 85, image: "/shirt-3.jpg", category: "Shirts", badge: "NEW DROP" },
  { id: '8', name: "UG Monogram Tee", price: 75, image: "/shirt-4.jpg", category: "Shirts" },
  { id: '9', name: "Analog Drop Tee", price: 95, image: "/shirt-1.jpg", category: "Shirts", badge: "MOVEMENT PIECE" },
  { id: '10', name: "Studio Signature Tee", price: 110, image: "/shirt-2.jpg", category: "Shirts", badge: "LIMITED" }
];
