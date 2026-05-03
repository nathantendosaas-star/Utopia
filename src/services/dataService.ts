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
import { db } from './firebase';
import { Product, ProductSchema, Review, ReviewSchema } from '../types/schema';

class ProductService {
  private collectionName = 'products';

  async getAllProducts(): Promise<Product[]> {
    try {
      const colRef = collection(db, this.collectionName);
      const snapshot = await getDocs(colRef);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Validate with Zod
      return products.map(p => ProductSchema.parse(p));
    } catch (error) {
      console.error('FAILED_TO_FETCH_PRODUCTS:', error);
      throw new Error('NETWORK_PROTOCOL_FAILURE');
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      
      return ProductSchema.parse({
        id: snapshot.id,
        ...snapshot.data()
      });
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
    } catch (error) {
      console.error('FAILED_TO_SAVE_PRODUCT:', error);
      throw new Error('DATABASE_COMMIT_FAILURE');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
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

export const productService = new ProductService();
export const reviewService = new ReviewService();
