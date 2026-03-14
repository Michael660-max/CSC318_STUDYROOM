import { User, Mail, GraduationCap, ChevronRight, Bell, Shield, HelpCircle } from 'lucide-react';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNav';

const SETTINGS = [
  { icon: Bell, label: 'Notification Preferences', sub: 'Manage alerts and reminders' },
  { icon: Shield, label: 'Privacy', sub: 'Control your data' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact' },
];

export default function ProfileScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Profile" showBack={false} showNotif={false} />

      <div className="flex-1 pb-24 overflow-y-auto">
        {/* Profile hero */}
        <div className="bg-white border-b border-gray-100 px-4 py-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-[#002A5C] rounded-full flex items-center justify-center">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Alex Chen</h2>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
              <Mail size={12} />
              <span>a.chen@mail.utoronto.ca</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <GraduationCap size={12} />
              <span>Computer Science · 3rd Year</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Bookings', value: '12' },
              { label: 'Hours', value: '28' },
              { label: 'Check-ins', value: '11' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
                <p className="text-xl font-bold text-[#002A5C]">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Settings list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {SETTINGS.map(({ icon: Icon, label, sub }) => (
              <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors">
                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button className="w-full bg-red-50 text-red-500 rounded-2xl py-3.5 text-sm font-semibold border border-red-100">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
