//pushNotificationManager.ts
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDocument, createDocumentWithId, updateDocument } from "./firebaseHelper";
import {request, PERMISSIONS, requestNotifications} from 'react-native-permissions';
import {Platform} from 'react-native';

export const requestUserPermission = async () => {

  if(Platform.OS ==='ios') {
  const authStatus = await messaging().requestPermission();
  console.log("Auth Status🚨",authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    GetFCMToken();
  }
  } else {
  const resp = await requestNotifications(["alert",'badge'])
  console.log("Requesting permission🚨",resp);
  const authStatus = await messaging().requestPermission();
  console.log("Auth Status🚨",authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled && resp.status==="granted") {
    GetFCMToken();
  }
  }

};

const GetFCMToken = async () => {
  try {
    let fcmtoken = await messaging().getToken();
    if (fcmtoken) {
      await AsyncStorage.setItem("fcmtoken", fcmtoken);
      saveFCMToken(fcmtoken)
    }
    console.log("fcmtoken🚨",fcmtoken);
    
  } catch (error) {
    console.log(error);
  }
};

const saveFCMToken =  async (fcmtoken:string) => {
  const userString = await AsyncStorage.getItem("user") ?? '';
  const user = JSON.parse(userString);

  if(user) {
    console.log(user);
    if(!user.notificationKey){
      const resp = await updateDocument('users',user.uid,{
        notificationKey:fcmtoken
      });
    }
  }else {
    const resp = await createDocumentWithId("unregisteredUsers",fcmtoken,{});
  }

}

export const NotificationListener = () => {
  console.log("Listening 🚨");
  
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
  messaging().onMessage(async (remotemessage) => {
    console.log("remote message", JSON.stringify(remotemessage));
  });
  messaging().onNotificationOpenedApp((remotemessage) => {
    console.log("remote message", JSON.stringify(remotemessage));
  });
};
