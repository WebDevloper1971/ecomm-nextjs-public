import React from "react";
import { Bree_Serif } from "next/font/google";

const bs = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

function AboutPage() {
  return (
    <div className="my-32 flex flex-col items-center gap-10">
      <h1 className={`${bs.className} my-20 text-4xl antialiased`}>
        A Watch Isn’t About Telling Time, It’s About Telling Your Relationship
        With Time.{" "}
      </h1>
      <div className="flex flex-col gap-4 text-justify text-base leading-10 tracking-wide lg:w-full">
        <p>
          Nestled in the heart of timeless elegance, our timepiece store offers
          an exquisite collection of premium classic watches. We are dedicated
          to those who appreciate the art of horology and the allure of
          tradition. Each piece in our curated selection embodies craftsmanship,
          sophistication, and timeless design, catering to discerning
          connoisseurs and collectors.
        </p>

        <p>
          From the finest Swiss movements to meticulously crafted dials and
          luxurious straps, every watch tells a story of excellence and
          heritage. Step into our store and experience the epitome of luxury,
          where every tick and tock is a testament to enduring style and
          impeccable taste.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
