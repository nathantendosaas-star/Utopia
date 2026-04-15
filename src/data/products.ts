export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  badge?: string;
}

export const products: Product[] = [
  { id: '1', name: "Essential Tee", price: 45, image: "/product-1.jpg", category: "Tops" },
  { id: '2', name: "Heavyweight Hoodie", price: 85, image: "/product-2.jpg", category: "Tops" },
  { id: '3', name: "Tailored Cargos", price: 110, image: "/product-3.jpg", category: "Bottoms" },
  { id: '4', name: "Archive Jacket", price: 150, image: "/product-4.jpg", category: "Outerwear" },
  { id: '5', name: "Ribbed Beanie", price: 25, image: "/product-1.jpg", category: "Accessories" },
  { id: '6', name: "Premium Socks", price: 15, image: "/product-2.jpg", category: "Accessories" },
  { id: '7', name: "Utopia Hoodie", price: 185, image: "/product-3.jpg", category: "Tops", badge: "NEW DROP" },
  { id: '8', name: "UG Graphic Tee", price: 75, image: "/product-4.jpg", category: "Tops" },
  { id: '9', name: "Analog Cargo", price: 240, image: "/product-1.jpg", category: "Bottoms", badge: "MOVEMENT PIECE" },
  { id: '10', name: "Studio Jacket", price: 320, image: "/product-2.jpg", category: "Outerwear", badge: "LIMITED" }
];
