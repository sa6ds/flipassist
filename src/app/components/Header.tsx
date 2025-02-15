import React from "react";

function Header({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="mx-10">
      <h1 className="ml-4 mt-10 text-2xl font-bold text-slate-900">
        {pageTitle}
      </h1>
      <hr className="mt-4 border border-gray-300"></hr>
    </div>
  );
}

export default Header;
