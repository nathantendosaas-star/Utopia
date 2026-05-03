import { Product } from '../data/products';
import { Filters, SortOption } from '../context/ProductContext';
import { filterProducts, sortProducts } from './utils';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchProducts = async (filters?: Filters, sort?: SortOption): Promise<Product[]> => {
  try {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    let result = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    // If Firestore is empty, we return an empty array (Admin will handle seeding)
    if (result.length === 0) return [];

    if (filters) {
      result = filterProducts(result, filters);
    }
    if (sort) {
      result = sortProducts(result, sort);
    }
    return result;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching product by ID from Firestore:', error);
    return undefined;
  }
};
