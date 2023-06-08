import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface CategoryFormProps {
  HandleSubmit: (e: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  HandleSubmit,
  setValue,
  value,
}) => {
  return (
    <>
      <form onSubmit={HandleSubmit} className="flex flex-col items-center gap-2 md:flex-row ">
        <div className="w-full p-1 flex items-center gap-2 border rounded-xl mb-5 ">
          <AiOutlineSearch size={25} className='ml-3'/>
          <input
            type="text"
            placeholder="Add new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className=" w-full focus:outline-none placeholder:text-base text-sm"
          />
        </div>
        <button className="px-4 py-2 text-white bg-blue-700 rounded-md mb-5">Submit</button>
      </form>
    </>
  );
};

export default CategoryForm;
