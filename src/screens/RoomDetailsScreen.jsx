import { useNavigate, useParams } from 'react-router-dom';
import { Users, Clock, Zap, BookOpen, Bell, BellOff, Monitor, Phone, Power, PenLine, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROOMS, LIBRARIES, getStatusConfig, AMENITY_LABELS } from '../data/mockData';
import Header from '../components/ui/Header';
import StatusBadge from '../components/ui/StatusBadge';
import BottomNav from '../components/ui/BottomNav';

const AMENITY_ICONS = {
  whiteboard: PenLine,
  tv: Monitor,
  phone: Phone,
  power: Power,
};

export default function RoomDetailsScreen() {
  const { libraryId, roomId } = useParams();
  const navigate = useNavigate();
  const { selectedRoom, selectedLibrary, addNotificationRequest, removeNotificationRequest, waitlistRooms } = useApp();

  const library = selectedLibrary?.id === libraryId
    ? selectedLibrary
    : LIBRARIES.find(l => l.id === libraryId);
  const rooms = library ? (ROOMS[library.id] || []) : [];
  const room = selectedRoom?.id === roomId ? selectedRoom : rooms.find(r => r.id === roomId);

  if (!room || !library) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Room Details" />
        <div className="flex-1 flex items-center justify-center text-gray-400">Room not found</div>
        <BottomNav />
      </div>
    );
  }

  const cfg = getStatusConfig(room.status);
  const isWaitlisted = waitlistRooms.some(r => r.roomId === room.id);
  const canClaim = room.status === 'available';
  const canBook = room.status !== 'occupied';

  const toggleWaitlist = () => {
    if (isWaitlisted) removeNotificationRequest(room.id);
    else addNotificationRequest(room, library);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={room.name} subtitle={library.name} />

      <div className="flex-1 pb-72 overflow-y-auto">
        {/* Status hero */}
        <div className={`${cfg.bg} border-b ${cfg.border} px-5 py-5`}>
          <div className="flex items-center justify-between mb-3">
            <StatusBadge status={room.status} size="lg" pulse />
            <span className="text-sm text-gray-500 font-medium">Floor {room.floor}</span>
          </div>

          {room.status === 'occupied' && room.currentBooking && (
            <div className="bg-white/70 rounded-xl p-3 mt-2">
              <p className="text-xs text-gray-500 mb-1">Currently in use</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm text-gray-900">Occupied until {room.currentBooking.endTime}</p>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  {room.currentBooking.minutesLeft}m left
                </span>
              </div>
            </div>
          )}

          {room.status === 'reserved' && room.currentBooking && (
            <div className="bg-white/70 rounded-xl p-3 mt-2">
              <p className="text-xs text-gray-500 mb-1">Upcoming booking</p>
              <p className="font-semibold text-sm text-gray-900">
                Starts at {room.currentBooking.startTime}
                {room.currentBooking.minutesUntil > 0 && (
                  <span className="text-amber-600 ml-1">(in {room.currentBooking.minutesUntil}m)</span>
                )}
              </p>
            </div>
          )}

          {room.status === 'available' && room.nextBooking && (
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Clock size={13} />
              <span>Next booking at {room.nextBooking.time}</span>
            </div>
          )}
        </div>

        {/* Room info */}
        <div className="px-4 py-4 space-y-4">
          {/* Capacity & type */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Room Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users size={16} className="text-blue-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Capacity</p>
                  <p className="font-semibold text-sm text-gray-900">Up to {room.capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                  <BookOpen size={16} className="text-purple-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Type</p>
                  <p className="font-semibold text-sm text-gray-900 capitalize">
                    {room.type === 'group' ? 'Group Study' : 'Individual'}
                  </p>
                </div>
              </div>
            </div>

            {room.type === 'group' && (
              <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  During peak hours, a minimum of 3 people is required to book this group room.
                </p>
              </div>
            )}
          </div>

          {/* Amenities */}
          {room.amenities?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map(a => {
                  const Icon = AMENITY_ICONS[a] || Power;
                  return (
                    <div key={a} className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Icon size={14} className="text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-700">{AMENITY_LABELS[a] || a}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QR check-in info */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">QR Check-In Required</h3>
            <p className="text-xs text-blue-700">
              After booking or claiming this room, scan the QR code at the door within 15 minutes to confirm your presence. Unused rooms are automatically released.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-4 py-4 space-y-2 z-40">
        {canClaim && (
          <button
            onClick={() => navigate(`/claim/${libraryId}/${room.id}`)}
            className="w-full bg-[#002A5C] text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 active:bg-blue-950 transition-colors"
          >
            <Zap size={18} />
            Claim Room Now
          </button>
        )}
        {canBook && (
          <button
            onClick={() => navigate(`/book/${libraryId}/${room.id}`)}
            className={`w-full rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors border ${
              canClaim
                ? 'border-gray-200 text-gray-700 bg-white active:bg-gray-50'
                : 'bg-[#002A5C] text-white border-[#002A5C] active:bg-blue-950'
            }`}
          >
            <BookOpen size={18} />
            Book in Advance
          </button>
        )}
        {!canClaim && !canBook && (
          <button
            onClick={toggleWaitlist}
            className={`w-full rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors border ${
              isWaitlisted
                ? 'border-gray-200 text-gray-600 bg-gray-50'
                : 'bg-[#002A5C] text-white border-[#002A5C]'
            }`}
          >
            {isWaitlisted ? <BellOff size={18} /> : <Bell size={18} />}
            {isWaitlisted ? 'Remove Alert' : 'Notify When Available'}
          </button>
        )}
        {(canClaim || canBook) && room.status !== 'occupied' && (
          <button
            onClick={toggleWaitlist}
            className="w-full text-center text-xs text-gray-400 py-1"
          >
            {isWaitlisted ? '🔔 Alert set' : 'Get notified when this room is next available'}
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
