import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import HomeScreen from './screens/HomeScreen';
import RoomListScreen from './screens/RoomListScreen';
import RoomDetailsScreen from './screens/RoomDetailsScreen';
import ClaimRoomScreen from './screens/ClaimRoomScreen';
import BookRoomScreen from './screens/BookRoomScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import QRCheckInScreen from './screens/QRCheckInScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import BookingsScreen from './screens/BookingsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/rooms" element={<RoomListScreen />} />
            <Route path="/library/:libraryId" element={<RoomListScreen />} />
            <Route path="/room/:libraryId/:roomId" element={<RoomDetailsScreen />} />
            <Route path="/claim/:libraryId/:roomId" element={<ClaimRoomScreen />} />
            <Route path="/book/:libraryId/:roomId" element={<BookRoomScreen />} />
            <Route path="/confirmation/:bookingId" element={<BookingConfirmationScreen />} />
            <Route path="/checkin" element={<QRCheckInScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/bookings" element={<BookingsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
