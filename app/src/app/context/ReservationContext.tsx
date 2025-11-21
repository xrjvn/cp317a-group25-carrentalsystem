'use client';

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation } from '../data/mockReservations';
import { mockCars } from "../data/mockCars";

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => void;
  updateReservationStatus: (id: string, status: 'active' | 'completed' | 'cancelled') => void;
  updateReservation: (id: string, reservation: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => void;
  removeReservation: (id: string) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((r: any) => {
          const car = mockCars.find(c => c.id.toString() === r.carId);

          return {
            ...r,
            car,
            status: r.status ?? "active",
          };
        });
        setReservations(enriched);
      })
      .catch((err) => console.error("Failed to load reservations:", err));
  }, []);

  const addReservation = async (
    reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>
  ) => {
    const res = await fetch("/api/reservations", {
      method: "POST",
      body: JSON.stringify(reservationData),
    });

    const data = await res.json();
    const car = mockCars.find(c => c.id.toString() === data.reservation.carId);
    setReservations((prev) => [...prev, { ...data.reservation, car }]);
  };

  const updateReservationStatus = async (
    id: string,
    status: "active" | "completed" | "cancelled"
  ) => {
    await fetch("/api/reservations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setReservations(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  const updateReservation = async (
    id: string,
    reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>
  ) => {
    await fetch("/api/reservations/update", {
      method: "PUT",
      body: JSON.stringify({ id, reservationData }),
    });

    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, ...reservationData } : reservation
      )
    );
  };

  const removeReservation = async (id: string) => {
    await fetch("/api/reservations", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservationStatus,
        updateReservation,
        removeReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
}
