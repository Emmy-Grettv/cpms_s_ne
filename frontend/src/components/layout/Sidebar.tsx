"use client";
import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiMapPin,
  FiClipboard,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiX,
  FiTruck,
} from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  type SidebarItem = { icon: any; title: string; href: string };
  let sidebarItems: SidebarItem[] = [];

  if (user?.role === "admin") {
    sidebarItems = [
      { icon: FiHome, title: "Dashboard", href: "/dashboard" },
      { icon: FiMapPin, title: "Parking Slot Management", href: "/parking-slots" },
      { icon: FiTruck, title: "Vehicles", href: "/vehicles" },
      { icon: FiClipboard, title: "Car Entries/Exits", href: "/car-entries" },
      { icon: FiBarChart2, title: "Reports", href: "/reports" },
    ];
  } else if (user) {
    sidebarItems = [
      { icon: FiHome, title: "Dashboard", href: "/dashboard" },
      { icon: FiClipboard, title: "Register Car Entry/Exit", href: "/car-entries" },
      { icon: FiMapPin, title: "View Parking Slots", href: "/parking-slots" },
      { icon: FiTruck, title: "Vehicles", href: "/vehicles" },
    ];
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed lg:relative  z-50 transition-all duration-300 ease-in-out",
          "h-screen bg-[#f1f5f9] text-black p-4 flex flex-col items-center border-r border-gray-200",
          isOpen ? "w-64" : "w-0 lg:w-20",
          "transform lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "overflow-hidden lg:overflow-visible",
          "shadow-lg lg:shadow-none"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors max-w-fit cursor-pointer"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Items */}
        <nav className="mt-8 flex flex-col items-center w-full gap-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.title} href={item.href} className="w-full">
                <div
                  className={cn(
                    "flex items-center justify-center lg:justify-start p-3 w-full text-sm font-medium rounded-lg",
                    "hover:bg-gray-100 hover:text-black transition-colors",
                    isActive ? "bg-gray-200 text-black" : "text-black"
                  )}
                >
                  <Icon size={20} className="flex-shrink-0 text-sky-500" />
                  {isOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.title}</span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="mt-auto pt-4 w-full flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center lg:justify-start p-3 text-sm font-medium rounded-lg w-full text-black hover:bg-red-100 transition-colors"
            >
              <FiLogOut size={20} className="flex-shrink-0 text-sky-500" />
              {isOpen && (
                <span className="ml-3 whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
