import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProduct,
} from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProduct();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
    {featuredProducts.length > 0 && (
      <ProductCarousel data={featuredProducts} />
    )}
      <ProductList data={latestProducts} title="Newest Arrivals" />
      <ViewAllProductButton />
    </>
  );
};

export default Homepage;
