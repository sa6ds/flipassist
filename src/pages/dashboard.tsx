import { NextPage } from "next";
import { signIn } from "next-auth/react";

const DashboardPage: NextPage = () => {
  const handleSignIn = () => {
    signIn(); // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Home</p>
      <p>Inventory</p>
      <p>Fee Calculators</p>
      <p>Settings</p>
    </div>
  );
};

export default DashboardPage;
