import { useNavigate } from 'react-router-dom';
import { BookOpen, QrCode, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNav';

function BookingItem({ booking }) {
  const navigate = useNavigate();
  const isActive = booking.status === 'active' || booking.status === 'confirmed' || booking.status === 'occupied';

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-4 ${isActive ? 'border-blue-100' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 text-sm">{booking.room?.name}</h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              booking.status === 'occupied' ? 'bg-green-100 text-green-700' :
              booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
              booking.status === 'active' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {booking.status === 'occupied' ? 'In Use' :
               booking.status === 'confirmed' ? 'Confirmed' :
               booking.status === 'active' ? 'Active' : 'Past'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={10} />
            <span>{booking.library?.name}</span>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-300">{booking.id?.slice(-6)}</span>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        {booking.date && (
          <span>{booking.date}</span>
        )}
        {booking.time && (
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {booking.time}
          </span>
        )}
        {!booking.date && (
          <span className="text-amber-600 font-medium">Walk-in · {new Date(booking.createdAt).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}</span>
        )}
      </div>

      {isActive && (
        <button
          onClick={() => navigate('/checkin')}
          className="w-full flex items-center justify-center gap-2 bg-[#002A5C] text-white rounded-xl py-2.5 text-xs font-semibold"
        >
          <QrCode size={14} />
          QR Check-In
        </button>
      )}
    </div>
  );
}

export default function BookingsScreen() {
  const navigate = useNavigate();
  const { bookingHistory, activeBooking } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="My Bookings" showBack={false} />

      <div className="flex-1 pb-24 overflow-y-auto px-4 py-4">
        {activeBooking && (
          <>
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Current</h2>
            <div className="mb-5">
              <BookingItem booking={activeBooking} />
            </div>
          </>
        )}

        {bookingHistory.filter(b => b.id !== activeBooking?.id).length > 0 && (
          <>
            <h2 className="font-semibold text-gray-900 text-sm mb-3">History</h2>
            <div className="space-y-3">
              {bookingHistory
                .filter(b => b.id !== activeBooking?.id)
                .map(b => <BookingItem key={b.id} booking={b} />)}
            </div>
          </>
        )}

        {bookingHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-gray-300" />
            </div>
            <p className="font-medium text-gray-400">No bookings yet</p>
            <p className="text-sm text-gray-300 mt-1 text-center">Find and book a study room to get started</p>
            <button
              onClick={() => navigate('/')}
              className="mt-5 bg-[#002A5C] text-white rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Find a Room
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
