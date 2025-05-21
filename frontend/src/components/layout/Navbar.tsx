"use client";

import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const getTitleFromPath = (path: string) => {
  const parts = path.split("/");
  return (
    parts[parts.length - 1].charAt(0).toUpperCase() +
    parts[parts.length - 1].slice(1)
  );
};

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const title = getTitleFromPath(pathname);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <header className="w-full bg-white px-4 lg:px-6 py-4 shadow-sm flex items-center justify-between border-b border-gray-200">
      {/* Left Section: Menu + Title */}
      <div className="flex items-center gap-4">
        {/* <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-sky-100 transition-colors"
        >
          <FiMenu className="w-6 h-6 text-sky-600" />
        </button> */}
        <h1 className="text-xl font-semibold text-sky-600">{title}</h1>
      </div>

      {/* Right Section: Notification + Profile */}
      <div className="flex items-center gap-4 lg:gap-6">
        <button className="text-sky-600 hover:text-sky-800 transition-colors">
          <FiBell className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        <button 
          onClick={handleProfileClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover border-2 border-sky-200"
            />
          ) : (
            <div className="p-2 bg-sky-100 rounded-full">
              <FiUser className="w-5 h-5 lg:w-6 lg:h-6 text-sky-600" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
