import { Checkbox, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Prices } from "../../components/PricesFilter/PricesFiler";
import { useNavigate } from "react-router-dom";
interface Product {
  _id: string;
  name: string;
  slug:string;
  photo: string;
  description: string;
  price: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}
const Homepage = () => {
  const navigate =useNavigate()    //navigate

  const [categories, setCategories] = useState<Category[]>([]);
  const [Products, setProducts] = useState<Product[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [Loading, setLoading] = useState<boolean>(false);

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error as string);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotalProducts()
  }, []);


  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/products/product-list/${page}`
      );
      setLoading(false)
      if (data?.success) setProducts(data?.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  //get total product
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/products/product-count"
      );      
      if (data?.success) setTotal(data?.productCount);      
    } catch (error) {
      console.log(error);
    }
  };

  //Loadmore
  const Loadmore = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/product-list/${page}`
      );      
      if (data?.success) setProducts([...Products,...data?.products]);      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    // if(page === 1) return;
    Loadmore()
  },[page])

  //filter by category
  const handleFilter = (check: boolean, id: string) => {
    let all: string[] = [...checked];
    if (check) {
      all.push(id);
    } else {
      all = all.filter((checkId) => checkId !== id);
    }
    setChecked(all);
  };


  //filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/products/product-filters",
        { checked, radio }
      );

      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <div className="mt-32 bg-gray-100 min-h-screen">
      <div className="max-w-7xl  flex mx-auto">
        <div className=" w-1/3 p-4">
          <h1 className="text-lg font-bold racking-wide">Filter By category</h1>
          <div className="flex flex-col mt-4">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <div className="mt-10 ">
            {/* //Filter By Price */}
            <h1 className="text-lg font-bold tracking-wide">Filter By Price</h1>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-10">
            <button
              className="bg-red-700 hover:bg-red-800 text-base font-poppins tracking-wide text-white px-3 py-2 rounded-full uppercase"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        {/* //product getting */}
        <div className="p-4">
          <h1 className="text-2xl text-center font-extrabold">All products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {Products.map((product) => (
              <div
                key={product._id}
                className="bg-white w-full overflow-hidden rounded-lg  shadow-lg"
              >
                <div className="relative">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-gray-500 hover:bg-gray-600 p-2 rounded-full shadow-md">
                    <MdFavorite size={23}/>
                  </button>
                </div>

                <div className="flex justify-between h-28 px-2 pt-2">
                  <div className="flex-grow p-2">
                    <h1 className="text-xl font-medium font-poppins">
                      {product.name}
                    </h1>
                    <p className="text-gray-500 font-nunito">
                      {product.description.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="p-2 text-right">
                    <div className="text-teal-500 font-semibold text-lg">
                      ${product.price}
                    </div>
                    <div className="text-xs text-gray-500 line-through font-poppins">
                      $20
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pb-4">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 uppercase font-poppins font-medium rounded" onClick={()=>navigate(`/products-details/${product.slug}`)}>
                    <svg viewBox="0 0 24 24" className="inline w-4 h-4 mr-1">
                      <path
                        fill="currentColor"
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                      />
                    </svg>
                    Details
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 uppercase font-poppins font-medium rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            {
              Products && Products?.length < total && (
                <button onClick={()=>setPage(page+1)} className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-md">{Loading ? 'loading...' : "load more"}</button>
              )
            }
          </div>
        </div>     
      </div>
    </div>
  );
};

export default Homepage;
