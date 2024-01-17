import React, { useEffect } from "react";
import useEffectOnce from "@/shared/hooks/useEffectOnce";
import { storage } from "@/shared/helpers";
import i18n from "i18next";

import AppStack from "@/shared/navigation/AppStack";
import AuthStack from "@/shared/navigation/AuthStack";
import { useAuth } from "@/shared/hooks/useAuth";
// import useFirebaseCloudMessaging from '@/shared/hooks/useFirebaseCloudMessaging';
import {
  NotificationListener,
  requestUserPermission,
} from "./src/shared/helpers/pushNotificationManager";
import useSplashScreen from "@/shared/hooks/useSplashScreen"; 
import { UserProvider } from "@/shared/hooks/userContext";
import { ToastProvider } from "react-native-toast-notifications";
import {request, PERMISSIONS} from 'react-native-permissions';

function App(): JSX.Element {
  // Push Notification hook
  // useFirebaseCloudMessaging();
  // Splash Screen
  useSplashScreen();

  const { user } = useAuth();

  async function getTranslate() {
    const ing = await storage.get("language");
    console.log("ing", ing);
    if (ing) {
      await i18n.changeLanguage(ing);
      return;
    }
    await i18n.changeLanguage("en");
  }

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  useEffectOnce(() => {
    getTranslate().catch();
  }, []);

  return (
    <ToastProvider>
      <UserProvider>{user ? <AppStack /> : <AuthStack />}</UserProvider>
    </ToastProvider>
  );
}

export default App;
