"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
export default function Contact() {
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
            toast.success("Email sent successfully!");
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
    <div className="bg-grid-gray-200 min-h-screen">
      <div className="bg-gradient-to-b from-transparent to-slate-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto sm:px-16 max-w-4xl">
          <div className="flex justify-center">
            <div className="mx-10">
              <div className="mx-auto text-center">
                <h1 className="text-3xl text-slate-900 font-bold">
                  Contact Us
                </h1>
                <p className="mt-1">Get in touch with us.</p>
              </div>

              <form
                ref={form}
                onSubmit={sendEmail}
                className="mt-8 md:w-[500px]"
              >
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
                  className="duration-1500 w-full rounded-lg bg-green-500 hover:bg-green-600 border border-green-600 py-1.5 text-center text-white transition-all"
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
    </div>
  );
}
