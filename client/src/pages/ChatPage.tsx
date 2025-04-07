import ChatPanel from "../components/ChatPanel";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <ChatPanel />
      </div>
    </SidebarProvider>
  );
}
