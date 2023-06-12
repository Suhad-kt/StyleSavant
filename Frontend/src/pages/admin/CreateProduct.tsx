import React, { ChangeEvent, useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { Select } from "antd";
const {Option} = Select
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/store/store";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const CreateProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [shipping, setShipping] = useState("");

  const auth = useSelector((state: Rootstate) => state.authreducer);
  const navigate = useNavigate()
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
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  //handleClick function  && post form
  const handleCreateProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("quantity", quantity);
      formdata.append("category", category);
      formdata.append("file", file as File);
      formdata.append("shipping", shipping);

      const { data } = await axios.post(
        "http://localhost:8080/api/products/create-product",
        formdata,
        {
          headers: {
            Authorization: auth?.accessToken,
          },
        }
      );

      if (data?.success) {
        toast.success(`${name} created successfully`)
        setName("")
        setFile(null)
        setDescription("")
        setCategory("")
        setPrice("")
        setQuantity("")
        setShipping("")
        navigate('/dashboard/admin/products')
      }
      else{
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error("something went wrong in submit");
    }
  };

  return (
    <div className="max-w-7xl m-auto p-5 mt-36">
      <div className="flex flex-col gap-16 md:flex-row md:gap-36">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="text-base border px-5 py-2">
          <h3 className="p-2 ">CreateProduct</h3>
          <form className="m-1" onSubmit={handleCreateProduct}>
            <Select
              bordered={false}
              showSearch
              placeholder="Select a Category"
              size="large"
              className="mb-4 border"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((Citems) => (
                <Option key={Citems._id} value={Citems._id}>
                  {Citems.name}
                </Option>
              ))}
            </Select>
            <div>
              <label className="border text-sm text-black hover:bg-blue-700 hover:text-white p-2 rounded-md">
                {file ? file.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            </div>
            <div className="mt-4">
              {file && (
                <div>
                  <img src={URL.createObjectURL(file)} alt="product-photo" />
                </div>
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
              >
                <Option value="1">Yes</Option>
                <Option value="0">NO</Option>
              </Select>
            </div>
            <div className="m-3 text-center">
              <button type="submit" className="bg-blue-700 text-white hover:bg-blue-800 font-medium text-sm px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
