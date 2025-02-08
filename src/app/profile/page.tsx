import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "My Profile - Vadanam",
};

async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const user = session.user;

  const shippingInfo = await prisma.shippingInfo.findFirst({
    where: { userId: user.id },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {shippingInfo && (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="avatar placeholder">
            <div className="size-20 rounded-full bg-neutral text-neutral-content">
              <span className="text-3xl sm:text-4xl">
                {session.user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="my-6 flex w-full flex-col items-center justify-center gap-4">
            <h1 className="flex gap-2 text-3xl font-semibold sm:text-4xl">
              <span>Hi 👋</span>
              <span>{shippingInfo?.name}</span>
            </h1>
          </div>
        </div>
      )}

      <form
        action={async (formData) => {
          "use server";
          const act = formData.get("action");

          const userId = user.id;
          const email = user.email as string;
          const name = user.name as string;
          const phone = formData.get("phone") as string;
          const address = formData.get("address") as string;
          const state = formData.get("state") as string;
          const city = formData.get("city") as string;
          const pincode = formData.get("pincode") as string;

          if (!phone || !address || !state || !city || !pincode) {
            redirect("/profile");
          }

          if (act === "add") {
            await prisma.shippingInfo.create({
              data: {
                userId,
                name,
                email,
                phone,
                address,
                state,
                city,
                pincode,
              },
            });
          }

          if (act === "edit") {
            const sdId = await prisma.shippingInfo.findFirst({
              where: { email },
            });
            await prisma.shippingInfo.update({
              where: {
                id: sdId?.id,
              },
              data: {
                userId,
                name,
                email,
                phone,
                address,
                state,
                city,
                pincode,
              },
            });
          }

          revalidatePath("/profile", "page");
          redirect("/profile");
        }}
        className="my-16 flex w-full max-w-[300px] flex-col gap-8 text-sm sm:max-w-[500px]"
      >
        <input
          type="hidden"
          name="action"
          defaultValue={shippingInfo ? "edit" : "add"}
        />
        <label className="flex flex-col">
          <span className="my-labels">username:</span>
          <input
            className="my-inputs input-disabled"
            name="name"
            defaultValue={user.name as string}
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">email:</span>
          <input
            defaultValue={user.email as string}
            name="email"
            className="my-inputs input-disabled"
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">phone:</span>
          <input
            required
            type="number"
            maxLength={10}
            name="phone"
            className="my-inputs input-bordered"
            defaultValue={shippingInfo ? shippingInfo.phone : ""}
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">address:</span>
          <textarea
            required
            rows={8}
            name="address"
            className="w-full resize-none rounded-sm border border-gray-400 p-3"
            defaultValue={shippingInfo ? shippingInfo.address : ""}
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">state:</span>
          <input
            required
            name="state"
            type="text"
            maxLength={20}
            className="my-inputs input-bordered"
            defaultValue={shippingInfo ? shippingInfo.state : ""}
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">city:</span>
          <input
            required
            name="city"
            type="text"
            maxLength={20}
            className="my-inputs input-bordered"
            defaultValue={shippingInfo ? shippingInfo.city : ""}
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col">
          <span className="my-labels">pincode:</span>
          <input
            name="pincode"
            required
            type="number"
            maxLength={6}
            className="my-inputs input-bordered"
            defaultValue={shippingInfo ? shippingInfo.pincode : ""}
          />
        </label>
        <button
          type="submit"
          className="my-12 h-12 rounded-sm bg-[#6772FF] text-white"
        >
          {shippingInfo ? "Edit Shipping Details" : "Add Shipping Details"}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
