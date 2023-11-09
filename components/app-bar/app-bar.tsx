import Image from "next/image";
import AuthActions from "./auth-actions";

export default function AppBar() {
    const isLoggedIn = false;

  return (
    <div className="bg-inherit">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <Image src="/logo.svg" alt="Workflow" width={40} height={40} />
            </a>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-gray-500"
            >
              Explore
            </a>

            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-gray-500"
            >
              Supported platforms
            </a>

            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-gray-500"
            >
              How it works
            </a>

            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-gray-500"
            >
              About us
            </a>

            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-gray-500"
            >
              Contact us
            </a>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <AuthActions />
          </div>
        </div>
      </div>
    </div>
  );
}
