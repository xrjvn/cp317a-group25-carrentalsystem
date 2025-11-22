"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import { useReservations } from "../context/ReservationContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addReservation } = useReservations();

  const carId = searchParams.get("carId");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const car = mockCars.find((c) => c.id.toString() === carId);

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-grey-500 text-white">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-1xl font-bold mb-8 text-center bg-gray-700 text-gray-200 p-6 rounded-xl shadow-lg">Please log in to confirm your reservation.</p>
        <div className="flex gap-6">
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Login</a>
          <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Sign Up</a>
        </div>
      </main>
    );
  }

  if (!car || !pickupDate || !returnDate) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-grey-500 text-white">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <a href="/reserve" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Back to Reserve</a>
      </main>
    );
  }

  const days = Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)));
  const total = car.pricePerDay * days;

  const handleConfirm = () => {
    addReservation({
      name: user.name,
      email: user.email,
      carId: car.id,
      pickupDate,
      returnDate,
    });
    router.push("/reservations");
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-grey-500 text-white">
      <h1 className="text-4xl font-bold mb-6 text-black">Confirm Your Reservation</h1>
      <div className="bg-gray-800 p-6 rounded-xl mb-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">Car Details</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-16 rounded-lg overflow-hidden">
            <img src={`/cars/${car.image}`} alt={`${car.make} ${car.model}`} className="object-cover w-full h-full rounded-lg" onError={(e) => (e.currentTarget.src = "/DefaultCarImage.png")}/>
          </div>
          <div>
            <h3 className="font-semibold">{car.year} {car.make} {car.model}</h3>
            <p className="text-green-400 font-bold">${car.pricePerDay}/day</p>
            <p className="text-sm text-gray-400">{car.location}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full mb-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">Reservation Details</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Pickup Date:</b> {pickupDate}</p>
        <p><b>Return Date:</b> {returnDate}</p>
        <p><b>Total Days:</b> {days}</p>
        <p className="text-green-400 font-bold mt-2"><b>Total Cost:</b> ${total}</p>
      </div>
      <div className="flex flex-col gap-4 max-w-md w-full">
        <button onClick={handleConfirm} className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold">Confirm Reservation</button>
        <button onClick={() => router.back()} className="w-full bg-gray-600 hover:bg-gray-700 p-3 rounded font-semibold">Go Back</button>
      </div>
    </main>
  );
}
