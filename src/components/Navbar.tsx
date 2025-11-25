import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pt-2 pb-4 sticky top-0 bg-white/40 backdrop-blur-md z-50">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="ecommerce site logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-bold text-slate-700 tracking-wider">
          AMADASUN
        </p>
      </Link>

      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-5 h-5 text-gray-600"/>
        </Link>
        <Bell className="w-5 h-5 text-gray-600"/>
        <ShoppingCartIcon />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
