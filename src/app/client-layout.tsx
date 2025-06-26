// app/client-layout.tsx
"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import  AdminSidebar from "@/components/AdminSidebar";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminDashboard = pathname.startsWith("/courses/dashboard");

  return (
    <>
      <Toaster richColors position="top-right" />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {isAdminDashboard ? <AdminSidebar /> : <AppSidebar />}
            <div
              className={`flex flex-col flex-1 p-5 duration-300 ${
                isAdminDashboard ? "bg-gray-100 dark:bg-gray-900/90" : "dark:bg-gray-800/90"
              }`}
            >
              <Header isAdmin={isAdminDashboard} />
              <main className="flex-1 p-5">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
