import ProductDetail from "../features/product-list/components/ProductDetail";
import Navbar from "./../features/navbar/Navbar";
function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </div>
  );
}

export default ProductDetailPage;
