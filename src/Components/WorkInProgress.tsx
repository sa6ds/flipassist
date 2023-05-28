import React from "react";

function WorkInProgress() {
  return (
    <div className="flex justify-center">
      <div className="flex h-[450px]">
        <div className="m-auto">
          <div className="whitespace-normal text-center">
            <h1 className="mb-8 text-3xl font-bold">Oops!</h1>
            <p className="text-lg">
              We're sorry! This page is still under WorkInProgress.
              <br />
              Please check back soon for updates. Thank you for your
              understanding!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkInProgress;
