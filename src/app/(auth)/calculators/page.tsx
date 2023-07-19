"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import WorkInProgress from "@/app/components/WorkInProgress";
import Footer from "@/app/components/Footer";

export default function Calculators() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Calculators" />

        <div className="mx-8 my-8">
          <WorkInProgress />
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}
