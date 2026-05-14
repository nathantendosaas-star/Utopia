import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Plus, Trash2, Database, Layers, Activity } from 'lucide-react';
import { Product } from '../types/schema';
import { fileToFirestoreImage } from '../lib/localAsset';

interface AdminProductFormProps {
  product?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export function AdminProductForm({ product, onClose, onSave }: AdminProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      price: 0,
      image: '',
      images: [],
      category: 'SHIRTS',
      colors: [],
      sizes: ['S', 'M', 'L', 'XL'],
      specs: {
        gsm: '',
        composition: '',
        fit: ''
      },
      description: ''
    }
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, target: 'primary' | 'secondary' | 'gallery') => {
    setIsUploading(true);
    try {
      const url = await fileToFirestoreImage(file);
      if (target === 'primary') {
        setFormData(prev => ({ 
          ...prev, 
          image: url, 
          images: prev.images && prev.images.length > 0 ? (prev.images.includes(url) ? prev.images : [url, ...prev.images]) : [url] 
        }));
      } else if (target === 'secondary') {
        setFormData(prev => ({ ...prev, secondaryImage: url }));
      } else if (target === 'gallery') {
        setFormData(prev => ({ 
          ...prev, 
          images: prev.images ? [...prev.images, url] : [url] 
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : 'UPLOAD_PROTOCOL_FAILED');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;

    // Ensure images array has at least the primary image if it's empty
    const finalImages = formData.images && formData.images.length > 0 
      ? formData.images 
      : (formData.image ? [formData.image] : []);

    onSave({
      ...formData,
      images: finalImages,
      id: product?.id || `ASSET-${crypto.randomUUID().split('-')[0].toUpperCase()}`,
    } as Product);
  };

  const handleSpecChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [field]: value
      }
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="bg-black border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar relative rounded-2xl"
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <button 
          onClick={onClose}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-2 sm:p-3 hover:bg-white text-white/40 hover:text-black transition-all border border-white/5 rounded-lg"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-12 space-y-12 relative z-0">
          <div className="border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-4">
                <Database size={16} className="text-white/40" />
                <span className="text-technical text-[9px] opacity-40 uppercase tracking-[0.3em]">ASSET_MANAGEMENT_PROTOCOL</span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-black italic tracking-tighter uppercase text-white truncate">
              {product ? 'MODIFY_ASSET' : 'REGISTER_NEW_DATA'}
            </h2>
            <p className="text-technical text-[10px] opacity-30 uppercase tracking-widest mt-2 font-mono">
              SERIAL_INIT_v2.0 // SOURCE_KAMPALA_CORE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-20">
            {/* Column 1: Core Identification */}
            <div className="lg:col-span-7 space-y-10">
              <section className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 border-l-2 border-white/20 pl-4 mb-8">
                  01_CORE_DATA
                </h3>
                
                <div className="space-y-8">
                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">PRODUCT_IDENTIFIER_NAME</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-white/5 border border-white/10 p-4 text-sm font-black uppercase tracking-widest focus:border-white outline-none transition-all placeholder:opacity-20 rounded-lg"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. UTOPIA_CORE_TEE"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">VALUE_UGX_UNITS</label>
                            <input 
                                type="number" 
                                required
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-black tracking-widest focus:border-white outline-none transition-all rounded-lg"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">CLASSIFICATION_LAYER</label>
                            <select 
                                className="w-full bg-black border border-white/10 p-4 text-sm font-black uppercase tracking-widest focus:border-white outline-none transition-all cursor-pointer rounded-lg"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="SHIRTS">SHIRTS_COLLECTION</option>
                                <option value="OUTERWEAR">OUTERWEAR_COLLECTION</option>
                                <option value="ACCESSORIES">ACCESSORIES_LAYER</option>
                                <option value="ARCHIVE">ARCHIVE_VAULT</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">DESCRIPTION_METADATA</label>
                        <textarea 
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold tracking-tight focus:border-white outline-none transition-all resize-none placeholder:opacity-20 rounded-lg"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            placeholder="INPUT_DETAILED_ASSET_DESCRIPTION..."
                        />
                    </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 border-l-2 border-white/20 pl-4 mb-8">
                  02_MEDIA_LINKS
                </h3>
                
                <div className="space-y-8">
                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">PRIMARY_ASSET_URI</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                required
                                readOnly
                                className="flex-grow bg-white/5 border border-white/10 p-4 text-sm font-mono opacity-80 focus:border-white outline-none transition-all rounded-lg truncate"
                                value={formData.image}
                                placeholder="UPLOAD_OR_INPUT_URI..."
                            />
                            <input 
                                type="file" 
                                id="product-image-upload" 
                                className="hidden" 
                                accept="image/*"
                                onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'primary')}
                            />
                            <button 
                                type="button" 
                                onClick={() => document.getElementById('product-image-upload')?.click()}
                                disabled={isUploading}
                                className="bg-white text-black px-6 rounded-lg hover:bg-black hover:text-white transition-all border border-white disabled:opacity-50"
                            >
                                <Upload size={18} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">SECONDARY_ASSET_URI</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                readOnly
                                className="flex-grow bg-white/5 border border-white/10 p-4 text-sm font-mono opacity-80 focus:border-white outline-none transition-all rounded-lg truncate"
                                value={formData.secondaryImage}
                                placeholder="UPLOAD_OR_INPUT_URI..."
                            />
                            <input 
                                type="file" 
                                id="secondary-image-upload" 
                                className="hidden" 
                                accept="image/*"
                                onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'secondary')}
                            />
                            <button 
                                type="button" 
                                onClick={() => document.getElementById('secondary-image-upload')?.click()}
                                disabled={isUploading}
                                className="bg-white text-black px-6 rounded-lg hover:bg-black hover:text-white transition-all border border-white disabled:opacity-50"
                            >
                                <Upload size={18} />
                            </button>
                        </div>
                    </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 border-l-2 border-white/20 pl-4">
                        03_IMAGE_GALLERY
                    </h3>
                    <button 
                        type="button"
                        onClick={() => document.getElementById('gallery-upload')?.click()}
                        className="text-[9px] font-bold border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2 rounded-lg"
                    >
                        <Plus size={12} /> [ ADD_TO_GALLERY ]
                    </button>
                    <input 
                        type="file" 
                        id="gallery-upload" 
                        className="hidden" 
                        multiple
                        accept="image/*"
                        onChange={e => {
                            if (e.target.files) {
                                Array.from(e.target.files).forEach(file => handleImageUpload(file, 'gallery'));
                            }
                        }}
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {formData.images?.map((img, idx) => (
                        <div key={idx} className="relative aspect-square bg-white/5 border border-white/10 group rounded-lg overflow-hidden">
                            <img src={img} alt="" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all" />
                            <button 
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-2 right-2 p-1.5 bg-black/80 text-white/40 hover:text-red-500 transition-colors rounded-md"
                            >
                                <X size={12} />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full bg-black/60 p-1 text-[8px] font-mono text-center opacity-40">
                                {idx === 0 ? 'PRIMARY' : `IMG_0${idx}`}
                            </div>
                        </div>
                    ))}
                    {(!formData.images || formData.images.length === 0) && (
                        <div className="col-span-full py-12 border border-dashed border-white/5 text-center rounded-lg">
                            <p className="text-technical text-[9px] opacity-20 uppercase tracking-widest">GALLERY_IS_EMPTY</p>
                        </div>
                    )}
                </div>
              </section>
            </div>

            {/* Column 2: Technical Specifications */}
            <div className="lg:col-span-5 space-y-10">
              <section className="space-y-6 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 border-l-2 border-white/20 pl-4 mb-10 flex items-center gap-2">
                  <Layers size={14} /> 04_TECH_SPECS
                </h3>

                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">GRAM_WEIGHT (GSM)</label>
                            <input 
                                type="text" 
                                className="w-full bg-black border border-white/10 p-4 text-sm font-black focus:border-white outline-none transition-all rounded-lg"
                                value={formData.specs?.gsm}
                                onChange={e => handleSpecChange('gsm', e.target.value)}
                                placeholder="e.g. 220GSM"
                            />
                        </div>
                        <div>
                            <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">SILHOUETTE_FIT</label>
                            <input 
                                type="text" 
                                className="w-full bg-black border border-white/10 p-4 text-sm font-black uppercase focus:border-white outline-none transition-all rounded-lg"
                                value={formData.specs?.fit}
                                onChange={e => handleSpecChange('fit', e.target.value)}
                                placeholder="e.g. OVERSIZED"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">FABRIC_COMPOSITION</label>
                        <input 
                            type="text" 
                            className="w-full bg-black border border-white/10 p-4 text-sm font-black uppercase focus:border-white outline-none transition-all rounded-lg"
                            value={formData.specs?.composition}
                            onChange={e => handleSpecChange('composition', e.target.value)}
                            placeholder="e.g. 100% ORGANIC COTTON"
                        />
                    </div>

                    <div>
                        <label className="block text-[9px] font-mono mb-3 opacity-30 uppercase tracking-widest">BADGE_IDENTIFIER</label>
                        <input 
                            type="text" 
                            className="w-full bg-black border border-white/10 p-4 text-sm font-black uppercase focus:border-white outline-none transition-all rounded-lg"
                            value={formData.badge}
                            onChange={e => setFormData({...formData, badge: e.target.value})}
                            placeholder="e.g. NEW_SEASON"
                        />
                    </div>
                </div>
              </section>
              
              <div className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl">
                <p className="text-[9px] font-mono opacity-20 uppercase leading-relaxed italic">
                  // NOTICE: ALL_ASSETS_MUST_COMPLY_WITH_UTOPIA_QUALITY_STANDARDS. 
                  FAILURE_TO_PROVIDE_ACCURATE_METADATA_MAY_RESULT_IN_SYSTEM_DELISTING.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-6 pt-12 border-t border-white/10">
            <button 
              type="button"
              onClick={onClose}
              className="btn-ghost-white group flex items-center justify-center gap-3 min-w-[200px] border-white/10 hover:border-red-500/50 hover:text-red-500 rounded-xl"
            >
              [ ABORT_PROCESS ]
            </button>
            <button 
              type="submit"
              disabled={isUploading}
              className="btn-primary group flex items-center justify-center gap-3 min-w-[280px] !bg-white !text-black hover:!bg-transparent hover:!text-white border-white transition-all disabled:opacity-50 rounded-xl"
            >
              {isUploading ? <Activity size={16} className="animate-spin" /> : <Plus size={16} />}
              {isUploading ? '[ DISPATCHING_DATA... ]' : '[ COMMIT_DATA_PACK ]'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
