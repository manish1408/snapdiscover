import firestore from '@react-native-firebase/firestore';

export const getDocument = async (collectionName: string) => {
    const userDocRef = firestore().collection(collectionName)
    const resp = await userDocRef.get();
    const data: Array<any> = [];
    resp.forEach((doc) => {
      const _data = {
        data: doc.data(),
        _id: doc.id,
      };
      data.push(_data);
    });
    return data;
}

export const getDocumentWithId = async (collectionName: string,collectionId: string) => {
    const userDocRef = firestore().collection(collectionName).doc(collectionId)
    const resp = await userDocRef.get();
    if (resp.exists) {
        const data = {
          data: resp.data(),
          _id: resp.id,
        };
        return data;
      } else {
        return null;
      }
}

export const createDocument = async (collectionName: string, data: any) => {
    const userDocRef = firestore().collection(collectionName)
    const resp = await userDocRef.add(data);
    return resp;
}

export const createDocumentWithId = async (collectionName: string, collectionId: string, data: any) => {
    const userDocRef = firestore().collection(collectionName).doc(collectionId)
    const resp = await userDocRef.set(data);
    return resp;
}

export const updateDocument = async (collectionName: string, collectionId: string, data: any) => {
    const userDocRef = firestore().collection(collectionName).doc(collectionId);
    const resp = await userDocRef.update(data);
    return resp
}

export const deleteDocument = async (collectionName: string, collectionId: string) => {
    const userDocRef = firestore().collection(collectionName).doc(collectionId);
    const resp = await userDocRef.delete();
    return resp
}