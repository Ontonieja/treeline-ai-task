import avatar from "../assets/avatar.jpg";
import { IoMenuOutline } from "react-icons/io5";
import { useSidebar } from "../hooks/useSidebar";

export default function TopNavigation() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="w-full self-start py-3 max-sm:absolute top-0 left-0 border-b justify-between text-xl max-sm:shadow-sm flex items-center px-6 border-gray-200">
      <p className="hidden sm:block">TreeLine</p>
      <IoMenuOutline
        className="size-5 md:size-6 sm:hidden"
        onClick={toggleSidebar}
      />
      <img src={avatar} alt="User avatar" className="size-8 rounded-full" />
    </div>
  );
}
