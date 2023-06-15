import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  photo: string;
  price: number;
  category: {
    name: string;
    _id: string;
  };
  shipping: any;
}
const ProductDeatailes = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>();
  const [relatedProducts, setrelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/product/${params.slug}`
      );
      console.log(data);

      if (data?.product) {
        setProduct(data.product);
        getRelatedProducts(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getsimilarProducts
  const getRelatedProducts = async (pid: string, cid: string) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/similar-products/${pid}/${cid}`
      );
      setrelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl mt-32 p-4 mx-auto">
        {product && (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 rounded-md overflow-hidden">
              <img
                className="w-full h-[600px] object-cover"
                src={product?.photo}
                alt={product?.name}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
              <p className="mb-4">{product?.description}</p>
              <p className="font-bold mb-2">
                Price: ${product?.price.toFixed(2)}
              </p>
              <p className="mb-2">Category: {product?.category.name}</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                Add Cart
              </button>
            </div>
          </div>
        )}
        {/* //similar products */}
        <div>
          <h1 className="text-center text-xl font-extrabold mt-10 tracking-wide">
          {
            relatedProducts?.length < 0 ? 'similar product not found' : 'Simailar Products'
          }
          </h1>
        <div className="mt-11 flex flex-col md:flex-row justify-between">
          {relatedProducts?.map((p) => (
            <div className="flex flex-col md:flex-row shadow-xl bg-slate-300 rounded-md">
              <div className="md:w-1/2 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={p?.photo}
                  alt={p?.name}
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h1 className="text-2xl font-bold mb-4">{p?.name}</h1>
                <p className="mb-4">{p?.description}</p>
                <p className="font-bold mb-2">Price: ${p?.price.toFixed(2)}</p>
                <p className="mb-2">Category: {product?.category.name}</p>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                  Add Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDeatailes;
