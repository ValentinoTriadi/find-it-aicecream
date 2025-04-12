import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const ProtectedMenuLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default ProtectedMenuLayout;
