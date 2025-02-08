import { auth } from "@/auth";
import SubmitButton from "@/components/SubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Verniture",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });
}
const AddProductPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const id = session.user.id;
  const user = await prisma.user.findUnique({ where: { id } });
  const role = user?.role;

  if (role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="m-auto w-full max-w-[300px]">
      <h1 className="mb-3 text-2xl font-semibold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="enter product name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="enter product description"
          className="textarea textarea-bordered mb-3 w-full resize-none"
          rows={5}
        />
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="enter product image url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="enter product price"
          className="input input-bordered mb-3 w-full"
        />

        <SubmitButton className="btn-block">Add Product</SubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
