import { useState, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LayoutList, Map, SlidersHorizontal, Users, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROOMS, LIBRARIES } from '../data/mockData';
import Header from '../components/ui/Header';
import RoomCard from '../components/ui/RoomCard';
import StatusBadge from '../components/ui/StatusBadge';
import BottomNav from '../components/ui/BottomNav';

const FILTERS = ['All', 'Available', 'Group', 'Individual'];

function FloorMap({ rooms, libraryId }) {
  const navigate = useNavigate();
  const { setSelectedRoom } = useApp();
  const floors = [...new Set(rooms.map(r => r.floor))].sort();

  const statusColor = (status) =>
    status === 'available' ? 'bg-green-100 border-green-400 text-green-800' :
    status === 'reserved' ? 'bg-amber-100 border-amber-400 text-amber-800' :
    'bg-red-100 border-red-400 text-red-800';

  return (
    <div className="px-4 space-y-6">
      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-200 border border-green-400 inline-block" /> Available</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-200 border border-amber-400 inline-block" /> Reserved</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-200 border border-red-400 inline-block" /> Occupied</div>
      </div>

      {floors.map(floor => (
        <div key={floor}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Floor {floor}</p>
          <div className="grid grid-cols-3 gap-2">
            {rooms.filter(r => r.floor === floor).map(room => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  navigate(`/room/${libraryId}/${room.id}`);
                }}
                className={`rounded-xl border-2 p-2.5 text-left active:scale-95 transition-transform ${statusColor(room.status)}`}
              >
                <p className="font-bold text-xs">{room.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users size={9} />
                  <span className="text-[10px]">{room.capacity}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RoomListScreen() {
  const { libraryId } = useParams();
  const [searchParams] = useSearchParams();
  const { selectedLibrary, setSelectedLibrary } = useApp();
  const [view, setView] = useState('list');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');

  const library = selectedLibrary || LIBRARIES.find(l => l.id === libraryId) || LIBRARIES[0];
  const rooms = ROOMS[library.id] || [];

  const filtered = useMemo(() => {
    return rooms.filter(room => {
      if (activeFilter === 'Available' && room.status !== 'available') return false;
      if (activeFilter === 'Group' && room.type !== 'group') return false;
      if (activeFilter === 'Individual' && room.type !== 'individual') return false;
      return true;
    });
  }, [rooms, activeFilter]);

  const counts = {
    available: rooms.filter(r => r.status === 'available').length,
    reserved: rooms.filter(r => r.status === 'reserved').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        title={library.shortName}
        subtitle={`${library.availableRooms} of ${library.totalRooms} rooms available`}
      />

      {/* Status summary strip */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <StatusBadge status="available" size="sm" />
        <span className="text-xs text-gray-500">{counts.available}</span>
        <span className="text-gray-200">|</span>
        <StatusBadge status="reserved" size="sm" />
        <span className="text-xs text-gray-500">{counts.reserved}</span>
        <span className="text-gray-200">|</span>
        <StatusBadge status="occupied" size="sm" />
        <span className="text-xs text-gray-500">{counts.occupied}</span>
        <div className="flex-1" />
        {/* View toggle */}
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
          >
            <LayoutList size={15} className={view === 'list' ? 'text-blue-900' : 'text-gray-400'} />
          </button>
          <button
            onClick={() => setView('map')}
            className={`p-1.5 rounded-md transition-colors ${view === 'map' ? 'bg-white shadow-sm' : ''}`}
          >
            <Map size={15} className={view === 'map' ? 'text-blue-900' : 'text-gray-400'} />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              activeFilter === f
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          className="flex-shrink-0 flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600"
        >
          <SlidersHorizontal size={12} />
          Filter
        </button>
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-500">{filtered.length} room{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* Room list / map */}
      <div className="flex-1 pb-24">
        {view === 'list' ? (
          <div className="px-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium">No rooms match</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              filtered.map(room => (
                <RoomCard key={room.id} room={room} libraryId={library.id} />
              ))
            )}
          </div>
        ) : (
          <FloorMap rooms={filtered} libraryId={library.id} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}
