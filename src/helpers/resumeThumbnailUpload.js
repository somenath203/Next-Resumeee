import { getStorage, getDownloadURL, uploadBytes, ref } from 'firebase/storage';

import firebaseAppConfig from "@/config/firebaseConnect";


export const uploadResumeThumbnailInFirebase = async (thumbnail) => {

    try {

        const storageReference = getStorage(firebaseAppConfig);

        const thumbnailReference = ref(storageReference, thumbnail?.name);

        const fileUplaodInFirebase = await uploadBytes(thumbnailReference, thumbnail);

        const urlOfTheUploadedThumbnailInFirebase = await getDownloadURL(fileUplaodInFirebase.ref);

        return {
            success: true,
            urlOfTheUploadedThumbnailInFirebase: urlOfTheUploadedThumbnailInFirebase
        }
        
    } catch (error) {
        
        console.log(error);
        
    }

};