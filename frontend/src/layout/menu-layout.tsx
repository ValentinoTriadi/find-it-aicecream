"use client";

import { getUser } from "@/api/auth";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ProtectedMenuLayout = () => {
  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.user) {
        } else {
          window.location.href = `/login?redirect=${encodeURIComponent(
            window.location.pathname + window.location.search
          )}`;
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname + window.location.search
        )}`;
      });
  }, []);

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
