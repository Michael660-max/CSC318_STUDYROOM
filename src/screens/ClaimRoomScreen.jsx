import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Zap, Users, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROOMS, LIBRARIES } from '../data/mockData';
import Header from '../components/ui/Header';
import StatusBadge from '../components/ui/StatusBadge';

const STEPS = ['Confirm', 'Claim', 'Check In'];

export default function ClaimRoomScreen() {
  const { libraryId, roomId } = useParams();
  const navigate = useNavigate();
  const { selectedRoom, selectedLibrary, claimRoom } = useApp();
  const [step, setStep] = useState(0);
  const [groupSize, setGroupSize] = useState(1);

  const library = selectedLibrary?.id === libraryId
    ? selectedLibrary
    : LIBRARIES.find(l => l.id === libraryId);
  const rooms = library ? (ROOMS[library.id] || []) : [];
  const room = selectedRoom?.id === roomId ? selectedRoom : rooms.find(r => r.id === roomId);

  if (!room || !library) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="Claim Room" showNotif={false} />
        <div className="flex-1 flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-base font-semibold text-gray-700">Room not found</p>
            <p className="text-sm text-gray-400 mt-1">Go back and choose an available room.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleClaim = () => {
    setStep(1);
    setTimeout(() => {
      claimRoom(room, library);
      setStep(2);
    }, 1500);
  };

  const handleCheckIn = () => {
    navigate('/checkin');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Claim Room" showNotif={false} />

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center ${i < step ? 'w-6 h-6' : 'w-6 h-6'}`}>
                {i < step ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === step ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>{i + 1}</div>
                )}
              </div>
              <span className={`ml-1.5 text-xs font-medium ${i === step ? 'text-blue-900' : i < step ? 'text-green-600' : 'text-gray-400'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-4">
        {/* Room summary card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="font-bold text-gray-900">{room.name}</h2>
              <p className="text-sm text-gray-500">{library.name} · Floor {room.floor}</p>
            </div>
            <StatusBadge status={room.status} />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" />Up to {room.capacity} people</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" />60 min default</span>
          </div>
        </div>

        {step === 0 && (
          <>
            {/* Group size selector */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">How many people?</h3>
              <div className="flex gap-2">
                {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => (
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
            </div>

            {/* Rules */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 space-y-2">
              <h3 className="font-semibold text-amber-800 text-sm">Walk-in Rules</h3>
              <ul className="space-y-1.5">
                {[
                  'Check in via QR code within 15 minutes',
                  'Room is reserved for 60 minutes by default',
                  'You\'ll receive a 5-minute warning before expiry',
                  'No-show releases the room automatically',
                ].map(rule => (
                  <li key={rule} className="flex items-start gap-2 text-xs text-amber-700">
                    <span className="mt-0.5 flex-shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-blue-100 pulse-ring" />
              <Zap size={28} className="text-blue-900" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Claiming Room...</h2>
            <p className="text-sm text-gray-500">Reserving {room.name} for you</p>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Room Claimed!</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {room.name} is reserved for you.<br />
              Head to the room and scan the QR code within 15 minutes.
            </p>

            <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-mono font-semibold text-gray-900">WI-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Check-in deadline</span>
                <span className="font-semibold text-amber-600">15 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-semibold text-gray-900">{library.shortName} · Floor {room.floor}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-2 bg-white border-t border-gray-100">
        {step === 0 && (
          <button
            onClick={handleClaim}
            className="w-full bg-[#002A5C] text-white rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 active:bg-blue-950 transition-colors"
          >
            <Zap size={20} />
            Claim Room Now
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handleCheckIn}
            className="w-full bg-green-600 text-white rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 active:bg-green-700 transition-colors"
          >
            Scan QR Code to Check In
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
