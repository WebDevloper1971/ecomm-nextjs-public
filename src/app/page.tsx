import Carousel from "@/components/Carousel";
import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const page = (await searchParams).page || "1";
  const currentPage = parseInt(page);
  const pageSize = 8; // how many items per page
  const totalItemCount = await prisma.product.count(); // this returns total no of products we have
  const totalPages = Math.ceil(totalItemCount / pageSize); // math.ceil -> to get upper round up value

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <div className="hero mb-4">
        <Carousel />
      </div>

      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Home;
