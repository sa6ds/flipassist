"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import WorkInProgress from "@/app/components/WorkInProgress";

export default function Calculators() {
  return (
    <div>
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Calculators" />

        <div className="mx-8 my-8">
          <WorkInProgress />
        </div>
      </div>
    </div>
  );
}
