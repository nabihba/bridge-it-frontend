
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  BookOpen, 
  Briefcase, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Don't show layout on welcome or registration pages
  if (currentPageName === "Welcome" || currentPageName === "Registration") {
    return children;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F5' }}>
      <style>
        {`
          :root {
            --forest-green: #11523D;
            --antique-gold: #BB9704;
            --soft-off-white: #FAF7F5;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: var(--soft-off-white);
          }
          
          .bridgeit-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(17, 82, 61, 0.08);
            border: 1px solid rgba(17, 82, 61, 0.06);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bridgeit-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 40px rgba(17, 82, 61, 0.12);
          }
          
          .bridgeit-btn-primary {
            background: var(--forest-green);
            color: white;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
          }
          
          .bridgeit-btn-primary:hover {
            background: #0d3f2e;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(17, 82, 61, 0.3);
          }
          
          .bridgeit-accent {
            color: var(--antique-gold);
          }
          
          .bridgeit-text-primary {
            color: var(--forest-green);
          }
        `}
      </style>

      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar className="border-r border-gray-200/50 bg-white/80 backdrop-blur-sm hidden md:flex">
            <SidebarHeader className="p-4 border-b border-gray-200/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #11523D 0%, #BB9704 100%)' }}>
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg bridgeit-text-primary">BridgeIT</h2>
                  <p className="text-xs text-gray-600">ICT Career Platform</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`rounded-xl mb-2 hover:bg-gray-50 transition-all duration-200 ${
                            location.pathname === item.url 
                              ? 'bg-gradient-to-r from-green-50 to-yellow-50 text-gray-900 border-l-4 border-green-600' 
                              : 'text-gray-700'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-200/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs truncate">ICT Graduate</p>
                  <p className="text-xs text-gray-500 truncate">West Bank</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-3 py-3 md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #11523D 0%, #BB9704 100%)' }}>
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <h1 className="text-lg font-bold bridgeit-text-primary">BridgeIT</h1>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
