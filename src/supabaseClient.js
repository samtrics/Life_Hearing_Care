import { createClient } from '@supabase/supabase-js';
import CryptoJS from 'crypto-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SECRET_KEY = import.meta.env.VITE_API_SECRET || supabaseAnonKey; // Fallback to anon key for encryption

const secureStorage = {
  getItem: (key) => {
    const value = window.localStorage.getItem(key);
    if (!value) return null;
    try {
      const decrypted = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return decrypted || null;
    } catch (e) {
      return null;
    }
  },
  setItem: (key, value) => {
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    window.localStorage.setItem(key, encrypted);
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'staff-portal-auth-token',
    storage: secureStorage,
  }
});
