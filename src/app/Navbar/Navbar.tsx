import Link from "next/link";
// import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserProfileThings from "./UserProfileThings";
import { auth } from "@/auth";
import { Bree_Serif } from "next/font/google";

// async function searchProducts(formData: FormData) {
//   "use server";

//   const searchQuery = formData.get("searchQuery")?.toString();
//   if (searchQuery) {
//     redirect(`/search?query=${searchQuery}`);
//   }
// }

const bs = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = async () => {
  const cart = await getCart();
  const session = await auth();

  let isLoggedIn = false;
  if (session?.user) {
    isLoggedIn = true;
  }

  return (
    <div className="wrapper m-auto mb-2 mt-4 w-full bg-base-100">
      <div className="navbar flex-row">
        <div className="flex-1">
          <Link
            href={"/"}
            className="flex items-center gap-2 rounded-sm p-2 text-3xl hover:bg-purple-100"
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-10"
            >
              <rect width="100" height="100" rx="2" fill="#000" />
              <path
                d="M84.9559 20.7126C85.9018 21.8415 87.5837 21.9899 88.7126 21.0441C89.8415 20.0982 89.9899 18.4163 89.0441 17.2874C88.0982 16.1585 86.4163 16.0101 85.2874 16.9559C84.1585 17.9018 84.0101 19.5837 84.9559 20.7126ZM50.3211 50.3833L87.3211 19.3833L86.6789 18.6167L49.6789 49.6167L50.3211 50.3833Z"
                fill="white"
              />
              <path
                d="M32.8367 31.9333C33.9044 30.919 33.9477 29.2311 32.9333 28.1633C31.919 27.0956 30.2311 27.0523 29.1633 28.0667C28.0956 29.081 28.0523 30.7689 29.0667 31.8367C30.081 32.9044 31.7689 32.9477 32.8367 31.9333ZM50.3625 49.6556L31.3625 29.6556L30.6375 30.3444L49.6375 50.3444L50.3625 49.6556Z"
                fill="white"
              />
              <circle cx="50" cy="50" r="2" fill="#D9D9D9" />
              <path
                d="M50.5157 73H48.1831L44.1157 61.9928H46.506L48.7807 69.0675C48.9221 69.5301 49.1149 70.2241 49.359 71.1494L49.5325 70.4747L49.9181 69.0675L52.1735 61.9928H54.5639L50.5157 73Z"
                fill="white"
              />
            </svg>

            <span className={`${bs.className} `}>Vadanam</span>
          </Link>
        </div>
        <div className="gap-6 sm:flex-none">
          <div className="hidden gap-6 lg:flex">
            <Link href={"/services"} className="btn btn-ghost">
              Services
            </Link>
            <Link href={"/about"} className="btn btn-ghost">
              About
            </Link>
            <Link href={"/contact"} className="btn btn-ghost">
              Contact
            </Link>
          </div>
          <ShoppingCartButton isLoggedIn={isLoggedIn} cart={cart} />
          <UserProfileThings session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
