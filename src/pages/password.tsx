import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage: NextPage = () => {
  const handleSignIn = () => {
    // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return <div></div>;
};

export default LoginPage;
