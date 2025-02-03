import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cepbomjkpvaoptyuunhx.app',
  appName: 'Immobilier CMR',
  webDir: 'dist',
  server: {
    url: 'https://cepbomjkpvaoptyuunhx.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;