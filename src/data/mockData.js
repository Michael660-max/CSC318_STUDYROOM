// Mock data for UofT Study Room Booking System

export const LIBRARIES = [
  {
    id: 'robarts',
    name: 'Robarts Library',
    shortName: 'Robarts',
    address: '130 St. George St.',
    hours: '8:00 AM – 11:45 PM',
    image: null,
    floors: [4, 5, 6, 7, 8, 9],
    totalRooms: 24,
    availableRooms: 7,
  },
  {
    id: 'gerstein',
    name: 'Gerstein Science',
    shortName: 'Gerstein',
    address: '9 King's College Circle',
    hours: '8:30 AM – 11:45 PM',
    image: null,
    floors: [1, 2, 3],
    totalRooms: 16,
    availableRooms: 3,
  },
  {
    id: 'bahen',
    name: 'Bahen Centre',
    shortName: 'Bahen',
    address: '40 St. George St.',
    hours: '8:00 AM – 10:00 PM',
    image: null,
    floors: [2, 3, 4],
    totalRooms: 12,
    availableRooms: 5,
  },
  {
    id: 'pratt',
    name: 'Pratt Library',
    shortName: 'Pratt',
    address: '6 Hoskin Ave.',
    hours: '9:00 AM – 9:00 PM',
    image: null,
    floors: [1, 2],
    totalRooms: 8,
    availableRooms: 2,
  },
];

// STATUSES: 'available' | 'reserved' | 'occupied'
export const ROOMS = {
  robarts: [
    {
      id: 'R510', name: 'Room 510', floor: 5, type: 'group', capacity: 6,
      status: 'available', amenities: ['whiteboard', 'tv', 'power'],
      currentBooking: null, nextBooking: { time: '4:00 PM', duration: 120 },
    },
    {
      id: 'R512', name: 'Room 512', floor: 5, type: 'group', capacity: 8,
      status: 'occupied', amenities: ['whiteboard', 'tv', 'power', 'phone'],
      currentBooking: { user: 'Alex K.', endTime: '3:00 PM', minutesLeft: 24 },
      nextBooking: null,
    },
    {
      id: 'R514', name: 'Room 514', floor: 5, type: 'individual', capacity: 2,
      status: 'available', amenities: ['power'],
      currentBooking: null, nextBooking: { time: '5:00 PM', duration: 60 },
    },
    {
      id: 'R516', name: 'Room 516', floor: 5, type: 'group', capacity: 4,
      status: 'reserved', amenities: ['whiteboard', 'power'],
      currentBooking: { user: 'Sarah M.', startTime: '2:30 PM', minutesUntil: 15 },
      nextBooking: null,
    },
    {
      id: 'R610', name: 'Room 610', floor: 6, type: 'individual', capacity: 1,
      status: 'available', amenities: ['power'],
      currentBooking: null, nextBooking: null,
    },
    {
      id: 'R612', name: 'Room 612', floor: 6, type: 'group', capacity: 6,
      status: 'occupied', amenities: ['whiteboard', 'tv', 'power'],
      currentBooking: { user: 'CS Group', endTime: '3:30 PM', minutesLeft: 54 },
      nextBooking: null,
    },
    {
      id: 'R614', name: 'Room 614', floor: 6, type: 'group', capacity: 10,
      status: 'reserved', amenities: ['whiteboard', 'tv', 'power', 'phone'],
      currentBooking: { user: 'Jordan T.', startTime: '2:15 PM', minutesUntil: 0 },
      nextBooking: null,
    },
    {
      id: 'R710', name: 'Room 710', floor: 7, type: 'individual', capacity: 2,
      status: 'available', amenities: ['power'],
      currentBooking: null, nextBooking: { time: '6:00 PM', duration: 90 },
    },
    {
      id: 'R712', name: 'Room 712', floor: 7, type: 'group', capacity: 6,
      status: 'available', amenities: ['whiteboard', 'power'],
      currentBooking: null, nextBooking: null,
    },
    {
      id: 'R714', name: 'Room 714', floor: 7, type: 'occupied', capacity: 4,
      status: 'occupied', amenities: ['power'],
      currentBooking: { user: 'Riley P.', endTime: '4:00 PM', minutesLeft: 84 },
      nextBooking: null,
    },
  ],
  gerstein: [
    {
      id: 'G101', name: 'Room 101', floor: 1, type: 'group', capacity: 6,
      status: 'available', amenities: ['whiteboard', 'power'],
      currentBooking: null, nextBooking: { time: '4:30 PM', duration: 60 },
    },
    {
      id: 'G102', name: 'Room 102', floor: 1, type: 'individual', capacity: 2,
      status: 'occupied', amenities: ['power'],
      currentBooking: { user: 'Dana W.', endTime: '3:15 PM', minutesLeft: 39 },
      nextBooking: null,
    },
    {
      id: 'G201', name: 'Room 201', floor: 2, type: 'group', capacity: 8,
      status: 'available', amenities: ['whiteboard', 'tv', 'power'],
      currentBooking: null, nextBooking: null,
    },
    {
      id: 'G202', name: 'Room 202', floor: 2, type: 'individual', capacity: 1,
      status: 'reserved', amenities: ['power'],
      currentBooking: { user: 'Kim L.', startTime: '2:45 PM', minutesUntil: 30 },
      nextBooking: null,
    },
  ],
  bahen: [
    {
      id: 'B201', name: 'Room 201', floor: 2, type: 'group', capacity: 6,
      status: 'available', amenities: ['whiteboard', 'power'],
      currentBooking: null, nextBooking: { time: '5:00 PM', duration: 120 },
    },
    {
      id: 'B202', name: 'Room 202', floor: 2, type: 'individual', capacity: 2,
      status: 'available', amenities: ['power'],
      currentBooking: null, nextBooking: null,
    },
    {
      id: 'B301', name: 'Room 301', floor: 3, type: 'group', capacity: 4,
      status: 'occupied', amenities: ['whiteboard', 'power'],
      currentBooking: { user: 'ECE Study', endTime: '3:45 PM', minutesLeft: 69 },
      nextBooking: null,
    },
  ],
  pratt: [
    {
      id: 'P101', name: 'Room 101', floor: 1, type: 'individual', capacity: 2,
      status: 'available', amenities: ['power'],
      currentBooking: null, nextBooking: null,
    },
    {
      id: 'P102', name: 'Room 102', floor: 1, type: 'group', capacity: 6,
      status: 'occupied', amenities: ['whiteboard', 'power'],
      currentBooking: { user: 'Book Club', endTime: '4:00 PM', minutesLeft: 84 },
      nextBooking: null,
    },
  ],
};

export const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  '10:00 PM', '10:30 PM',
];

export const DURATIONS = [
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hrs', value: 90 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
];

export const AMENITY_LABELS = {
  whiteboard: 'Whiteboard',
  tv: 'TV / Display',
  power: 'Power Outlets',
  phone: 'Conference Phone',
};

export function getStatusConfig(status) {
  switch (status) {
    case 'available':
      return { label: 'Available', color: 'green', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' };
    case 'reserved':
      return { label: 'Reserved', color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'occupied':
      return { label: 'Occupied', color: 'red', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
    default:
      return { label: 'Unknown', color: 'gray', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' };
  }
}
