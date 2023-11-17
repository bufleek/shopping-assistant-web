import { useState, useEffect } from "react";
import { Platform } from "@/data/models/app_configs";
import { Product } from "@/data/models/products";
import { getProducts } from "@/data/models/products";

export default function ProductSection({ platform, query, base_url}: { platform: Platform, query: string | null, base_url: string | null}) {
  const [products, setProducts] = useState<Product[] | null[]>([]);

  useEffect(() => {
    if (query && base_url) {
      getProducts({platform, query, base_url}).then((productList) => {
        setProducts(productList.products);
        console.log(productList.products.length);
      });
    }
  }
  , [query]);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">{platform.name}</h2>
          <a href="#" className="text-gray-500 hover:text-gray-600">
            See All
          </a>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...products, ...products].map((product) => (
            <a key={product?.link} href={product?.link} className="group" style={{
              display: "grid",
              gridTemplateRows: "1fr max-content",
            }}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div>
                <h3 className="mt-4 text-sm text-gray-700 truncate w-full">
                  {product?.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product?.price?.currency}{product?.price?.amount}
                  </p>
                  <div className="flex space-x-1 text-sm align-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      className="fill-current text-orange-500"
                    >
                      <title>Rating</title>
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                    5.0
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
