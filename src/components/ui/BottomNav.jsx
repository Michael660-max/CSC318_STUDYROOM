import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TABS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/rooms', label: 'Rooms', icon: Search },
  { path: '/bookings', label: 'Bookings', icon: BookOpen },
  { path: '/notifications', label: 'Alerts', icon: Bell },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-100 safe-area-bottom">
      <div className="flex">
        {TABS.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path ||
            (path === '/rooms' && location.pathname.startsWith('/library')) ||
            (path === '/rooms' && location.pathname.startsWith('/room'));
          const isAlert = path === '/notifications';
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                active ? 'text-blue-900' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {isAlert && unread > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-blue-900' : 'text-gray-400'}`}>
                {label}
              </span>
              {active && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-900 rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
