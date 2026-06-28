import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    clinicName: 'Life Hearing Care',
    supportEmail: 'admin@lifehearingcare.com',
    contactPhone: '+1 (555) 123-4567'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('clinic_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (data && !error) {
          setSettings({
            clinicName: data.clinic_name || 'Life Hearing Care',
            supportEmail: data.support_email || 'admin@lifehearingcare.com',
            contactPhone: data.contact_phone || '+1 (555) 123-4567'
          });
        }
      } catch (err) {
        console.error("Failed to load clinic settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {!isLoading && children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
