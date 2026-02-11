'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Home,
  MessageSquare,
  Calculator,
  Calendar,
  History,
  Users,
  Settings,
  Menu,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Inicio' },
    { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat Fiscal' },
    { href: '/dashboard/simulador', icon: Calculator, label: 'Simulador' },
    { href: '/dashboard/calendario', icon: Calendar, label: 'Calendario' },
    { href: '/dashboard/consultas', icon: History, label: 'Mis Consultas' },
    { href: '/dashboard/equipo', icon: Users, label: 'Equipo' },
    { href: '/dashboard/general', icon: Settings, label: 'Configuracion' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-[#0d1f18] border-b border-gray-200 dark:border-emerald-900/30 p-4">
        <div className="flex items-center">
          <span className="font-medium dark:text-white">Dashboard</span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Alternar menu</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white dark:bg-[#0d1f18] lg:bg-gray-50 lg:dark:bg-[#081a14] border-r border-gray-200 dark:border-emerald-900/30 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={`shadow-none my-1 w-full justify-start ${
                    pathname === item.href
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'dark:text-emerald-200/60 dark:hover:text-white'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>
      </div>
    </div>
  );
}
