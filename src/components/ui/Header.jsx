import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header({ title, subtitle, showBack = true, showNotif = true, transparent = false }) {
  const navigate = useNavigate();
  const { notifications } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className={`sticky top-0 z-40 ${transparent ? 'bg-transparent' : 'bg-white border-b border-gray-100'}`}>
      <div className="flex items-center px-4 h-14 gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-1"
          >
            <ChevronLeft size={22} className="text-gray-700" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-base font-semibold text-gray-900 truncate leading-tight">{title}</h1>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 truncate">{subtitle}</p>
          )}
        </div>

        {showNotif && (
          <button
            onClick={() => navigate('/notifications')}
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <Bell size={20} className="text-gray-700" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
