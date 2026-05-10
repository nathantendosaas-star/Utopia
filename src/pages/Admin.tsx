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
  Lock,
  LogOut,
  Chrome,
  Calendar,
  CreditCard,
  Clock,
  Send,
  Phone,
  Settings
} from 'lucide-react';
import { db, auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { products as initialProducts } from '../data/products';
import { AdminProductForm } from '../components/AdminProductForm';
import { productService, reviewService, orderService } from '../services/dataService';
import { isAuthorized } from '../lib/security';
import { Product, Review, Order, OrderStatus } from '../types/schema';
import { formatPrice } from '../lib/currency';
import { fileToFirestoreImage } from '../lib/localAsset';
import { buildWhatsAppAppUrl } from '../lib/whatsapp';

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
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'reviews' | 'uploads' | 'settings'>('analytics');
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('shop');
  const [isUploading, setIsUploading] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginMode, setLoginMode] = useState<'google' | 'credentials'>('google');
  
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
    setAuthError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!AUTHORIZED_EMAILS.includes(result.user.email || '')) {
        await signOut(auth);
        setAuthError('ACCESS_DENIED // UNAUTHORIZED_USER_LOG');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setAuthError('LOGIN_PROTOCOL_FAILED');
    }
  };

  const validatePassword = (pass: string) => {
    const rules = {
      length: pass.length >= 10,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[@$!%*?&]/.test(pass)
    };
    return rules;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    const rules = validatePassword(loginPassword);
    if (!Object.values(rules).every(Boolean)) {
      setAuthError('PASSWORD_REQUIREMENTS_NOT_MET');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (!AUTHORIZED_EMAILS.includes(result.user.email || '')) {
        await signOut(auth);
        setAuthError('ACCESS_DENIED // UNAUTHORIZED_USER_LOG');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      setAuthError(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' 
        ? 'INVALID_CREDENTIALS' 
        : 'LOGIN_PROTOCOL_FAILED');
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
      const firestoreProducts = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((p: any) => !p.isDeleted) as Product[];
      
      const firestoreIds = new Set(firestoreProducts.map(p => p.id));
      const deletedIds = new Set(
        snapshot.docs
          .filter(doc => (doc.data() as any).isDeleted)
          .map(doc => doc.id)
      );
      
      // Merge with static products
      const mergedProducts = [...firestoreProducts];
      initialProducts.forEach(p => {
        if (!firestoreIds.has(p.id) && !deletedIds.has(p.id)) {
          mergedProducts.push(p as Product);
        }
      });
      
      setProducts(mergedProducts);
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

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    
    if (!isAuthorized(currentUser?.email || null)) {
      alert('UNAUTHORIZED_ACCESS_PROTOCOL_BREACH');
      return;
    }
    
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

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(id, status);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('FAILED_TO_UPDATE_ORDER_STATUS');
    }
  };

  const reopenWhatsApp = (order: Order) => {
    window.location.href = buildWhatsAppAppUrl(order);
  };

  const conversionRate = analyticsData.uniqueVisitors > 0 
    ? ((analyticsData.totalOrders / analyticsData.uniqueVisitors) * 100).toFixed(1) 
    : "0.0";
  const pendingOrders = orders.filter(order => (order.status || 'whatsapp_pending') === 'whatsapp_pending');
  const todayOrders = orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString());
  const statusOptions: OrderStatus[] = ['whatsapp_pending', 'confirmed', 'fulfilled', 'cancelled'];

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
    const passRules = validatePassword(loginPassword);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] p-4 font-mono">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white/5 border border-white/10 p-8 sm:p-12 space-y-10"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="p-5 border border-white/10 relative">
              <Lock size={32} className="text-white" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-white/20 scale-150 rounded-full"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">SECURE_GATEWAY</h1>
              <p className="text-[9px] opacity-40 uppercase tracking-[0.4em]">
                RESTRICTED_ACCESS // UTOPIA_ADMIN_CORE
              </p>
            </div>
          </div>

          <div className="flex border-b border-white/10">
            <button 
              onClick={() => { setLoginMode('google'); setAuthError(''); }}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${loginMode === 'google' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'}`}
            >
              GOOGLE_SSO
            </button>
            <button 
              onClick={() => { setLoginMode('credentials'); setAuthError(''); }}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${loginMode === 'credentials' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/60'}`}
            >
              ADMIN_CREDENTIALS
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {loginMode === 'google' ? (
              <motion.div 
                key="google"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 pt-4"
              >
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border border-white transition-all flex items-center justify-center gap-4 group"
                >
                  <Chrome size={18} className="transition-transform group-hover:rotate-12" />
                  [ SIGN_IN_WITH_GOOGLE ]
                </button>
                <p className="text-[8px] opacity-20 uppercase tracking-widest text-center">
                  IDENTITY_VERIFICATION_REQUIRED_FOR_ROOT_ACCESS
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 pt-4"
              >
                <form onSubmit={handleEmailLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] opacity-30 uppercase tracking-widest mb-2">ADMIN_EMAIL</label>
                      <input 
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-white/40 transition-colors uppercase"
                        placeholder="ENTER_EMAIL_ADDRESS"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] opacity-30 uppercase tracking-widest mb-2">ADMIN_PASSWORD</label>
                      <input 
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-white/40 transition-colors"
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>

                  <div className="bg-white/2 p-6 border border-white/5 space-y-4">
                    <p className="text-[8px] opacity-30 uppercase tracking-widest border-b border-white/5 pb-2">SECURE_PASSWORD_REQUIREMENTS</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      <RuleItem met={passRules.length} text="MIN_10_CHARACTERS" />
                      <RuleItem met={passRules.upper} text="UPPERCASE_LETTER" />
                      <RuleItem met={passRules.lower} text="LOWERCASE_LETTER" />
                      <RuleItem met={passRules.number} text="NUMERIC_VALUE" />
                      <RuleItem met={passRules.special} text="SPECIAL_CHARACTER" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border border-white transition-all"
                  >
                    [ EXECUTE_LOGIN_SEQUENCE ]
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {authError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black text-center uppercase tracking-widest"
            >
              <div className="flex items-center justify-center gap-2">
                <XCircle size={14} />
                {authError}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  function RuleItem({ met, text }: { met: boolean, text: string }) {
    return (
      <div className={`flex items-center gap-2 text-[8px] font-black tracking-widest transition-opacity ${met ? 'text-green-500' : 'opacity-20'}`}>
        {met ? <CheckCircle2 size={10} /> : <div className="w-2.5 h-2.5 border border-white/20 rounded-full" />}
        {text}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-bg-primary)] text-white font-mono selection:bg-white selection:text-black">
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
      <div className="scanner-line opacity-10" />

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-screen z-50 bg-[var(--color-bg-primary)]">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-black italic tracking-tighter uppercase leading-none glitch-text">UTOPIA_CORE</h2>
          <p className="text-[8px] opacity-30 tracking-[0.3em] mt-2 uppercase">ADMIN_TERMINAL_v2.0</p>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-2">
          <SidebarLink 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
            Icon={BarChart3}
            label="DASHBOARD"
          />
          <SidebarLink 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
            Icon={ShoppingBag}
            label="POS_ORDERS"
          />
          <SidebarLink 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')}
            Icon={Package}
            label="PRODUCTS"
          />
          <SidebarLink 
            active={activeTab === 'reviews'} 
            onClick={() => setActiveTab('reviews')}
            Icon={MessageSquare}
            label="REVIEWS"
          />
          <SidebarLink 
            active={activeTab === 'uploads'} 
            onClick={() => setActiveTab('uploads')}
            Icon={Upload}
            label="FILE_UPLOAD"
          />
          <SidebarLink 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            Icon={Settings}
            label="SETTINGS"
          />
        </nav>

        <div className="p-6 border-t border-white/10 bg-white/[0.02]">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">SYSTEM_ONLINE</span>
           </div>
           <p className="text-[8px] opacity-40 uppercase tracking-widest truncate">{currentUser?.email}</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-24 border-b border-white/10 flex items-center justify-between px-10 bg-[var(--color-bg-primary)]/50 backdrop-blur-md sticky top-0 z-40">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              {activeTab === 'analytics' && 'DASHBOARD_OVERVIEW'}
              {activeTab === 'orders' && 'SALES_TERMINAL'}
              {activeTab === 'products' && 'INVENTORY_CORE'}
              {activeTab === 'reviews' && 'FEEDBACK_MODERATION'}
              {activeTab === 'uploads' && 'MEDIA_DISPATCH'}
              {activeTab === 'settings' && 'SYSTEM_SETTINGS'}
            </h1>
            <p className="text-[9px] opacity-40 uppercase tracking-widest mt-1">
              SECURE_LAYER // {activeTab.toUpperCase()}_PROTOCOL
            </p>
          </div>

          <div className="flex gap-8 text-right">
            <div className="hidden lg:block">
              <p className="text-[8px] opacity-30 uppercase tracking-widest mb-1">STATUS</p>
              <div className="flex items-center gap-2 text-green-500">
                <Activity size={12} className="animate-pulse" />
                <p className="text-lg font-black italic tracking-tighter uppercase">ONLINE</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-10 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard title="TODAY_ORDERS" value={todayOrders.length} icon={<Calendar className="text-blue-500" />} change="LIVE" />
                    <StatCard title="WHATSAPP_PENDING" value={pendingOrders.length} icon={<Phone className="text-green-500" />} change="QUEUE" />
                    <StatCard title="TOTAL_REVENUE" value={formatPrice(analyticsData.revenue, 'UGX')} icon={<CreditCard className="text-emerald-500" />} change="LIVE" />
                    <StatCard title="CONVERSION_RATE" value={`${conversionRate}%`} icon={<TrendingUp className="text-yellow-500" />} change="AUTO" />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-[9px] font-mono opacity-40 uppercase tracking-[0.3em] mb-2">LIVE_ORDER_QUEUE</p>
                      <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">SALES_DESK</h3>
                    </div>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      {pendingOrders.length} WHATSAPP_PENDING // {orders.length} TOTAL_LOGS
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {orders.length > 0 ? orders.map((order) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all group">
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                          <div className="space-y-6 flex-grow">
                            <div className="flex flex-wrap items-center gap-4">
                              <span className="text-xl font-black italic tracking-tighter uppercase text-white">{order.id}</span>
                              <span className={`text-[8px] font-black px-2 py-1 border uppercase tracking-widest ${getOrderStatusClass(order.status)}`}>
                                {order.status || 'whatsapp_pending'}
                              </span>
                              <div className="flex items-center gap-2 text-[9px] font-mono opacity-40 uppercase tracking-widest">
                                <Calendar size={10} />
                                {new Date(order.date).toLocaleDateString()}
                                <Clock size={10} className="ml-2" />
                                {new Date(order.date).toLocaleTimeString()}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-black/30 border border-white/5 p-4">
                                <p className="text-[8px] font-mono opacity-30 uppercase tracking-widest mb-1">CUSTOMER</p>
                                <p className="text-[11px] font-black uppercase text-white">{order.customer?.name || 'GUEST USER'}</p>
                              </div>
                              <div className="bg-black/30 border border-white/5 p-4">
                                <p className="text-[8px] font-mono opacity-30 uppercase tracking-widest mb-1">PHONE</p>
                                <p className="text-[11px] font-black uppercase text-white">{order.customer?.phone || 'NOT PROVIDED'}</p>
                              </div>
                              <div className="bg-black/30 border border-white/5 p-4">
                                <p className="text-[8px] font-mono opacity-30 uppercase tracking-widest mb-1">DELIVERY</p>
                                <p className="text-[11px] font-black uppercase text-white">{order.customer?.deliveryArea || 'NOT PROVIDED'}</p>
                              </div>
                            </div>

                            {order.customer?.notes && (
                              <div className="bg-white/[0.03] border border-white/5 p-4">
                                <p className="text-[8px] font-mono opacity-30 uppercase tracking-widest mb-1">DELIVERY_NOTES</p>
                                <p className="text-[11px] font-mono text-white/60 uppercase">{order.customer.notes}</p>
                              </div>
                            )}
                            
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
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 w-full">
                              <button
                                onClick={() => reopenWhatsApp(order)}
                                className="py-3 px-4 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black transition-all border border-green-500/20 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                              >
                                <Send size={13} />
                                WHATSAPP
                              </button>
                              <select
                                value={order.status || 'whatsapp_pending'}
                                onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                                className="bg-black border border-white/10 px-3 py-3 text-[9px] font-black uppercase tracking-widest text-white outline-none focus:border-white"
                              >
                                {statusOptions.map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                              <button 
                                onClick={() => deleteOrder(order.id)}
                                className="col-span-2 lg:col-span-1 py-3 px-4 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/10 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                              >
                                <Trash2 size={13} />
                                DELETE
                              </button>
                            </div>
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

              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-8">
                   <div className="bg-white/5 border border-white/10 p-10 space-y-10">
                      <h3 className="text-[11px] font-black uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-3">
                        <Shield size={14} /> // AUTHENTICATION_PROFILE
                      </h3>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="bg-black/30 p-4 border border-white/5">
                              <p className="text-[8px] opacity-30 uppercase mb-2">ACTIVE_USER</p>
                              <p className="text-sm font-black uppercase text-white truncate">{currentUser?.email}</p>
                           </div>
                           <div className="bg-black/30 p-4 border border-white/5">
                              <p className="text-[8px] opacity-30 uppercase mb-2">ACCESS_LEVEL</p>
                              <p className="text-sm font-black uppercase text-green-500">ROOT_ADMIN</p>
                           </div>
                        </div>

                        <div className="bg-red-500/5 border border-red-500/10 p-8 space-y-6">
                           <div>
                              <h4 className="text-[10px] font-black uppercase text-red-500 mb-2">DANGER_ZONE</h4>
                              <p className="text-[9px] opacity-40 uppercase tracking-widest">TERMINATE_ALL_ACTIVE_SESSIONS_AND_LOGOUT_FROM_THIS_TERMINAL</p>
                           </div>
                           
                           <button 
                            onClick={handleLogout}
                            className="w-full py-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-red-500 border border-red-500 transition-all flex items-center justify-center gap-4"
                          >
                            <LogOut size={16} />
                            [ TERMINATE_SESSION ]
                          </button>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ active, onClick, Icon, label }: { active: boolean, onClick: () => void, Icon: LucideIcon, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black tracking-[0.2em] transition-all group overflow-hidden
        ${active ? 'text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
    >
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute inset-0 bg-white"
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        <Icon size={16} />
        {label}
      </span>
      {!active && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white group-hover:h-4 transition-all duration-300" />
      )}
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

function getOrderStatusClass(status?: OrderStatus) {
  switch (status || 'whatsapp_pending') {
    case 'confirmed':
      return 'border-blue-500/40 text-blue-500 bg-blue-500/5';
    case 'fulfilled':
      return 'border-green-500/40 text-green-500 bg-green-500/5';
    case 'cancelled':
      return 'border-red-500/40 text-red-500 bg-red-500/5';
    case 'whatsapp_pending':
    default:
      return 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5';
  }
}
