import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, Users, ChevronRight, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROOMS, LIBRARIES, TIME_SLOTS, DURATIONS } from '../data/mockData';
import Header from '../components/ui/Header';

const DAYS = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDayDates() {
  const today = new Date();
  return DAYS.map((label, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: i < 2 ? label : d.toLocaleDateString('en-CA', { weekday: 'short' }),
      date: d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      full: d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' }),
      index: i,
    };
  });
}

export default function BookRoomScreen() {
  const { libraryId, roomId } = useParams();
  const navigate = useNavigate();
  const { selectedRoom, selectedLibrary, createBooking } = useApp();

  const library = selectedLibrary || LIBRARIES.find(l => l.id === libraryId);
  const rooms = ROOMS[libraryId] || [];
  const room = selectedRoom?.id === roomId ? selectedRoom : rooms.find(r => r.id === roomId);

  const days = getDayDates();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [groupSize, setGroupSize] = useState(1);
  const [step, setStep] = useState('form'); // 'form' | 'review' | 'confirmed'

  if (!room || !library) return null;

  const canProceed = selectedTime !== null;

  const handleBook = () => {
    if (step === 'form') {
      setStep('review');
    } else if (step === 'review') {
      const booking = createBooking(room, library, {
        type: 'advance',
        date: days[selectedDay].full,
        time: selectedTime,
        duration: selectedDuration,
        groupSize,
      });
      navigate(`/confirmation/${booking.id}`);
    }
  };

  const durationLabel = DURATIONS.find(d => d.value === selectedDuration)?.label || '';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Book Room" subtitle={`${room.name} · ${library.shortName}`} showNotif={false} />

      <div className="flex-1 overflow-y-auto pb-28 space-y-4">
        {step === 'form' && (
          <>
            {/* Date selector */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Calendar size={13} /> Select Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className={`flex-shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-xl border transition-colors ${
                      selectedDay === i
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    <span className={`text-xs font-medium ${selectedDay === i ? 'text-blue-200' : 'text-gray-400'}`}>{d.label}</span>
                    <span className="text-sm font-bold mt-0.5">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Clock size={13} /> Start Time
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(t => {
                  // Simulate some booked slots
                  const booked = ['10:00 AM', '10:30 AM', '2:00 PM', '2:30 PM'].includes(t) && selectedDay === 0;
                  return (
                    <button
                      key={t}
                      disabled={booked}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                        booked
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through'
                          : selectedTime === t
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-gray-700 border-gray-200 active:bg-gray-50'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Duration</h3>
              <div className="flex gap-2">
                {DURATIONS.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                      selectedDuration === d.value
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group size */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Users size={13} /> Group Size
              </h3>
              <div className="flex gap-2">
                {Array.from({ length: Math.min(room.capacity, 6) }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setGroupSize(n)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                      groupSize === n
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {room.type === 'group' && groupSize < 3 && (
                <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                  <Info size={12} className="flex-shrink-0 mt-0.5" />
                  <span>Group rooms require at least 3 people during peak hours.</span>
                </div>
              )}
            </div>
          </>
        )}

        {step === 'review' && (
          <div className="px-4 py-4 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Review Booking</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {[
                { label: 'Room', value: room.name },
                { label: 'Library', value: library.name },
                { label: 'Date', value: days[selectedDay].full },
                { label: 'Time', value: selectedTime },
                { label: 'Duration', value: durationLabel },
                { label: 'Group size', value: `${groupSize} person${groupSize !== 1 ? 's' : ''}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <h3 className="text-xs font-semibold text-blue-700 mb-1">Check-In Reminder</h3>
              <p className="text-xs text-blue-600">
                You'll receive a notification 10 minutes before your booking. Scan the QR code at the door within 15 minutes of your start time, or the room will be released.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-4 bg-white border-t border-gray-100 z-40">
        <button
          disabled={!canProceed}
          onClick={handleBook}
          className={`w-full rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 transition-colors ${
            canProceed
              ? 'bg-[#002A5C] text-white active:bg-blue-950'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === 'form' ? 'Review Booking' : 'Confirm Booking'}
          <ChevronRight size={20} />
        </button>
        {!canProceed && (
          <p className="text-center text-xs text-gray-400 mt-2">Select a time slot to continue</p>
        )}
      </div>
    </div>
  );
}
