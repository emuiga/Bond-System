'use client';

import { useKeycloak } from '@/hooks/useKeycloak';
import { Search, Settings, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Topbar = () => {
  const { user, logout } = useKeycloak();
  const initials = user?.preferred_username?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="h-16 bg-white px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Search size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-1">
          <Avatar className="h-8 w-8 bg-blue-100 text-blue-600">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <span className="mx-1">·</span>
            <span className="font-medium">{user?.name || user?.preferred_username}</span>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Topbar;