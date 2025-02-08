import Image from "next/image";
import { Bree_Serif } from "next/font/google";

const bs = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const Carousel = () => {
  return (
    <div className="mb-20 flex h-fit w-full flex-col gap-20">
      <div className="h-[250px] w-full items-center overflow-y-hidden rounded-sm lg:h-[400px]">
        <div className="h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1659461278040-93b185510d5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full object-cover"
            alt="Tailwind CSS Carousel component"
            width={3000}
            height={400}
            priority={true}
          />
        </div>
      </div>

      <div className="heading flex h-full flex-col gap-6">
        <p
          className={`block text-xl tracking-widest lg:text-[40px] lg:leading-[50px] ${bs.className} word-spacer text-center antialiased`}
        >
          A Gentleman&apos;s Choice Of Timepiece Says As Much About Him As Does
          his Saville Row Suit
        </p>
        <h5 className="text-center text-xl">- Ian Fleming -</h5>
      </div>
    </div>
  );
};

export default Carousel;

/*
src="https://images.unsplash.com/photo-1637719752114-42a31081896c?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
src="https://images.unsplash.com/photo-1588559674156-c5984ed49b1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
src="https://images.unsplash.com/photo-1607776905497-b4f788205f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
*/
