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
import { getUserBadge, UserBadge } from "@/app/utils/badgeUtils";
import { updateProfile } from "firebase/auth";
import ProBadge from "@/app/components/ProBadge";
import Link from "next/link";
import PencilIcon from "@/app/assets/icons/settings/PencilIcon";
import toast from "react-hot-toast";
import { sendGAEvent } from "@next/third-parties/google";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [userBadge, setUserBadge] = useState<UserBadge>({
    name: "",
    badgeClass: "",
    description: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
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
              setUserBadge(getUserBadge(data.createdAt));
            } else {
              setUserData({});
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userData?.createdAt) {
      setUserBadge(getUserBadge(userData.createdAt));
    }
  }, [userData]);

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteUserDocument(user.uid);
        await deleteUser(user);
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

  const handleNameChange = async () => {
    if (!user || !newDisplayName.trim()) return;

    setIsUpdating(true);
    try {
      await updateProfile(user, { displayName: newDisplayName });
      await updateUserDocument(user.uid, { displayName: newDisplayName });
      window.location.reload();
    } catch (error) {
      console.error("Error updating display name:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteInput("");
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error("Please sign in to manage your subscription");
      return;
    }

    try {
      // Log initial state
      console.log("Initial user state:", {
        uid: user.uid,
        isPro: userData?.isPro,
        stripeCustomerId: userData?.stripeCustomerId,
        subscriptionStatus: userData?.subscriptionStatus,
      });

      const token = await user.getIdToken();
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      // Log response data
      console.log("Portal session response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to create portal session");
      }

      window.location.href = data.url;
    } catch (error) {
      // Log the full error
      console.error("Subscription management error:", error);
      toast.error("Something went wrong");

      // Log the state after error
      const userDoc = await getDoc(doc(db, "users", user.uid));
      console.log("User state after error:", userDoc.data());
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Settings" />
        <div className="mx-8 my-8">
          {user && userData ? (
            <div className="p-6 bg-white shadow-md rounded-lg">
              {/* Header Section */}
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold">User Profile</h2>
                <p className="text-sm text-gray-500 text-wrap">
                  Manage your account settings and preferences.
                </p>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                {/* Profile Picture and Name */}
                <div className="flex items-start space-x-8">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={user.photoURL ?? ""}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-24 h-24"
                      priority
                    />
                    {!user.photoURL && (
                      <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-semibold text-gray-600">
                          {user.displayName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold">
                        {user.displayName}
                      </h2>
                      <div className="badge-container group relative">
                        <span className={`${userBadge.badgeClass} text-[10px]`}>
                          {userBadge.name}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          {userBadge.description}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    {!isEditingName && (
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="ml-2"
                      >
                        <PencilIcon />
                      </button>
                    )}
                  </div>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        placeholder={user.displayName ?? ""}
                        disabled={isUpdating}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button
                        onClick={() => {
                          handleNameChange();
                          setIsEditingName(false);
                        }}
                        disabled={isUpdating || !newDisplayName.trim()}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                          isUpdating || !newDisplayName.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }`}
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          setNewDisplayName("");
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="px-3 py-2 text-gray-700">
                      {user.displayName}
                    </p>
                  )}
                </div>

                {/* Account Creation Date */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Account created{" "}
                    {userData.createdAt
                      ? DateUtils.timeSince(userData.createdAt)
                      : "unknown"}
                  </span>
                </div>

                {/* Subscription Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Subscription</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    {userData?.isPro ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <ProBadge size="lg" />
                            <span className="text-gray-600 text-wrap">
                              You&apos;re currently on the Pro plan
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 text-wrap">
                          Enjoy unlimited inventory items and all premium
                          features.
                        </p>
                        <button
                          onClick={handleManageSubscription}
                          className="inline-block px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
                        >
                          Manage Subscription
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-gray-600">Free Plan</span>
                          <span
                            className={`text-sm ${
                              (userData?.totalItems || 0) >= 15
                                ? "text-red-500 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {userData?.totalItems || 0}/15 items used
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              (userData?.totalItems || 0) >= 15
                                ? "bg-red-500"
                                : "bg-purple-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                ((userData?.totalItems || 0) / 15) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        {(userData?.totalItems || 0) >= 15 && (
                          <p className="text-sm text-wrap text-red-500 font-medium break-words">
                            You&apos;ve reached the free plan limit. Upgrade to
                            Pro for unlimited items!
                          </p>
                        )}
                        <p className="text-sm text-wrap text-gray-500 break-words">
                          Upgrade to Pro for unlimited inventory items and
                          premium features.
                        </p>
                        <Link
                          href="/upgrade"
                          className="inline-block px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600"
                        >
                          Upgrade to Pro
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start gap-4">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Logout
                  </button>
                  <button
                    onClick={openModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Account
                  </button>
                </div>
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