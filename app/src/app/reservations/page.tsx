'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useReservations } from '../context/ReservationContext';
import { mockCars } from '../data/mockCars';

export default function ReservationsPage() {
  const { reservations, removeReservation } = useReservations();

  // Filter active bookings
  const activeBookings = reservations.filter(r => r.status === 'active');
  const completedBookings = reservations.filter(r => r.status === 'completed');
  const cancelledBookings = reservations.filter(r => r.status === 'cancelled');

  return (
    <div className="min-h-screen bg-grey-450 text-white p-8">
      <h1 className="text-3xl font-bold text-left mb-6">My Reservations</h1>
      
      {/* Active Bookings Section */}
      <section className="mb-8">
        <h2 className="text-sm text-green-400 font-semibold text-left mb-4">Active Bookings</h2>
        
        {activeBookings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-6 text-lg">No active bookings</p>
            <div className="flex gap-4 justify-center">
              <Link href="/search" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Search Cars
              </Link>
              <Link href="/reserve" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Reserve Car
              </Link>
            </div>
          </div>
        ) : (

          // Show bookings list
          <div className="space-y-4">
            {activeBookings.map((reservation) => {
              const car = mockCars.find(c => c.id.toString() === reservation.carId);
              if (!car) return null;
              
              return (
                <div
                  key={reservation.id}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={car.image ? `/cars/${car.image}` : "/DefaultCarImage.png"}
                      alt={`${car.make ?? "Car"} ${car.model ?? ""}`}
                      width={100}
                      height={60}
                      className="rounded object-cover"
                      onError={(e) => (e.currentTarget.src = "/DefaultCarImage.png")}
                    />
                    <div>
                      <strong>{reservation.name}</strong> reserved{' '}
                      <b>{car.make} {car.model}</b> ({car.year})<br />
                      from {reservation.pickupDate} → {reservation.returnDate} (${car.pricePerDay}/day)
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => {
                      if (confirm("Cancel this reservation?")) removeReservation(reservation.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                </div>

              );
            })}
          </div>
        )}
      </section>

      {/* Cancelled Bookings Section */}
      {cancelledBookings.length > 0 && (
        <section>
          <h2 className="text-sm text-red-400 font-semibold text-left mb-4">Cancelled Bookings</h2>
          <div className="space-y-4">
            {cancelledBookings.map((reservation) => {
              const car = mockCars.find(c => c.id.toString() === reservation.carId);
              if (!car) return null;
              
              return (
                <div
                  key={reservation.id}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={car.image ? `/cars/${car.image}` : "/DefaultCarImage.png"}
                      alt={`${car.make ?? "Car"} ${car.model ?? ""}`}
                      width={100}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div>
                      <strong>{reservation.name}</strong> reserved{" "}
                      <b>{car.make} {car.model}</b> ({car.year})
                      <br />
                      from {reservation.pickupDate} → {reservation.returnDate} (${car.pricePerDay}/day)
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to cancel this reservation?")) {
                        removeReservation(reservation.id);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                </div>

              );
            })}
          </div>
        </section>
      )}
    </div>
  );
} 