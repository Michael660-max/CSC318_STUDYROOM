import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [waitlistRooms, setWaitlistRooms] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  const addNotificationRequest = useCallback((room, library) => {
    setWaitlistRooms(prev => {
      if (prev.find(r => r.roomId === room.id)) return prev;
      return [...prev, { roomId: room.id, roomName: room.name, libraryName: library.name }];
    });
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'waitlist',
      message: `You'll be notified when ${room.name} becomes available`,
      timestamp: new Date(),
      read: false,
    }]);
  }, []);

  const removeNotificationRequest = useCallback((roomId) => {
    setWaitlistRooms(prev => prev.filter(r => r.roomId !== roomId));
  }, []);

  const createBooking = useCallback((room, library, details) => {
    const booking = {
      id: `BK${Date.now()}`,
      room,
      library,
      ...details,
      status: 'confirmed',
      createdAt: new Date(),
    };
    setActiveBooking(booking);
    setBookingHistory(prev => [booking, ...prev]);
    return booking;
  }, []);

  const claimRoom = useCallback((room, library) => {
    const booking = {
      id: `WI${Date.now()}`,
      room,
      library,
      type: 'walkin',
      startTime: new Date(),
      duration: 60,
      status: 'active',
      createdAt: new Date(),
    };
    setActiveBooking(booking);
    setBookingHistory(prev => [booking, ...prev]);
    return booking;
  }, []);

  const markAsOccupied = useCallback(() => {
    setActiveBooking(prev => prev ? { ...prev, status: 'occupied' } : null);
  }, []);

  const clearBooking = useCallback(() => {
    setActiveBooking(null);
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  return (
    <AppContext.Provider value={{
      selectedLibrary, setSelectedLibrary,
      selectedRoom, setSelectedRoom,
      activeBooking,
      notifications,
      waitlistRooms,
      bookingHistory,
      addNotificationRequest,
      removeNotificationRequest,
      createBooking,
      claimRoom,
      markAsOccupied,
      clearBooking,
      markNotificationsRead,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
