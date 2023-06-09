import { ChangeEvent, useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/store/store";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

interface Category {
  _id: string;
  name: string;
}

const UpdateProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const auth = useSelector((state: Rootstate) => state.authreducer);
  const navigate = useNavigate();
  const params = useParams();

  //get single products
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/product/${params.slug}`
      );

      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setId(data.product._id);
      setFile(data.product.photo);
    } catch (error) {
      toast.error("something went wrong in getting single product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("someting went wrong in getting all categories");
    }
  };

  useEffect(() => {
    getAllCategory();
    //eslint-disable-next-line
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {file
      const selectedfile = e.target.files[0];
      setFile(selectedfile);
    }
  };

  //handleClick function  && update product
  const handleUpdateProduct = async () => {                     //error in update
    try {

      const ProductData = new FormData();
      console.log(ProductData);

      ProductData.append("name", name);
      ProductData.append("description", description);
      ProductData.append("price", price);
      ProductData.append("quantity", quantity);
      ProductData.append("category", category);
      file && ProductData.append("file", file as File);
      ProductData.append("shipping", shipping);

      const { data } = await axios.put(
        `http://localhost:8080/api/products/update-product/${id}`,
        ProductData,
        {
          headers: {
            Authorization: auth?.accessToken,
          },
        }
      );

      if (data?.success) {
        toast.success(`${name} Updated successfully`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("something went wrong in update product");
    }
  };

  //Delete product
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
         await axios.delete(
          `http://localhost:8080/api/products/delete-product/${id}`,
          {
            headers: {
              Authorization: auth?.accessToken,
            },
          }
        );
        toast.success(`${name} is Deleted`)  
         navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("something went wrong in deleting");
    }
  };

  return (
    <div className="max-w-7xl m-auto p-5 mt-36">
      <div className="flex flex-col gap-16 md:flex-row md:gap-36">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="text-base border px-5 py-2">
          <h3 className="p-2 text-lg font-extrabold text-center ">
            Update Product
          </h3>
          <div className="m-1">
            <Select
              bordered={false}
              showSearch
              placeholder="Select a Category"
              size="large"
              className="mb-4 border"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((Citems) => (
                <Option key={Citems._id} value={Citems._id}>
                  {Citems.name}
                </Option>
              ))}
            </Select>
            <div>
              <label className="border text-sm text-black hover:bg-blue-700 hover:text-white p-2 rounded-md">
                {"Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            </div>
            <div className="m-4 ">
              {file ? (
                <div>
                  <img
                    src={
                      typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                    }
                    alt="product-photo"
                    height={"200px"}
                    className="rounded-lg "
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            {/* input form */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Add product name"
                value={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="write a description"
                value={description}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <input
                type="number"
                placeholder="write a price"
                value={price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <input
                type="number"
                placeholder="write a quantity"
                value={quantity}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <Select
                bordered={false}
                placeholder="Select shipping"
                size="large"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="1">Yes</Option>
                <Option value="0">NO</Option>
              </Select>
            </div>
            <div className="m-3 text-center">
              <button
                type="submit"
                className="bg-red-700 text-white hover:bg-red-800 font-medium text-sm px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleDelete}
              >
                Delete Product
              </button>
              <button
                type="submit"
                onClick={handleUpdateProduct}
                className="bg-blue-700 text-white hover:bg-blue-800 font-medium text-sm px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
