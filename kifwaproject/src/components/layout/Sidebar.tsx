import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  PieChart, 
  Users, 
  History 
} from 'lucide-react';
import Image from 'next/image';
import KifwaLogo from "./../../../public/Header navigation.png"

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'My Bonds', href: '/bonds' },
  { icon: ClipboardList, label: 'Tasks', href: '/tasks' },
  { icon: PieChart, label: 'Reporting', href: '/reporting' },
  { icon: Users, label: 'User Management', href: '/users' },
  { icon: History, label: 'Audit Log', href: '/audit' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b flex items-center justify-center">
        <Image 
          src={KifwaLogo} 
          alt="Kifwa Logo"
          width={900}
          height={100}
          className="w-full h-auto object-contain max-w-[1000px]"
          priority
        />
      </div>
      <nav className="flex-1 p-4  text-sm">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 mb-1"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;