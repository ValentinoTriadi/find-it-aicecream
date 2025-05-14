import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth.context";
import { Outlet } from "react-router-dom";

const ProtectedMenuLayout = () => {
  const auth = useAuth();
  if (!auth.user) {
    window.location.href = "/login";
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedMenuLayout;
