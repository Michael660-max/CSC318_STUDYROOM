import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, Zap, BookOpen, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LIBRARIES } from '../data/mockData';
import BottomNav from '../components/ui/BottomNav';

function LibraryCard({ library }) {
  const navigate = useNavigate();
  const { setSelectedLibrary } = useApp();
  const pct = Math.round((library.availableRooms / library.totalRooms) * 100);
  const statusColor = pct > 30 ? 'bg-green-500' : pct > 10 ? 'bg-amber-500' : 'bg-red-400';

  const handleSelect = () => {
    setSelectedLibrary(library);
    navigate(`/library/${library.id}`);
  };

  return (
    <button
      onClick={handleSelect}
      className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left active:shadow-none active:scale-[0.99] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{library.name}</h3>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            <MapPin size={11} />
            <span>{library.address}</span>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300 mt-0.5 flex-shrink-0" />
      </div>

      {/* Availability bar */}
      <div className="mb-2">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${statusColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs">
          <span className={`font-semibold ${pct > 30 ? 'text-green-600' : pct > 10 ? 'text-amber-600' : 'text-red-500'}`}>
            {library.availableRooms} available
          </span>
          <span className="text-gray-400">{library.totalRooms} total</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={11} />
          <span>{library.hours}</span>
        </div>
      </div>
    </button>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { activeBooking, notifications, bookingHistory } = useApp();
  const unread = notifications.filter(n => !n.read).length;
  const totalAvailable = LIBRARIES.reduce((s, l) => s + l.availableRooms, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="bg-[#002A5C] px-5 pt-12 pb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Good afternoon</p>
            <h1 className="text-white text-2xl font-bold leading-tight">Find Your<br />Study Space</h1>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <Bell size={18} className="text-white" />
            {unread > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{totalAvailable}</p>
            <p className="text-blue-200 text-xs mt-0.5">Rooms Free</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{LIBRARIES.length}</p>
            <p className="text-blue-200 text-xs mt-0.5">Libraries</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-2xl font-bold">&lt;5m</p>
            <p className="text-blue-200 text-xs mt-0.5">Wait Time</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 -mt-2 pb-24 space-y-5">
        {/* Active booking banner */}
        {activeBooking && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-500 font-medium uppercase tracking-wide mb-0.5">Active Booking</p>
              <p className="font-semibold text-blue-900 text-sm">{activeBooking.room?.name}</p>
              <p className="text-xs text-blue-600">{activeBooking.library?.shortName}</p>
            </div>
            <button
              onClick={() => navigate('/checkin')}
              className="bg-blue-900 text-white text-xs font-semibold px-3 py-2 rounded-xl"
            >
              Check In
            </button>
          </div>
        )}

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/rooms')}
            className="bg-[#FFB81C] rounded-2xl p-4 text-left active:scale-[0.97] transition-transform"
          >
            <Zap size={20} className="text-[#002A5C] mb-2" />
            <p className="font-bold text-[#002A5C] text-sm leading-tight">Find Room<br />Now</p>
            <p className="text-[#002A5C]/60 text-xs mt-1">Walk-in access</p>
          </button>
          <button
            onClick={() => navigate('/rooms?mode=book')}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 text-left active:scale-[0.97] transition-transform"
          >
            <BookOpen size={20} className="text-[#002A5C] mb-2" />
            <p className="font-bold text-gray-900 text-sm leading-tight">Book in<br />Advance</p>
            <p className="text-gray-400 text-xs mt-1">Up to 7 days ahead</p>
          </button>
        </div>

        {/* Library list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Libraries</h2>
            <span className="text-xs text-gray-400">Tap to browse rooms</span>
          </div>
          <div className="space-y-3">
            {LIBRARIES.map(lib => (
              <LibraryCard key={lib.id} library={lib} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
