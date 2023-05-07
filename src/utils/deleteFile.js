import { ref, deleteObject } from "firebase/storage";
import storage from "./firebase";

// Create a reference to the file to delete
export const deleteFile = async (fileName) => {
  const desertRef = ref(storage, fileName);

  // Delete the file
  await deleteObject(desertRef);
};
