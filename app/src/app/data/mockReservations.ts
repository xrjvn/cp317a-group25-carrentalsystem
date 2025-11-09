export interface Reservation {
  id: string;
  name: string;
  email: string;
  carId: string;
  pickupDate: string;
  returnDate: string;
  status: 'active' | 'completed' | 'cancelled';
  bookingDate: string;
}

export const mockReservations: Reservation[] = [
  {
    id: 'RES001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    carId: '1',
    pickupDate: '2025-11-10',
    returnDate: '2025-11-15',
    status: 'active',
    bookingDate: '2025-11-01'
  },
  {
    id: 'RES002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    carId: '3',
    pickupDate: '2025-11-20',
    returnDate: '2025-11-25',
    status: 'active',
    bookingDate: '2025-11-02'
  },
  {
    id: 'RES003',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    carId: '5',
    pickupDate: '2025-10-15',
    returnDate: '2025-10-20',
    status: 'completed',
    bookingDate: '2025-10-10'
  },
  {
    id: 'RES004',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    carId: '2',
    pickupDate: '2025-09-01',
    returnDate: '2025-09-05',
    status: 'completed',
    bookingDate: '2025-08-25'
  },
  {
    id: 'RES005',
    name: 'Tom Brown',
    email: 'tom.brown@email.com',
    carId: '7',
    pickupDate: '2025-08-10',
    returnDate: '2025-08-12',
    status: 'cancelled',
    bookingDate: '2025-08-05'
  }
];
