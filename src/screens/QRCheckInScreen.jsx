import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Flashlight, X, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/ui/Header';

export default function QRCheckInScreen() {
  const navigate = useNavigate();
  const { activeBooking, markAsOccupied } = useApp();
  const [phase, setPhase] = useState('scanning'); // scanning | success | failure
  const [manualCode, setManualCode] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Simulate auto-scan after 3s
  useEffect(() => {
    if (phase !== 'scanning') return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          // 90% success rate sim
          if (Math.random() > 0.1) {
            setPhase('success');
            markAsOccupied();
          } else {
            setPhase('failure');
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, markAsOccupied]);

  const handleManualSubmit = () => {
    const room = activeBooking?.room;
    const expected = room?.id || 'R510';
    if (manualCode.toUpperCase() === expected.toUpperCase()) {
      setPhase('success');
      markAsOccupied();
    } else {
      setPhase('failure');
    }
  };

  const handleRetry = () => {
    setPhase('scanning');
    setCountdown(3);
    setManualCode('');
    setShowManual(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Camera viewfinder area */}
      {phase === 'scanning' && (
        <>
          <div className="flex items-center px-4 h-14 gap-3 bg-gray-900/80 z-10">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X size={18} className="text-white" />
            </button>
            <h1 className="text-white font-semibold flex-1">Scan QR Code</h1>
            <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Flashlight size={18} className="text-white" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
            {/* Camera bg simulation */}
            <div className="absolute inset-0 bg-gray-800" />

            {/* Scanning frame */}
            <div className="relative z-10 w-64 h-64">
              {/* Corner brackets */}
              {[
                'top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
                'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
                'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
                'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-10 h-10 border-[#FFB81C] ${cls}`} />
              ))}

              {/* QR placeholder */}
              <div className="absolute inset-4 flex items-center justify-center">
                <QrCode size={80} className="text-white/20" />
              </div>

              {/* Scanning line */}
              <div className="absolute left-2 right-2 scan-line">
                <div className="h-0.5 bg-[#FFB81C] shadow-lg rounded-full opacity-80" />
              </div>
            </div>

            <p className="relative z-10 text-white text-center mt-8 text-sm">
              Point your camera at the QR code<br />on the room door
            </p>

            {countdown > 0 && (
              <p className="relative z-10 text-[#FFB81C] text-sm font-semibold mt-2">
                Scanning in {countdown}s...
              </p>
            )}
          </div>

          {/* Bottom panel */}
          <div className="bg-gray-900 px-4 py-6 space-y-3">
            {activeBooking && (
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white/60 text-xs">Checking in to</p>
                <p className="text-white font-semibold text-sm">{activeBooking.room?.name} · {activeBooking.library?.shortName}</p>
              </div>
            )}
            <button
              onClick={() => setShowManual(!showManual)}
              className="w-full flex items-center justify-center gap-2 text-white/60 text-sm py-2"
            >
              <KeyRound size={14} />
              Can't scan? Enter room code manually
            </button>
            {showManual && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={e => setManualCode(e.target.value)}
                  placeholder="Enter room code (e.g. R510)"
                  className="flex-1 bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/20 outline-none focus:border-[#FFB81C]"
                />
                <button
                  onClick={handleManualSubmit}
                  className="bg-[#FFB81C] text-[#002A5C] rounded-xl px-4 py-2.5 text-sm font-bold"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Success state */}
      {phase === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 bg-white">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checked In!</h1>
          <p className="text-gray-500 text-sm text-center mb-2">
            You're all set. Enjoy your study session!
          </p>
          {activeBooking && (
            <div className="bg-gray-50 rounded-2xl px-6 py-4 text-center mb-8">
              <p className="text-xs text-gray-400 mb-0.5">Room</p>
              <p className="font-bold text-gray-900">{activeBooking.room?.name}</p>
              <p className="text-sm text-gray-500">{activeBooking.library?.name}</p>
            </div>
          )}
          <div className="w-full space-y-3">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 flex items-start gap-2">
              <span className="text-amber-500 text-sm mt-0.5">⏰</span>
              <p className="text-xs text-amber-700">
                You'll receive a 5-minute warning before your session ends. Make sure to wrap up on time.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#002A5C] text-white rounded-2xl py-4 font-bold text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Failure state */}
      {phase === 'failure' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 bg-white">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle size={48} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scan Failed</h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            We couldn't read the QR code. Try repositioning your camera or enter the room code manually.
          </p>
          <div className="w-full space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-[#002A5C] text-white rounded-2xl py-4 font-bold text-sm"
            >
              Try Again
            </button>
            <button
              onClick={() => { setShowManual(true); setPhase('scanning'); setCountdown(999); }}
              className="w-full bg-gray-100 text-gray-700 rounded-2xl py-4 font-bold text-sm"
            >
              Enter Code Manually
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
