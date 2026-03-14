import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight, Clock, Zap } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useApp } from '../../context/AppContext';

export default function RoomCard({ room, libraryId, compact = false }) {
  const navigate = useNavigate();
  const { setSelectedRoom, selectedLibrary } = useApp();

  const handleClick = () => {
    setSelectedRoom(room);
    navigate(`/room/${libraryId || selectedLibrary?.id}/${room.id}`);
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white active:bg-gray-50 transition-colors border-b border-gray-50"
      >
        <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${
          room.status === 'available' ? 'bg-green-400' :
          room.status === 'reserved' ? 'bg-amber-400' : 'bg-red-400'
        }`} />
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-900">{room.name}</span>
            <StatusBadge status={room.status} size="sm" />
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={11} />
              {room.capacity}
            </span>
            <span className="capitalize">{room.type === 'group' ? 'Group' : 'Individual'}</span>
            {room.status === 'occupied' && room.currentBooking && (
              <span className="flex items-center gap-1 text-amber-600">
                <Clock size={11} />
                Free in {room.currentBooking.minutesLeft}m
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left active:shadow-none active:scale-[0.99] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{room.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 capitalize">
            {room.type === 'group' ? 'Group Study' : 'Individual'} · Floor {room.floor}
          </p>
        </div>
        <StatusBadge status={room.status} size="sm" pulse />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <Users size={13} className="text-gray-400" />
          Up to {room.capacity} people
        </span>
        {room.status === 'available' && (
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <Zap size={13} />
            Ready now
          </span>
        )}
        {room.status === 'occupied' && room.currentBooking && (
          <span className="flex items-center gap-1.5 text-amber-600">
            <Clock size={13} />
            Free in {room.currentBooking.minutesLeft}m
          </span>
        )}
        {room.status === 'reserved' && room.currentBooking && (
          <span className="flex items-center gap-1.5 text-amber-600">
            <Clock size={13} />
            Starts in {room.currentBooking.minutesUntil}m
          </span>
        )}
      </div>

      {room.amenities?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {room.amenities.map(a => (
            <span key={a} className="text-[10px] bg-gray-50 text-gray-500 rounded-md px-2 py-0.5 capitalize border border-gray-100">
              {a === 'tv' ? 'TV Display' : a.charAt(0).toUpperCase() + a.slice(1)}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
