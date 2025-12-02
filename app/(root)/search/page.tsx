import ProductCard from "@/components/shared/product/product-card";
import { CardContent } from "@/components/ui/card";
import { getAllProducts } from "@/lib/actions/product.actions";
import { PAGE_SIZE } from "@/lib/constants";

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const { 
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;
  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/*Filters */}</div>
      <div className="md:col-span-4 space-y-4">
        {products.data.length == 0 && <div>No products found</div>} :
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
