import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Star, 
  Upload, 
  BarChart3, 
  MessageSquare, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Eye,
  Package,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Shield,
  Activity,
  Terminal,
  LucideIcon,
  Database,
  Lock,
  LogOut,
  Chrome,
  Calendar,
  CreditCard,
  Clock
} from 'lucide-react';
import { db, auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { products as initialProducts } from '../data/products';
import { AdminProductForm } from '../components/AdminProductForm';
import { productService, reviewService, orderService } from '../services/dataService';
import { Product, Review, Order } from '../types/schema';
import { formatPrice } from '../lib/currency';
import { fileToFirestoreImage } from '../lib/localAsset';

// LIST OF AUTHORIZED EMAILS (FROM ENV)
const AUTHORIZED_EMAILS = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];

interface AnalyticsData {
  uniqueVisitors: number;
  productViews: number;
  topProducts: { name: string, hits: number }[];
  totalOrders: number;
  revenue: number;
}

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'reviews' | 'uploads'>('analytics');
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('shop');
  const [isUploading, setIsUploading] = useState(false);
  const [systemUptime, setSystemUptime] = useState('00:00:00');
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    uniqueVisitors: 0,
    productViews: 0,
    topProducts: [],
    totalOrders: 0,
    revenue: 0
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [isSeeding, setIsSeeding] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && AUTHORIZED_EMAILS.includes(user.email || '')) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!AUTHORIZED_EMAILS.includes(result.user.email || '')) {
        await signOut(auth);
        alert('ACCESS_DENIED // UNAUTHORIZED_USER_LOG');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('LOGIN_PROTOCOL_FAILED');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Listen to Products
    const productsUnsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    }, (error) => {
      console.error('Error listening to products:', error);
    });

    // Listen to Reviews
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const reviewsUnsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    }, (error) => {
      console.error('Error listening to reviews:', error);
    });

    // Listen to Orders
    const ordersQuery = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const ordersUnsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      
      const totalRevenue = ordersData.reduce((acc, order) => acc + order.total, 0);
      setAnalyticsData(prev => ({
        ...prev,
        totalOrders: ordersData.length,
        revenue: totalRevenue
      }));
    }, (error) => {
      console.error('Error listening to orders:', error);
    });

    // Listen to Analytics Counters
    const countersUnsubscribe = onSnapshot(doc(db, 'analytics', 'counters'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setAnalyticsData(prev => ({
          ...prev,
          uniqueVisitors: data.uniqueVisitors || 0,
          productViews: data.productViews || 0
        }));
      }
    });

    // Listen to Product Hits for Top Products
    const hitsQuery = query(collection(db, 'product_hits'), orderBy('hits', 'desc'));
    const hitsUnsubscribe = onSnapshot(hitsQuery, (snapshot) => {
      const hitsData = snapshot.docs.map(doc => ({
        name: doc.data().name,
        hits: doc.data().hits
      })).slice(0, 5);
      
      setAnalyticsData(prev => ({
        ...prev,
        topProducts: hitsData
      }));
    });

    return () => {
      productsUnsubscribe();
      reviewsUnsubscribe();
      ordersUnsubscribe();
      countersUnsubscribe();
      hitsUnsubscribe();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setSystemUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seedDatabase = async () => {
    if (!window.confirm('INITIATE_DATABASE_SEED_PROTOCOL? THIS_WILL_OVERWRITE_EXISTING_DATA.')) return;
    
    setIsSeeding(true);
    try {
      for (const product of initialProducts) {
        await productService.saveProduct(product as Product);
      }
      alert('DATABASE_SEED_PROTOCOL_COMPLETE');
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('SEED_PROTOCOL_FAILED');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    
    setIsUploading(true);

    try {
      const dataUrl = await fileToFirestoreImage(uploadFile);
      
      await addDoc(collection(db, 'site_assets'), {
        name: uploadFile.name,
        url: dataUrl,
        category: uploadCategory,
        source: 'firestore_data_url',
        size: uploadFile.size,
        type: uploadFile.type,
        createdAt: serverTimestamp()
      });

      alert(`SUCCESSFULLY_UPLOADED_TO_${uploadCategory.toUpperCase()}`);
      setUploadFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error instanceof Error ? error.message : 'UPLOAD_PROTOCOL_FAILED');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_PRODUCT?')) {
      try {
        await productService.deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('FAILED_TO_DELETE_ASSET');
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      await productService.saveProduct(product);
      setIsFormOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('FAILED_TO_COMMIT_DATA_PACK');
    }
  };

  const approveReview = async (id: string) => {
    try {
      await reviewService.updateReviewStatus(id, 'approved');
    } catch (error) {
      console.error('Error approving review:', error);
      alert('FAILED_TO_APPROVE_REVIEW');
    }
  };

  const deleteReview = async (id: string) => {
    if (window.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_REVIEW?')) {
      try {
        await deleteDoc(doc(db, 'reviews', id));
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('FAILED_TO_DELETE_REVIEW');
      }
    }
  };

  const deleteOrder = async (id: string) => {
    if (window.confirm('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ORDER?')) {
      try {
        await orderService.deleteOrder(id);
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('FAILED_TO_DELETE_ORDER');
      }
    }
  };

  const conversionRate = analyticsData.uniqueVisitors > 0 
    ? ((analyticsData.totalOrders / analyticsData.uniqueVisitors) * 100).toFixed(1) 
    : "0.0";

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-primary)] gap-4">
        <div className="w-48 h-[2px] bg-white/5 overflow-hidden">
          <div className="w-full h-full bg-white/20 animate-[marquee_2s_linear_infinite]" />
        </div>
        <p className="text-technical text-[8px] animate-pulse text-white/20 font-black uppercase tracking-[0.4em]">
          ESTABLISHING_SECURE_CONNECTION
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/5 border border-white/10 p-12 space-y-10 text-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="p-5 border border-white/10 relative">
              <Lock size={40} className="text-white" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-white/20 scale-150 rounded-full"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">SECURE_GATEWAY</h1>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.3em]">
                RESTRICTED_ACCESS // UTOPIA_ADMIN_CORE
              </p>
            </div>
          </div>
          
          <div className="space-y-4 pt-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border border-white transition-all flex items-center justify-center gap-4 group"
            >
              <Chrome size={18} className="transition-transform group-hover:rotate-12" />
              [ SIGN_IN_WITH_GOOGLE ]
            </button>
            <p className="text-[8px] font-mono opacity-20 uppercase tracking-widest">
              IDENTITY_VERIFICATION_REQUIRED_FOR_ROOT_ACCESS
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto bg-[var(--color-bg-primary)]">
      {isFormOpen && (
        <AdminProductForm 
          product={editingProduct} 
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(undefined);
          }} 
          onSave={handleSaveProduct}
        />
      )}

      {/* Decorative Scanner Line */}
      <div className="scanner-line opacity-20" />

      <div className="flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
          <div className="flex-grow">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Shield size={14} className="text-white/40" />
              <span className="text-technical text-[9px] opacity-40">SECURE_ENVIRONMENT // ROOT_ACCESS</span>
              <span className="text-technical text-[9px] text-green-500 font-bold ml-4 uppercase tracking-widest bg-green-500/5 px-2 py-0.5 border border-green-500/20">
                ACTIVE_USER: {currentUser?.email}
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic text-white mb-2 leading-none">
              ADMIN_CORE
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-technical text-[10px] opacity-60 font-mono tracking-widest">
                TERMINAL_v1.05_AUTH // {new Date().toLocaleDateString()}
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={seedDatabase}
                  disabled={isSeeding}
                  className="text-[9px] font-mono text-blue-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                >
                  <Database size={10} />
                  {isSeeding ? '[ SEEDING... ]' : '[ SEED_DATABASE ]'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-[9px] font-mono text-red-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                >
                  <LogOut size={10} />
                  [ TERMINATE_SESSION ]
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8 text-right font-mono">
            <div className="hidden sm:block">
              <p className="text-[9px] opacity-30 uppercase tracking-widest mb-1">SYSTEM_UPTIME</p>
              <p className="text-xl font-black italic tracking-tighter text-white">{systemUptime}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-30 uppercase tracking-widest mb-1">STATUS</p>
              <div className="flex items-center gap-2 text-green-500">
                <Activity size={12} className="animate-pulse" />
                <p className="text-xl font-black italic tracking-tighter">ONLINE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/5">
          <TabButton 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
            Icon={BarChart3}
            label="ANALYTICS"
          />
          <TabButton 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')}
            Icon={Package}
            label="PRODUCTS"
          />
          <TabButton 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
            Icon={ShoppingBag}
            label="ORDERS"
          />
          <TabButton 
            active={activeTab === 'reviews'} 
            onClick={() => setActiveTab('reviews')}
            Icon={MessageSquare}
            label="REVIEWS"
          />
          <TabButton 
            active={activeTab === 'uploads'} 
            onClick={() => setActiveTab('uploads')}
            Icon={Upload}
            label="FILE_UPLOAD"
          />
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard title="UNIQUE_VISITORS" value={analyticsData.uniqueVisitors} icon={<Users className="text-green-500" />} change="+100%" />
                  <StatCard title="PRODUCT_VIEWS" value={analyticsData.productViews} icon={<Eye className="text-blue-500" />} change="+100%" />
                  <StatCard title="CONVERSION_RATE" value={`${conversionRate}%`} icon={<TrendingUp className="text-purple-500" />} change="AUTO" />
                  <StatCard title="TOTAL_ORDERS" value={analyticsData.totalOrders} icon={<ShoppingBag className="text-yellow-500" />} change="LIVE" />
                  <StatCard title="TOTAL_REVENUE" value={formatPrice(analyticsData.revenue, 'UGX')} icon={<CreditCard className="text-emerald-500" />} change="LIVE" />
                  
                  <div className="col-span-full bg-white/5 border border-white/10 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Terminal size={120} />
                    </div>
                    <h3 className="text-[11px] font-black uppercase mb-8 tracking-widest border-b border-white/10 pb-4 flex items-center gap-3">
                      <Activity size={14} /> // TOP_PERFORMING_PRODUCTS
                    </h3>
                    <div className="space-y-6">
                      {analyticsData.topProducts.length > 0 ? (
                        analyticsData.topProducts.map((p, i) => (
                          <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2 hover:border-white/20 transition-colors group/item">
                            <div>
                              <span className="text-[9px] font-mono opacity-30 mr-4">0{i+1}</span>
                              <span className="text-sm font-black uppercase tracking-tighter group-hover/item:text-white transition-colors">{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-white/40">{p.hits} VIEWS</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] font-mono opacity-20 uppercase tracking-widest py-10 text-center">NO_DATA_COLLECTED_YET</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-white">// INVENTORY_MANAGEMENT</h3>
                      <p className="text-[9px] font-mono opacity-40 uppercase mt-1">TOTAL_COUNT: {products.length} _ITEMS</p>
                    </div>
                    <button 
                      onClick={() => setIsFormOpen(true)}
                      className="btn-primary !py-3 !px-6 flex items-center gap-3 !bg-white !text-black border-white hover:!bg-transparent hover:!text-white transition-all"
                    >
                      <Plus size={14} />
                      [ ADD_NEW_ASSET ]
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                      <motion.div 
                        layout
                        key={product.id} 
                        className="bg-white/5 border border-white/10 p-4 hover:border-white/30 transition-all flex flex-col sm:flex-row items-center gap-6 group"
                      >
                        <div className="w-20 h-20 bg-black overflow-hidden border border-white/5 flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                          />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <div className="flex items-center gap-3 justify-center sm:justify-start mb-1">
                            <h4 className="text-lg font-black uppercase tracking-tighter">{product.name}</h4>
                            <span className="text-[8px] px-1.5 py-0.5 border border-white/20 opacity-40 font-mono">{product.id}</span>
                          </div>
                          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                            {product.category} <span className="mx-2 text-white/10">|</span> <span className="text-white/80">UGX {product.price.toLocaleString()}</span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="p-3 bg-white/5 hover:bg-white text-white/60 hover:text-black transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-3 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                          <a 
                            href={`/product/${product.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-3 bg-white/5 hover:bg-white text-white/40 hover:text-black transition-all"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-8">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-white">// ORDER_LOGISTICS_FLOW</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {orders.length > 0 ? orders.map((order) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 p-8 hover:border-white/20 transition-all group">
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                          <div className="space-y-6 flex-grow">
                            <div className="flex flex-wrap items-center gap-4">
                              <span className="text-xl font-black italic tracking-tighter uppercase text-white">{order.id}</span>
                              <div className="flex items-center gap-2 text-[9px] font-mono opacity-40 uppercase tracking-widest">
                                <Calendar size={10} />
                                {new Date(order.date).toLocaleDateString()}
                                <Clock size={10} className="ml-2" />
                                {new Date(order.date).toLocaleTimeString()}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white/2 p-3 border border-white/5">
                                  <div className="w-12 h-12 flex-shrink-0 bg-black overflow-hidden border border-white/5">
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale opacity-50" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-tighter truncate text-white">{item.product.name}</p>
                                    <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest">QTY: {item.quantity} × {formatPrice(item.product.price, 'UGX')}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="lg:text-right flex flex-row lg:flex-col justify-between items-end lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8 min-w-[200px]">
                            <div>
                              <p className="text-[9px] font-mono opacity-30 uppercase tracking-widest mb-1">TOTAL_PAYMENT</p>
                              <p className="text-2xl font-black italic tracking-tighter text-white">{formatPrice(order.total, 'UGX')}</p>
                            </div>
                            <button 
                              onClick={() => deleteOrder(order.id)}
                              className="p-4 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/10"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="py-20 text-center border border-dashed border-white/10 opacity-30">
                        <p className="text-[10px] font-mono tracking-widest">NO_LIVE_ORDERS_FOUND_IN_BUFFER</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-white">// USER_FEEDBACK_MODERATION</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {reviews.length > 0 ? reviews.map((review) => (
                      <div key={review.id} className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between gap-6 hover:border-white/20 transition-colors">
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-mono opacity-30 uppercase">
                                {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'JUST_NOW'}
                              </span>
                              <div className="flex gap-1 text-white">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-white" : "text-white/10"} />
                                ))}
                              </div>
                            </div>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 border ${review.status === 'approved' ? 'border-green-500/40 text-green-500' : 'border-yellow-500/40 text-yellow-500'} uppercase tracking-widest`}>
                              {review.status}
                            </span>
                          </div>
                          <p className="text-sm font-black uppercase mb-4 tracking-tighter text-white">{review.userName}</p>
                          <p className="text-[13px] opacity-60 font-mono italic leading-relaxed">"{review.comment}"</p>
                        </div>
                        <div className="flex gap-3 pt-6 border-t border-white/5">
                          {review.status === 'pending' && (
                            <button 
                              onClick={() => approveReview(review.id)}
                              className="flex-grow py-3 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              APPROVE_LOG
                            </button>
                          )}
                          <button 
                            onClick={() => deleteReview(review.id)}
                            className="flex-grow py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            DISCARD_ASSET
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center border border-dashed border-white/10 opacity-30">
                        <p className="text-[10px] font-mono tracking-widest">NO_REVIEWS_FOUND_IN_BUFFER</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'uploads' && (
                <div className="max-w-3xl mx-auto py-12">
                   <div className="bg-white/5 border border-white/10 p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-20" />
                    <h3 className="text-[11px] font-black uppercase mb-12 tracking-widest border-b border-white/10 pb-4 flex items-center gap-3">
                      <Upload size={14} /> // MEDIA_DISPATCH_PROTOCOL
                    </h3>
                    
                    <form onSubmit={handleFileUpload} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-[0.2em]">DESTINATION_LAYER</label>
                          <select 
                            className="w-full bg-black border border-white/10 p-4 text-[12px] font-black uppercase tracking-widest focus:border-white transition-colors outline-none cursor-pointer"
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value)}
                          >
                            <option value="shop">SHOP_COLLECTION</option>
                            <option value="hero">HERO_SECTION</option>
                            <option value="archives">ARCHIVES_LAYER</option>
                            <option value="prestige">PRESTIGE_VAULT</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">ACCESS_TOKEN</label>
                          <div className="bg-white/5 border border-white/10 p-4 text-[12px] font-mono opacity-20 italic">
                            AUTOGENERATED_BY_SYSTEM
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className="border-2 border-dashed border-white/10 p-16 text-center hover:border-white/40 hover:bg-white/[0.02] transition-all cursor-pointer relative group"
                        onClick={() => document.getElementById('file-input')?.click()}
                      >
                        <input 
                          type="file" 
                          id="file-input" 
                          className="hidden" 
                          accept="image/*,video/*"
                          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        />
                        {uploadFile ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 border border-white/10 p-2">
                                <ImageIcon size={64} className="text-white opacity-100" />
                            </div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{uploadFile.name}</p>
                            <p className="text-[9px] font-mono opacity-30">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB // READY_FOR_DISPATCH</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-6">
                            <div className="p-6 border border-white/5 group-hover:border-white/20 transition-colors">
                                <Upload size={48} className="opacity-10 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-[10px] font-mono opacity-40 group-hover:opacity-100 tracking-widest transition-opacity uppercase">
                              SELECT_SOURCE_DATA_OR_DRAG_FILE
                            </p>
                            <p className="text-[8px] font-mono opacity-20 uppercase tracking-widest">[ PNG / JPG / MP4_ALLOWED ]</p>
                          </div>
                        )}
                      </div>

                      <button 
                        disabled={!uploadFile || isUploading}
                        className={`w-full py-6 text-[11px] font-black tracking-[0.4em] uppercase transition-all border
                          ${!uploadFile || isUploading 
                            ? 'bg-transparent border-white/5 text-white/10 cursor-not-allowed' 
                            : 'bg-white text-black border-white hover:bg-transparent hover:text-white active:scale-[0.99]'}`}
                      >
                        {isUploading ? 'DISPATCHING_DATA...' : '[ INITIATE_UPLOAD_PROTOCOL ]'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, Icon, label }: { active: boolean, onClick: () => void, Icon: LucideIcon, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex items-center gap-3 px-8 py-5 text-[10px] font-black tracking-[0.2em] transition-all flex-shrink-0 group
        ${active ? 'text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
    >
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute inset-0 bg-white"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Icon size={14} />
        {label}
      </span>
    </button>
  );
}

function StatCard({ title, value, icon, change }: { title: string, value: string | number, icon: React.ReactNode, change: string }) {
  const isPositive = change.startsWith('+') || change === 'LIVE' || change === 'AUTO';
  return (
    <div className="bg-white/5 border border-white/10 p-8 relative group overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12 group-hover:bg-white/10 transition-colors" />
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-[9px] font-mono opacity-30 tracking-[0.2em] uppercase mb-1">{title}</h4>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
            <div className="w-10 h-[1px] bg-white/10" />
          </div>
        </div>
        <div className="p-2 border border-white/5">
            {icon}
        </div>
      </div>
      <p className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">{value}</p>
    </div>
  );
}
