'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Reservation } from '../data/mockReservations';

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

  const addReservation = (reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: `RES${Date.now()}`, // unique id
      status: 'active',
      bookingDate: new Date().toISOString().split('T')[0], // todays date
    };
    setReservations((prev) => [...prev, newReservation]);
  //  console.log('Added reservation:', newReservation); 
  };

  const updateReservationStatus = (id: string, status: 'active' | 'completed' | 'cancelled') => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  const updateReservation = (id: string, reservationData: Omit<Reservation, 'id' | 'status' | 'bookingDate'>) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id
          ? { ...reservation, ...reservationData }
          : reservation
      )
    );
  };

  const removeReservation = (id: string) => {
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
