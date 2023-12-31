"use client";
import { logEvent, EventNames, EventParams, SearchLocations } from "@/lib/analytics";

export default function SearchInput({initialValue = ""}){
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newQuery = formData.get("query")?.toString()?.trim();
    if (newQuery && newQuery) {
      logEvent(EventNames.SEARCH, {
        [EventParams.SEARCH_TERM]: newQuery,
        [EventParams.SEARCH_LOCATION]: SearchLocations.SEARCH_RESULTS,
      });
      window.location.href = `/browse?query=${newQuery}`;
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