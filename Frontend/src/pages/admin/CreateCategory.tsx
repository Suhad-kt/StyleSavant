import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/store/store";
import { Modal } from "antd";

interface Category {
  _id: string;
  name: string;
}

const CreateCategory = () => {
  const auth = useSelector((state: Rootstate) => state.authreducer);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [Visible, setVisible] = useState(false);
  const [Selected, setSelected] = useState<Category | null>(null);
  const [UpdateName, setUpdateName] = useState("");

  console.log(Selected);

  //handleForm   && create category
  const HandleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth?.accessToken,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} category is created`);
        getAllCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something error in input form");
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong getting all category ");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Updatecategory or edit
  const HandleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/category/update-category/${Selected?._id}`,
        { name: UpdateName },
        { headers: { Authorization: auth?.accessToken } }
      );

      if (data.success) {
        toast.success(`${UpdateName} is updated`);
        setVisible(false);
        setSelected(null);
        setUpdateName("");
        getAllCategories();
      }
    } catch (error) {
      toast.error("Something went wrong in update category");
    }
  };

  //delete category
  const HandleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/category/delete-category/${id}`,
        { headers: { Authorization: auth?.accessToken } }
      );

      if (data.success) {
        toast.success(`${data.category.name} is deleted`);
        getAllCategories();
      }
    } catch (error) {
      toast.error("Something went wrong in Deleting category");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 mt-36">
      <div className="flex flex-col gap-16 md:flex-row md:gap-36">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div>
          <h3 className="pb-6 text-center text-xl font-bold">
            Manage Category
          </h3>
          <div>
            <CategoryForm
              HandleSubmit={HandleSubmit}
              value={name}
              setValue={setName}
            />
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 shadow-md border">
              <thead className="text-xl text-gray-700 uppercase">
                <tr>
                  <th className="text-black px-6 py-5">Name</th>
                  <th className="text-black px-6 py-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap border"
                    >
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4">
                        <button
                          className="px-4 py-1  font-semibold text-white bg-blue-500 rounded-md"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-1  font-semibold text-white bg-red-600  rounded-md ml-2"
                          onClick={() => {
                            HandleDelete(category._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4">No categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Modal
            className=""
            onCancel={() => setVisible(false)}
            footer={null}
            open={Visible}
          >
            <CategoryForm
              value={UpdateName}
              setValue={setUpdateName}
              HandleSubmit={HandleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
