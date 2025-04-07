import logoImg from "../assets/logo.png";
import { GoPlus } from "react-icons/go";
import { useSidebar } from "../hooks/useSidebar";
import { IoCloseOutline } from "react-icons/io5";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <nav
      className={` top-0 flex flex-col gap-3 left-0 h-full max-sm:fixed w-[240px] bg-light-gray px-3 py-2 overflow-y-auto border-r border-gray-200 transform ${
        isSidebarOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logoImg} className="size-12" alt="logo" />
          <p>Treeline.Ai </p>
        </div>
        {isSidebarOpen && (
          <IoCloseOutline className="size-5" onClick={toggleSidebar} />
        )}
      </div>
      <button className="bg-white flex justify-center items-center border border-gray-100 shadow-sm gap-1 py-1.5 rounded-2xl hover:bg-gray-100 cursor-pointer ease-in-out duration-300">
        <GoPlus className="size-5" />
        <a href="/">New chat</a>
      </button>

      <div className="h-[1px] w-full bg-[#ebebeb] mt-2"></div>
      <div>
        <p className="text-secondary-text">Recent chats</p>
      </div>
    </nav>
  );
}
