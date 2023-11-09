"use client";

import { useState } from "react";

export default function AuthActions() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAccountInfo, setShowAccountInfo] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <div className="relative">
          <a
            onClick={() => setShowAccountInfo(!showAccountInfo)}
            type="button"
            className="inline-flex items-center justify-center w-full rounded-full border border-transparent shadow-sm bg-white px-4 py-2 text-base font-medium text-primary pointer"
            id="user-menu"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-circle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
            </svg>
          </a>

          {showAccountInfo && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Profile
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>

              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setIsLoggedIn(false)}
              >
                Sign out
              </a>
            </div>
          </div>
          )}
        </div>
      ) : (
        <a
        onClick={() => setIsLoggedIn(true)}
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-on-primary bg-primary hover:bg-p-500 pointer"
        >
          Sign in
        </a>
      )}
    </>
  );
}
