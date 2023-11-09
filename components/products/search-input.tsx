export default function SearchInput(){
    return (
        <form className="flex justify-center align-center" action="browse">
            <input
              type="text"
              placeholder="Search for products"
              name="search"
              className="px-5 py-3 rounded-l-md mt-4 bg-white text-gray-800 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-r-md mt-4 bg-primary hover:bg-p-500 text-on-primary font-medium"
            >
              Search
            </button>
          </form>
    )
}