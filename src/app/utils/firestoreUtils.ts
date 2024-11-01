import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";

/**
 * Updates the user document in Firestore.
 * If the document exists, it merges the new data with the existing data.
 * If the document does not exist, it creates a new document with the provided data.
 *
 * @param {string} uid - The user ID.
 * @param {any} data - The data to update in the user document.
 */
export const updateUserDocument = async (uid: string, data: any) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const existingData = userSnapshot.data();
      if (existingData?.createdAt) {
        data.createdAt = existingData.createdAt;
      }
      await setDoc(userRef, data, { merge: true });
    } else {
      await setDoc(userRef, data);
    }
  } catch (error) {
    console.error("Error updating user document:", error);
  }
};

/**
 * Deletes the user document from Firestore.
 *
 * @param {string} uid - The user ID.
 */
export const deleteUserDocument = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting user document:", error);
  }
};
