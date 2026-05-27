import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import productsData from '@/data/products.json';
import { logSupabaseError } from '@/lib/supabaseDebug';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products from Supabase...');
      
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw countError;
      }

      if (count === 0) {
        console.log("Products table is empty. Seeding data from products.json...");
        const { error: insertError } = await supabase.from('products').insert(productsData);
        if (insertError && insertError.code !== '23505') {
          throw insertError;
        }
      }

      const { data, error: fetchError } = await supabase.from('products').select('*').order('id');
      if (fetchError) {
        throw fetchError;
      }

      const productsWithImageUrls = data.map(product => {
        let imageUrl = 'https://images.unsplash.com/photo-1699373381566-296f6e3a96dc'; 
        if (product.image) {
          if (product.image.startsWith('http')) {
            imageUrl = product.image;
          } else {
            const { data: { publicUrl } } = supabase.storage.from('TSM Website Image').getPublicUrl(product.image);
            imageUrl = publicUrl;
          }
        }
        return { ...product, imageUrl };
      });

      setProducts(productsWithImageUrls);
      console.log('Products fetched successfully!');
    } catch (err) {
      logSupabaseError('fetchProducts', err);
      console.warn('Falling back to local products.json data due to Supabase error.');
      
      // Fallback behavior
      setProducts(productsData.map(p => ({
        ...p,
        imageUrl: p.image?.startsWith('http') ? p.image : 'https://images.unsplash.com/photo-1699373381566-296f6e3a96dc'
      })));
      setError('Sedang menggunakan data lokal karena gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <SupabaseContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};