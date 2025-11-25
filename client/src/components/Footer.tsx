import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-800 mt-16 gap-8 flex flex-col items-center md:flex-row md:items-start p-8 rounded-lg md:justify-between md:gap-0">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ecommerce site logo"
            width={36}
            height={36}
          />
          <p className="hidden md:block text-md font-bold text-white tracking-wider">
            RACHMANINOFF
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 Rachmaninoff</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>

      <div className="flex flex-col items-center text-sm text-gray-400 md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      
      <div className="flex flex-col items-center text-sm text-gray-400 md:items-start">
        <p className="text-sm text-amber-50">Products</p>
        <Link href="/">All Products</Link>
        <Link href="/">New Arrivals</Link>
        <Link href="/">Best Sellers</Link>
        <Link href="/">Sale</Link>
      </div>

      <div className="flex flex-col items-center text-sm text-gray-400 md:items-start">
        <p className="text-sm text-amber-50">Company</p>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Affiliate program</Link>
      </div>
    </div>
  );
};

export default Footer;
