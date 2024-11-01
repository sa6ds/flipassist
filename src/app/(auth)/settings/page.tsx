"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/Firebase";
import { User, onAuthStateChanged, deleteUser, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  updateUserDocument,
  deleteUserDocument,
} from "@/app/utils/firestoreUtils";
import { DateUtils } from "@/app/utils/dateUtils";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        if (user.uid) {
          try {
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);
            const data = userSnapshot.data();
            if (data) {
              setUserData(data);
            } else {
              setUserData({});
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.error("User UID is undefined");
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteUserDocument(user.uid); // Delete user document from Firestore
        await deleteUser(user); // Delete user from Firebase Authentication
        router.push("/");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteInput("");
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Settings" />
        <div className="mx-8 my-8">
          {user && userData ? (
            <div className="flex flex-col items-center">
              <Image
                src={user.photoURL ?? ""}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h2 className="text-2xl font-bold mt-4">{user.displayName}</h2>
              <p className="text-lg">{user.email}</p>
              <p className="text-lg">
                Account created{" "}
                {userData.createdAt
                  ? DateUtils.timeSince(userData.createdAt)
                  : "unknown"}{" "}
              </p>
              <div className="flex mt-6 gap-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Logout
                </button>
                <button
                  onClick={openModal}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="mb-4">
              Please type <strong>delete</strong> to confirm.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== "delete"}
                className={`px-4 py-2 rounded-lg ${
                  deleteInput === "delete"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
