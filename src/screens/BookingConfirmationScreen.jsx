import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, QrCode, Bell, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/ui/Header';

export default function BookingConfirmationScreen() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { bookingHistory } = useApp();

  const booking = bookingHistory.find(b => b.id === bookingId);

  if (!booking) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Confirmation" />
        <div className="flex-1 flex items-center justify-center text-gray-400">Booking not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Booking Confirmed" showBack={false} showNotif={false} />

      <div className="flex-1 overflow-y-auto pb-28 px-4">
        {/* Success state */}
        <div className="flex flex-col items-center py-10">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{booking.room?.name}</h1>
          <p className="text-gray-500 text-sm">{booking.library?.name}</p>
        </div>

        {/* Booking card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Booking Details</p>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm font-semibold text-gray-900">{booking.room?.name}, {booking.library?.shortName}</p>
              </div>
            </div>
            {booking.date && (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-purple-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold text-gray-900">{booking.date}</p>
                </div>
              </div>
            )}
            {booking.time && (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-amber-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking.time} · {booking.duration === 30 ? '30 min' : booking.duration === 60 ? '1 hour' : `${booking.duration / 60} hrs`}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gray-500">#</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Booking ID</p>
                <p className="text-sm font-mono font-semibold text-gray-900">{booking.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR check-in prompt */}
        <div className="bg-[#002A5C] rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <QrCode size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">QR Check-In Required</h3>
              <p className="text-blue-200 text-xs">Scan at the room door to confirm presence</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkin')}
            className="w-full bg-white text-blue-900 rounded-xl py-3 text-sm font-bold active:bg-blue-50 transition-colors"
          >
            Open QR Scanner
          </button>
        </div>

        {/* Reminder info */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <Bell size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800 mb-1">Reminders Set</p>
              <p className="text-xs text-amber-700">
                You'll receive a notification 10 minutes before your booking starts. If you don't check in within 15 minutes, the room will be automatically released.
              </p>
            </div>
          </div>
        </div>

        {/* Add to calendar mock */}
        <button className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-700 flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
          <Calendar size={16} />
          Add to Calendar
        </button>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-4 bg-white border-t border-gray-100 z-40">
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-100 text-gray-700 rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 active:bg-gray-200 transition-colors"
        >
          <Home size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
