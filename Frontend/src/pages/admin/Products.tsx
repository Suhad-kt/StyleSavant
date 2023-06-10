// import React from 'react'
import { toast } from "react-toastify";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id:number
  name: string;
  slug: string;
  photo: string;
  description: string;
  quantity: number;
  shipping: boolean;
  price: number;
  category: {
    name: string;
  };
}
const Products = () => {
  const [AllProducts, setAllProducts] = useState<Product[]>([]);


  //get all products
  const getallProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/products/all-products"
      );
      if (data?.success) {
        setAllProducts(data?.products);
      }
    } catch (error) {
      toast.error("something went wrong in getting all product");
    }
  };

  //lifecycle method
  useEffect(() => {
    getallProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:gap-36">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="text-lg font-bold px-5 py-2">
          <h1 className="font-bold text-center">All Products List</h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 cursor-pointer">
            {AllProducts?.map((product) => (
              <Link
              key={product._id}
                to={`/dashboard/admin/product/${product.slug}`}
                className="bg-white max-w-md rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={product.photo}
                  alt="Product Image"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-gray-900 font-bold">{`$ ${product.price}`}</p>
                    <p className="text-lg text-gray-900 font-bold">
                      <span className="text-gray-500 text-md">qty :</span>
                      {`${product.quantity}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
