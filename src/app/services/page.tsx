import React from "react";

function ServicePage() {
  return (
    <div className="flex min-h-[80svh] w-full items-center justify-center">
      <div className="w-full max-w-[300px] lg:max-w-2xl">
        <h1 className="text-2xl">
          We are here to provide you with a quality experiences.
        </h1>
        <h2 className="my-10 text-lg">
          Here are some of services that we provide :{" "}
        </h2>
        <ul className="flex list-disc flex-col gap-4 p-4">
          <li>Custom Hand Crafted timepieces on demand.</li>
          <li>Free timepiece repairing uptil one year of any purchase.</li>
          <li>Vadanam Member Club for VIP access and premium services.</li>
          <li>
            Fast and Reliable delivery and retrieval directly to and from home.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ServicePage;
