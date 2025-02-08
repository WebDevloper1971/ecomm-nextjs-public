import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getOrders } from "./actions";
import { formatPrice } from "@/lib/helper/format";

export const metadata = {
  title: "Orders - Vadanam",
};

const OrderPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const orders = await getOrders();

  return (
    <div>
      <h1 className="m-auto mb-8 w-full max-w-[300px] text-2xl font-semibold sm:max-w-[500px]">
        Orders
      </h1>
      <h2 className="m-auto mb-8 w-full max-w-[300px] text-xs sm:max-w-[500px]">
        [Note : Each user can only place five orders]
      </h2>
      {orders.length ? (
        orders.toReversed().map((o, k) => (
          <div key={k} className="flex flex-col items-center gap-8">
            <div className="my-4 flex min-h-[200px] w-full max-w-[300px] flex-col justify-between rounded-md bg-violet-100 py-2 shadow-md sm:max-w-[500px]">
              <div>
                <div className="flex justify-evenly border-b-2 border-black py-2 text-sm font-semibold">
                  <h1 className="flex-[1] text-center">Items</h1>
                  <h1 className="flex-[1] text-center">Quantity</h1>
                  <h1 className="flex-[1] text-center">Price</h1>
                </div>
                {o.list?.map((li, i) => (
                  <div key={i} className="my-2 flex justify-between">
                    <h1 className="line-clamp-1 flex-[1] overflow-hidden text-center text-sm">
                      {li.name}
                    </h1>
                    <h1 className="flex-1 text-center">X {li.quantity}</h1>
                    <h1 className="flex-1 text-center">
                      {formatPrice(li.price * li.quantity)}
                    </h1>
                  </div>
                ))}
              </div>

              <div className="my-4 flex w-full justify-between px-2 sm:px-6">
                <h1 className="text-right text-sm font-semibold">
                  {o.date?.toDateString()}
                </h1>
                <h1 className="text-right text-sm font-semibold">
                  Total :{formatPrice(o.total!)}
                </h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="w-full text-center text-2xl font-semibold">
          No Orders Yet
        </h1>
      )}
    </div>
  );
};

export default OrderPage;
