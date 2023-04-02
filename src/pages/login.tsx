import { NextPage } from "next";
import { signIn } from "next-auth/react";

const LoginPage: NextPage = () => {
  const handleSignIn = () => {
    signIn(); // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with NextAuth</button>
    </div>
  );
};

export default LoginPage;
