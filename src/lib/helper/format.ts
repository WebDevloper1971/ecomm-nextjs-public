export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}
