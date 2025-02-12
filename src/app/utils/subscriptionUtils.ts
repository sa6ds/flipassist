import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import toast from "react-hot-toast";

export const checkProAccess = async (userId: string) => {
  if (!userId) return false;

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    return userData?.isPro || false;
  } catch (error) {
    console.error("Error checking Pro access:", error);
    return false;
  }
};

export const requireProAccess = (callback: Function, fallback?: Function) => {
  return async (...args: any[]) => {
    const user = auth.currentUser;
    if (!user) return;

    const isPro = await checkProAccess(user.uid);
    if (isPro) {
      return callback(...args);
    } else {
      if (fallback) {
        fallback();
      } else {
        toast.error("This feature requires a Pro subscription");
      }
    }
  };
};
