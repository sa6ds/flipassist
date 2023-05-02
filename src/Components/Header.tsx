import React from "react";

function Header({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="mx-10">
      <h1 className="ml-8 mt-10 text-2xl font-bold text-gray-500 md:ml-12 md:text-3xl">
        {pageTitle}
      </h1>
      <hr className="mt-6 border border-gray-300"></hr>
    </div>
  );
}

export default Header;
