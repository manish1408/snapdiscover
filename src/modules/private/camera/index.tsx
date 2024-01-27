import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { arrowBack } from "@/shared/assets/icons-8";
import { normalize } from "@/shared/helpers";
import ButtonSheet from "@/shared/components/buttonSheet";
import Typography from "@/shared/components/typography";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/shared/routes/stack";
import { MOCKUP_PRODUCTS } from "@/db/index";
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
} from "react-native-vision-camera";
import Icon from "@/shared/components/icon";
import { GrantPermission } from "@/shared/components/grantPermission";
import RNFS from "react-native-fs";

export default function CameraScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [found, setFound] = useState(false);
  const [upload, setUpload] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setBase64Photo] = useState<string>("");
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back") || null;
  useEffect(() => {
    // getPermission();
    requestCameraPermission();
    setPhoto(null);
  }, []);
  // async function getPermission() {
  // 	const cameraPermission = await Camera.requestCameraPermission();
  // 	const microphonePermission = await Camera.requestCameraPermission();
  // 	console.log(cameraPermission);
  // }
  async function takePicture() {
    const img = await camera?.current?.takePhoto({ enableShutterSound: false });
	const uriPath  = img?.path || '';
	console.log(uriPath);
    setPhoto(uriPath);
    RNFS.readFile(uriPath, "base64").then((res) => {
	  setBase64Photo(res);

      console.log("------------");

    });

    // fetchImage(`file://${img.name}`);
  }
  function toggleModal() {
    setOpenModal(!openModal);
  }

//   const fetchImage = async (uri: string) => {
//     const imageResponse = await fetch(uri);
//     console.log("11111");
//     console.log(imageResponse);
//     const imageBlob = await imageResponse.blob();
//     const base64Data = await blobToBase64(imageBlob);
//     setBase64Photo(base64Data);
//   };

//   const blobToBase64 = (blob: any): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         resolve(String(reader.result));
//       };
//       reader.readAsDataURL(blob);
//     });
//   };

  async function uploadPhoto() {

    const formData = new FormData();


	const pathArr = photo?.split('/') || '';

  	const fileName = pathArr[pathArr.length - 1];

  
	const filePayload = `data:image/jpeg;name=${fileName};base64,${photoBase64}`;
	
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log(filePayload);

    formData.append("file", filePayload);
    formData.append("providers", "google");

    const response = await fetch("https://api.edenai.run/v2/ocr/ocr", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjQ2YjkyMzctYTRlNy00YjI0LTkzMzEtZDFmYzllYWY4ZmI1IiwidHlwZSI6ImFwaV90b2tlbiJ9.juwh59zTrzcpEaJzAyleZ8gfXIcEXDW3sokxAiPbHBI",
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    Alert.alert(JSON.stringify(data));

    // setOpenModal(true);
    // setUpload(true);
    // setTimeout(() => {
    // 	setUpload(false);
    // 	let isFound = true;
    // 	if (isFound) {
    // 		setFound(isFound);
    // 		navigateTo();
    // 	}
    // }, 2000);
  }

  const navigation = useNavigation<NavigationProps>();

  function navigateTo() {
    const product = MOCKUP_PRODUCTS[0];
    console.log(product);
    navigation.navigate("detailProduct", { ...product });
  }
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");
  const [display, setDisplay] = useState<boolean | null>(null);

  const requestCameraPermission = async () => {
    console.log("Requesting camera permission...");
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === "denied") await Linking.openSettings();
    setCameraPermissionStatus(permission);
  };

  useEffect(() => {
    if (cameraPermissionStatus === "granted") {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [cameraPermissionStatus]);

  return cameraPermissionStatus === "granted" ? (
    <View style={{ flex: 1 }}>
      {photo ? (
        <>
          <Image
            source={{ uri: "file://" + photo }}
            style={{ width: "100%", height: "100%" }}
          />
          <View style={styles.imgBtnWrapper}>
            <TouchableOpacity
              style={styles.imgBtn}
              onPress={() => uploadPhoto()}
            >
              <Text style={{ color: "#000000" }}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgBtn}
              onPress={() => {
                setPhoto(null);
              }}
            >
              <Text style={{ color: "#000000" }}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
          <ButtonSheet dispatch={openModal}>
            <View style={{ padding: normalize(24), height: "70%" }}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Icon icon={arrowBack} />
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: normalize(24),
                    marginLeft: normalize(10),
                  }}
                >
                  Upload Photo
                </Typography>
              </TouchableOpacity>

              {upload && (
                <>
                  <View
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginLeft: normalize(10),
                      }}
                    >
                      Just a moment!
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginLeft: normalize(10),
                      }}
                    >
                      Fetching from all our products
                    </Typography>
                  </View>
                  <ActivityIndicator />
                </>
              )}
              {!found && !upload && (
                <View
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    gap: 20,
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    We were not able to identify it. Ensure that the corners of
                    the product is in the picture and keep and eye on the
                    lightning.
                  </Typography>

                  <TouchableOpacity
                    style={styles.imgBtn}
                    onPress={() => uploadPhoto()}
                  >
                    <Text style={{ color: "#000000" }}>Upload Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imgBtn}
                    onPress={() => {
                      toggleModal();
                      setPhoto(null);
                    }}
                  >
                    <Text style={{ color: "#000000" }}>Retake Photo</Text>
                  </TouchableOpacity>
                </View>
              )}
              {found && !upload && (
                <View
                  style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: 24,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Bingo.
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    We found a match redirecting you for the insights.
                  </Typography>
                </View>
              )}
            </View>
          </ButtonSheet>
        </>
      ) : (
        <>
          <Camera
            ref={camera}
            device={device}
            isActive={true}
            photo={true}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={styles.capture}
            onPress={() => {
              takePicture();
            }}
          ></TouchableOpacity>
        </>
      )}
    </View>
  ) : cameraPermissionStatus === "denied" ||
    cameraPermissionStatus === "restricted" ? (
    <GrantPermission
      desc="Please grant camera permission to continue"
      handleRetryPermission={requestCameraPermission}
    />
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
