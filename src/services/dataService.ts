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
import { db, auth } from '../lib/firebase';
import { Product, ProductSchema, Review, ReviewSchema, Order, OrderSchema, OrderStatus } from '../types/schema';
import { isAuthorized } from '../lib/security';

const checkAuth = () => {
  if (!isAuthorized(auth.currentUser?.email || null)) {
    throw new Error('UNAUTHORIZED_ACCESS_PROTOCOL_BREACH');
  }
};

class ProductService {
  private collectionName = 'products';
  private cache: Product[] | null = null;
  private individualCache: Map<string, Product> = new Map();

  async getAllProducts(): Promise<Product[]> {
    if (this.cache) return this.cache;

    try {
      const colRef = collection(db, this.collectionName);
      const snapshot = await getDocs(colRef);
      const firestoreProducts = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((p: any) => !p.isDeleted) as Product[];
      
      const firestoreIds = new Set(firestoreProducts.map(p => p.id));
      const deletedIds = new Set(
        snapshot.docs
          .filter(doc => doc.data().isDeleted)
          .map(doc => doc.id)
      );
      
      // Merge Firestore products with static products
      // Firestore products take precedence if IDs match
      const { products: staticProducts } = await import('../data/products');
      const mergedProducts = [...firestoreProducts];
      
      staticProducts.forEach(p => {
        if (!firestoreIds.has(p.id) && !deletedIds.has(p.id)) {
          mergedProducts.push(p as Product);
        }
      });
      
      // Validate with Zod
      const validatedProducts = mergedProducts.map(p => ProductSchema.parse(p));
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
      if (!snapshot.exists() || snapshot.data()?.isDeleted) {
        // Fallback to static if not in firestore or not marked as deleted
        const { products: staticProducts } = await import('../data/products');
        const staticProd = staticProducts.find(p => p.id === id);
        if (staticProd && !snapshot.data()?.isDeleted) return staticProd as Product;
        return null;
      }
      
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
    checkAuth();
    try {
      const docRef = doc(db, this.collectionName, product.id);
      const cleanData = ProductSchema.parse(product);
      await setDoc(docRef, {
        ...cleanData,
        isDeleted: false,
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
    checkAuth();
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, {
        isDeleted: true,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
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
      const cleanReview = ReviewSchema.omit({ id: true, status: true, createdAt: true }).parse(review);
      await addDoc(collection(db, this.collectionName), {
        ...cleanReview,
        status: 'pending',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('FAILED_TO_SUBMIT_REVIEW:', error);
      throw new Error('FEEDBACK_DISPATCH_FAILURE');
    }
  }

  async updateReviewStatus(id: string, status: 'approved' | 'pending'): Promise<void> {
    checkAuth();
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
    checkAuth();
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
      const cleanOrder = OrderSchema.parse(order);
      await setDoc(docRef, {
        ...cleanOrder,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('FAILED_TO_SAVE_ORDER:', error);
      throw new Error('ORDER_COMMIT_FAILURE');
    }
  }

  async deleteOrder(id: string): Promise<void> {
    checkAuth();
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error('FAILED_TO_DELETE_ORDER:', error);
      throw new Error('ORDER_DELETION_FAILURE');
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    checkAuth();
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
