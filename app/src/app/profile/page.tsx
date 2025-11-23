"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReservations } from "../context/ReservationContext";
import { mockCars } from "../data/mockCars";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-grey-500 text-white">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-1xl font-bold mb-8 text-center bg-gray-700 text-gray-200 p-6 rounded-xl shadow-lg">Please log in to View your profile.</p>
        <div className="flex gap-6">
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Login</a>
          <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Sign Up</a>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-4 bg-white p-4 rounded shadow">
        <input
          value={user.name}
          className="w-full border p-2 rounded"
          onChange={e => setUser({ ...user, name: e.target.value })}
        />

        <input
          value={user.email}
          className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          readOnly
        />

        <input
          value={user.license}
          className="w-full border p-2 rounded"
          onChange={e => setUser({ ...user, license: e.target.value })}
        />

        <div className="flex justify-between items-center pt-2">
          <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded">
            Save Changes
          </button>
          <button 
            onClick={handleSignOut} 
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Spending Summary Box */}
      <SpendingSummary email={user.email} />
    </main>
  );
}

//  Calculate each car spending and total spending
function SpendingSummary({ email }: { email: string }) {
  const { reservations } = useReservations();
  const userReservations = reservations.filter(r => r.email === email && r.status === "active");
  const spendingByReservation = userReservations.map(r => {
    const car = mockCars.find(c => c.id.toString() === r.carId);
    const pricePerDay = car?.pricePerDay || 0;
    const days = Math.max(1, Math.ceil((new Date(r.returnDate).getTime() - new Date(r.pickupDate).getTime()) / (1000 * 60 * 60 * 24)));
    return { id: r.id, car: car ? `${car.make} ${car.model}` : 'Unknown', total: pricePerDay * days };
  });
  const totalSpent = spendingByReservation.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Current Reservation Spending</h2>
      <p className="mb-4 text-gray-700">Total: <span className="font-bold text-green-600">${totalSpent}</span></p>
      <div className="space-y-2">
        {spendingByReservation.map(r => (
          <div key={r.id} className="flex items-center gap-2">
            <span className="w-32 text-gray-600">{r.car}</span>
            <div className="flex-1 h-4 bg-gray-300 rounded">
              <div style={{ width: `${Math.min(100, r.total / (totalSpent || 1) * 100)}%` }} className="h-4 bg-blue-500 rounded"></div>
            </div>
            <span className="ml-2 text-gray-800 font-semibold">${r.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}