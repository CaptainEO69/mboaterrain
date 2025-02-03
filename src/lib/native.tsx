import { Camera, CameraResultType } from '@capacitor/camera';
import { PushNotifications } from '@capacitor/push-notifications';
import { useState, useEffect } from 'react';

// Hook pour gérer l'appareil photo
export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      
      setPhoto(image.webPath || null);
      return image.webPath;
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
      return null;
    }
  };

  return { photo, takePicture };
};

// Hook pour gérer les notifications push
export const usePushNotifications = () => {
  const [permission, setPermission] = useState<boolean>(false);

  const initPushNotifications = async () => {
    try {
      // Demander la permission
      const result = await PushNotifications.requestPermissions();
      
      if (result.receive === 'granted') {
        setPermission(true);
        
        // Enregistrer l'appareil pour les notifications
        await PushNotifications.register();

        // Configurer les listeners
        PushNotifications.addListener('registration', (token) => {
          console.log('Token de notification push:', token.value);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Notification reçue:', notification);
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des notifications:', error);
    }
  };

  useEffect(() => {
    initPushNotifications();
  }, []);

  return { permission };
};