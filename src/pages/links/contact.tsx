import { type NextPage } from "next";
import Footer from "~/Components/Footer";
import Navbar from "~/Components/Navbar";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Head from "next/head";

const ContactPage: NextPage = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current !== null) {
      emailjs
        .sendForm(
          "gmail_service",
          "default_template",
          form.current,
          "PxL-DIuFVq2aFXrhE"
        )
        .then(
          (result) => {
            // TODO: Add Toasts
            console.log(result);
            alert("Sent!");
          },
          (error) => {
            console.log(error);
            alert("Something went wrong. Please try again.");
          }
        );
    } else {
      console.error("Form reference is null");
    }
  };

  return (
    <div className=" min-h-[100vh]">
      <Head>
        <title>Contact | flipassist</title>
      </Head>
      <div className="container mx-auto mb-12 max-w-7xl md:mb-48">
        <Navbar />
        <div className="mt-10 flex justify-center">
          <div className="mx-10 md:w-[500px]">
            <div className="mx-auto text-center">
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <p className="mt-1">Get in touch with us.</p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="mt-8">
              <input
                className="my-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-5 py-1.5"
                placeholder="Name"
                required
                type="text"
                name="user_name"
              />
              <input
                className="my-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-5 py-1.5"
                placeholder="Email"
                required
                type="email"
                name="user_email"
              />
              <textarea
                className="min-h-6 my-2 h-48 min-h-[6px] w-full rounded-lg border border-gray-300 bg-gray-100 px-5 py-1.5"
                name="message"
                placeholder="Description"
                required
              />
              <button
                type="submit"
                value="Send"
                className="duration-1500 w-full rounded-lg border border-black bg-black py-1.5 text-center text-white transition-all hover:bg-white hover:text-black"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="sticky top-full">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
