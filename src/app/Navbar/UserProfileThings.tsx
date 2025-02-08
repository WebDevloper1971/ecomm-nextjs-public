import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
interface UserProfileThingsProps {
  session: Session | null;
}

const UserProfileThings = ({ session }: UserProfileThingsProps) => {
  // const closeDropdown = () => {
  //   const element = document.activeElement as HTMLElement;
  //   if (element) {
  //     element.blur();
  //   }
  // };
  return (
    <div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost"
          aria-label="user-actions-btn"
        >
          <div className="flex size-10 items-center justify-center rounded-full shadow-2xl">
            {!session?.user ? (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="m-auto size-6"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </div>
            ) : (
              <div className="full flex h-full w-full items-center justify-center rounded bg-[#6772FF] text-white">
                {session.user.image && (
                  <Image
                    src={session.user.image || ""}
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full"
                    alt="profile image"
                  />
                )}
                {!session.user.image && (
                  <h1 className="flex h-full w-full items-center justify-center text-xl font-normal">
                    {session.user.name.charAt(0).toUpperCase()}
                  </h1>
                )}
              </div>
            )}
          </div>
        </div>
        {session?.user ? (
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 h-40 w-32 gap-2 rounded-box bg-base-100 p-2 shadow"
          >
            <Link
              className="flex flex-1 items-center justify-center"
              href={"/profile"}
            >
              Profile
            </Link>

            <Link
              className="flex flex-1 items-center justify-center"
              href={"/orders"}
            >
              Orders
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut();
                redirect("/");
              }}
              className="flex flex-1 items-center justify-center text-red-600"
            >
              <button>Logout</button>
            </form>
          </ul>
        ) : (
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 h-20 w-32 gap-2 rounded-box bg-base-100 p-2 shadow"
          >
            <Link
              className="flex flex-1 items-center justify-center"
              href={"/sign-in"}
            >
              Login
            </Link>

            <Link
              className="flex flex-1 items-center justify-center"
              href={"/sign-up"}
            >
              Signup
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfileThings;
