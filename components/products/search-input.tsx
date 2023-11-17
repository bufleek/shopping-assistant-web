"use client";

export default function SearchInput({initialValue = ""}){
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("query");
      if(query){
        window.location.href = `/browse?query=${query}`;
      }
    }
  
    return (
        <form className="flex justify-center align-center py-1" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for products"
              name="query"
              defaultValue={initialValue}
              className="px-5 py-3 rounded-l-md bg-white text-gray-800 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-r-md bg-primary hover:bg-p-500 text-on-primary font-medium"
            >
              Search
            </button>
          </form>
    )
}