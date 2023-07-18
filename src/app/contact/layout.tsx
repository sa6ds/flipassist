import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | flipassist",
  //   TODO: ADD DESCRIPTION FOR CONTACT
  description: "Reach out to our dedicated support team for assistance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-[100vh]">
        {children}
        <div className="sticky top-full">
          <Footer />
        </div>
      </div>
    </section>
  );
}
