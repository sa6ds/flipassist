import React from "react";

function Header({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="mx-10">
      <h1 className="ml-8 mt-10 text-3xl font-bold text-slate-900 md:ml-12">
        {pageTitle}
      </h1>
      <hr className="mt-6 border border-gray-300"></hr>
    </div>
  );
}

export default Header;
