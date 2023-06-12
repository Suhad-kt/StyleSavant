import { useSelector } from "react-redux"
import { Rootstate } from "../../Redux/store/store"
import { MdFavorite } from "react-icons/md"

const SearchPage = () => {
  const {results} = useSelector((state:Rootstate)=>state.Search)
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mt-32 text-center max-w-7xl mx-auto ">
        <h1 className="pt-4">{results?.length < 1 ? 'not found' :`found ${results.length} products`}</h1>
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6 mt-6">
            {results?.map((product) => (
              <div
                key={product._id}
                className="bg-white  w-full overflow-hidden rounded-lg  shadow-lg"
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
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 uppercase font-poppins font-medium rounded">
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
      </div>
    </div>
  )
}

export default SearchPage