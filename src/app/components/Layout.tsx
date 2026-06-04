import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, Link, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Bell, 
  CreditCard, 
  Settings, 
  Search,
  Menu,
  ChevronDown,
  Award,
  PieChart,
  Ticket,
  DoorOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Moon,
  Sun,
  LogOut,
  User
} from "lucide-react";
import { Avatar, Input, Button } from "./ui";
import { Toaster, toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext";

type Role = "Admin" | "Club Leader" | "Member";

const allNavigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["ADMIN", "USER"] },
  { name: "Members", href: "/members", icon: Users, roles: ["ADMIN"] },
  { name: "Clubs", href: "/clubs", icon: Building2, roles: ["USER", "ADMIN"] },
  { name: "Events", href: "/events", icon: Calendar, roles: ["USER", "ADMIN"] },
  { name: "Profile", href: "/profile", icon: User, roles: ["USER", "ADMIN"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["USER", "ADMIN"] },
];

import { useAuth } from "../contexts/AuthContext";

export function Layout() {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const userRoles = user?.roles || [];
  const userRole = userRoles[0] || "USER";
  const navigation = allNavigation.filter(item => {
    return item.roles.some(role => userRoles.includes(role));
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-200">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 dark:bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#18181b] border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800/80">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">CampusSync</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-500/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Toaster position="top-right" richColors theme={theme} />
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#18181b] px-4 shadow-sm sm:gap-6 sm:px-6 lg:px-8 z-10 transition-colors duration-200">
          <button
            type="button"
            className="p-2 text-slate-500 dark:text-slate-400 lg:hidden rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-4 items-center">
            <div className="w-full max-w-md relative hidden sm:block" ref={searchRef}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                type="search" 
                placeholder="Search members, clubs, events..." 
                className="w-full bg-slate-50 dark:bg-[#121212] pl-9 border-transparent focus:bg-white dark:focus:bg-[#18181b] focus:border-indigo-500 dark:focus:border-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
              {searchOpen && searchQuery.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 rounded-md bg-white dark:bg-[#18181b] shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-800 z-50">
                  <div className="p-2">
                    <p className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Members</p>
                    <div className="px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-slate-700 dark:text-slate-300">John Doe</div>
                    <p className="px-2 py-1 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clubs</p>
                    <div className="px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-slate-700 dark:text-slate-300">Coding Club</div>
                    <p className="px-2 py-1 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Events</p>
                    <div className="px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-slate-700 dark:text-slate-300">Hackathon 2026</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="hidden lg:flex items-center ml-auto gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Logged in as {userRole}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#18181b]" />
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-[#18181b] shadow-lg ring-1 ring-slate-200/50 dark:ring-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                    <button className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300">Mark all as read</button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { title: "New member joined Coding Club", desc: "Sarah Jenkins has joined the club.", time: "2 mins ago", icon: User, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
                      { title: "Registration confirmed", desc: "You are registered for Hackathon 2026.", time: "1 hr ago", icon: CheckCircle2, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                      { title: "Payment received", desc: "$50.00 from John Doe successfully processed.", time: "3 hrs ago", icon: CreditCard, color: "text-indigo-500 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                      { title: "Room booking conflict detected", desc: "Main Auditorium double-booked on Apr 12.", time: "5 hrs ago", icon: AlertTriangle, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
                      { title: "Certificate generated", desc: "Your certificate for Web Dev Workshop is ready.", time: "1 day ago", icon: Award, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
                    ].map((notif, i) => (
                      <div key={i} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800/50 last:border-0 cursor-pointer flex gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                          <notif.icon className={`h-4 w-4 ${notif.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.desc}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" aria-hidden="true" />
            
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 pr-2 transition-colors"
              >
                <Avatar fallback={user?.username?.[0]?.toUpperCase() || "U"} />
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.username || "User"}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{userRole}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500 hidden sm:block ml-1" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-[#18181b] py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link 
                    to="/profile" 
                    className="flex px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 items-center gap-2"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="h-4 w-4" /> View Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 items-center gap-2"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <button 
                    onClick={() => { setProfileOpen(false); handleLogout(); }}
                    className="flex w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#121212] p-4 sm:p-6 lg:p-8 transition-colors duration-200">
          <div className="mx-auto max-w-7xl h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
