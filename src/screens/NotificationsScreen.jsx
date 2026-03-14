import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, Clock, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROOMS, LIBRARIES } from '../data/mockData';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNav';
import StatusBadge from '../components/ui/StatusBadge';

function WaitlistItem({ entry, onRemove }) {
  const navigate = useNavigate();

  // Find room data
  const lib = LIBRARIES.find(l => l.name === entry.libraryName);
  const rooms = lib ? ROOMS[lib.id] || [] : [];
  const room = rooms.find(r => r.id === entry.roomId);

  const minutesUntilFree = room?.currentBooking?.minutesLeft || null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{entry.roomName}</h3>
          <p className="text-xs text-gray-500">{entry.libraryName}</p>
        </div>
        {room && <StatusBadge status={room.status} size="sm" />}
      </div>

      {minutesUntilFree && (
        <div className="flex items-center gap-1.5 text-xs text-amber-600 mb-3">
          <Clock size={12} />
          <span>May be free in ~{minutesUntilFree} minutes</span>
        </div>
      )}

      <div className="flex gap-2">
        {room && (
          <button
            onClick={() => navigate(`/room/${lib?.id}/${entry.roomId}`)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-100 rounded-xl py-2"
          >
            View Room
            <ChevronRight size={13} />
          </button>
        )}
        <button
          onClick={() => onRemove(entry.roomId)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-xl py-2 px-3"
        >
          <BellOff size={13} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function NotificationsScreen() {
  const { notifications, waitlistRooms, removeNotificationRequest, markNotificationsRead } = useApp();

  // Mark all as read on mount
  useState(() => {
    markNotificationsRead();
  });

  const systemNotifs = [
    {
      id: 'sys1',
      type: 'reminder',
      title: 'Booking Reminder',
      message: 'Your booking for Room 510 at Robarts starts in 10 minutes.',
      time: '2 min ago',
      icon: '⏰',
    },
    {
      id: 'sys2',
      type: 'release',
      title: 'Room Released',
      message: 'Room 612 at Robarts is now available — the previous booking was not checked in.',
      time: '15 min ago',
      icon: '🔓',
    },
    {
      id: 'sys3',
      type: 'warning',
      title: 'Session Ending Soon',
      message: 'Your session in Room 514 ends in 5 minutes.',
      time: '1 hr ago',
      icon: '⚠️',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Notifications" showBack={false} showNotif={false} />

      <div className="flex-1 pb-24 overflow-y-auto">
        {/* Waitlist section */}
        {waitlistRooms.length > 0 && (
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={15} className="text-blue-900" />
              <h2 className="font-semibold text-gray-900 text-sm">Room Alerts</h2>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold rounded-full px-2 py-0.5">
                {waitlistRooms.length}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              You'll be notified when these rooms become available.
            </p>
            <div className="space-y-3">
              {waitlistRooms.map(entry => (
                <WaitlistItem
                  key={entry.roomId}
                  entry={entry}
                  onRemove={removeNotificationRequest}
                />
              ))}
            </div>
          </div>
        )}

        {/* System notifications */}
        <div className="px-4 py-4">
          <h2 className="font-semibold text-gray-900 text-sm mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {[...notifications.map(n => ({
              id: String(n.id),
              type: n.type,
              title: 'Waitlist Alert',
              message: n.message,
              time: 'Just now',
              icon: '🔔',
            })), ...systemNotifs].map(notif => (
              <div key={notif.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{notif.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-[10px] text-gray-300 mt-1.5">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* If empty */}
        {notifications.length === 0 && waitlistRooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <Bell size={40} className="mb-3" />
            <p className="font-medium text-gray-400">No notifications</p>
            <p className="text-sm text-gray-300 mt-1">We'll notify you when rooms open up</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
