import { ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebase";

export const upLoadFile = (file, url) => {
  const storageRef = ref(storage, url);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};
