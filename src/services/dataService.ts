import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, ProductSchema, Review, ReviewSchema, Order, OrderSchema, OrderStatus } from '../types/schema';

class ProductService {
  private collectionName = 'products';
  private cache: Product[] | null = null;
  private individualCache: Map<string, Product> = new Map();

  async getAllProducts(): Promise<Product[]> {
    if (this.cache) return this.cache;

    try {
      const colRef = collection(db, this.collectionName);
      const snapshot = await getDocs(colRef);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Validate with Zod
      const validatedProducts = products.map(p => ProductSchema.parse(p));
      this.cache = validatedProducts;
      return validatedProducts;
    } catch (error) {
      console.error('FAILED_TO_FETCH_PRODUCTS:', error);
      throw new Error('NETWORK_PROTOCOL_FAILURE');
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    if (this.individualCache.has(id)) return this.individualCache.get(id) || null;
    
    // Check if it's in the bulk cache first
    if (this.cache) {
      const found = this.cache.find(p => p.id === id);
      if (found) return found;
    }

    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      
      const product = ProductSchema.parse({
        id: snapshot.id,
        ...snapshot.data()
      });
      this.individualCache.set(id, product);
      return product;
    } catch (error) {
      console.error(`FAILED_TO_FETCH_PRODUCT_${id}:`, error);
      throw new Error('ASSET_ACCESS_DENIED');
    }
  }

  async saveProduct(product: Product): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, product.id);
      const cleanData = ProductSchema.parse(product);
      await setDoc(docRef, {
        ...cleanData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      // Invalidate cache
      this.cache = null;
      this.individualCache.delete(product.id);
    } catch (error) {
      console.error('FAILED_TO_SAVE_PRODUCT:', error);
      throw new Error('DATABASE_COMMIT_FAILURE');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      // Invalidate cache
      this.cache = null;
      this.individualCache.delete(id);
    } catch (error) {
      console.error('FAILED_TO_DELETE_PRODUCT:', error);
      throw new Error('ASSET_DESTRUCTION_FAILURE');
    }
  }
}

class ReviewService {
  private collectionName = 'reviews';

  async getApprovedReviews(productId: string): Promise<Review[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('productId', '==', productId),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ReviewSchema.parse({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('FAILED_TO_FETCH_REVIEWS:', error);
      return [];
    }
  }

  async submitReview(review: Omit<Review, 'id' | 'status' | 'createdAt'>): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), {
        ...review,
        status: 'pending',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('FAILED_TO_SUBMIT_REVIEW:', error);
      throw new Error('FEEDBACK_DISPATCH_FAILURE');
    }
  }

  async updateReviewStatus(id: string, status: 'approved' | 'pending'): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error('FAILED_TO_UPDATE_REVIEW:', error);
      throw new Error('MODERATION_SYNC_FAILURE');
    }
  }
}

class OrderService {
  private collectionName = 'orders';

  async getAllOrders(): Promise<Order[]> {
    try {
      const q = query(collection(db, this.collectionName), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => OrderSchema.parse({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('FAILED_TO_FETCH_ORDERS:', error);
      throw new Error('ORDER_RETRIEVAL_FAILURE');
    }
  }

  async saveOrder(order: Order): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, order.id);
      await setDoc(docRef, {
        ...order,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('FAILED_TO_SAVE_ORDER:', error);
      throw new Error('ORDER_COMMIT_FAILURE');
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error('FAILED_TO_DELETE_ORDER:', error);
      throw new Error('ORDER_DELETION_FAILURE');
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    try {
      await updateDoc(doc(db, this.collectionName, id), { status });
    } catch (error) {
      console.error('FAILED_TO_UPDATE_ORDER_STATUS:', error);
      throw new Error('ORDER_STATUS_SYNC_FAILURE');
    }
  }
}

export const productService = new ProductService();
export const reviewService = new ReviewService();
export const orderService = new OrderService();
