import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface VaultImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const mediaCache = new Map<string, string>();

/**
 * A wrapper for the <img> tag that resolves 'media://' URLs from the Firestore Media Vault.
 * Falls back to standard URL handling if the src does not use the media protocol.
 */
export function VaultImage({ src, ...props }: VaultImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!src) {
      setResolvedSrc(null);
      return;
    }

    if (src.startsWith('media://')) {
      const mediaId = src.replace('media://', '');
      
      if (mediaCache.has(mediaId)) {
        setResolvedSrc(mediaCache.get(mediaId)!);
        return;
      }

      setIsLoading(true);
      const fetchMedia = async () => {
        try {
          const docRef = doc(db, 'media', mediaId);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            const dataUrl = snapshot.data().data;
            mediaCache.set(mediaId, dataUrl);
            setResolvedSrc(dataUrl);
          } else {
            console.warn(`MEDIA_VAULT_MISSING_ASSET: ${mediaId}`);
            setResolvedSrc(null);
          }
        } catch (error) {
          console.error('MEDIA_VAULT_ACCESS_ERROR:', error);
          setResolvedSrc(null);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchMedia();
    } else {
      setResolvedSrc(src);
    }
  }, [src]);

  if (isLoading) {
    return (
      <div 
        className={`animate-pulse bg-white/5 border border-white/10 ${props.className || ''}`} 
        style={{ ...props.style, aspectRatio: 'inherit' }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-10">
           <span className="text-[8px] font-mono uppercase tracking-widest">LOADING_ASSET...</span>
        </div>
      </div>
    );
  }

  return <img {...props} src={resolvedSrc || ''} />;
}
