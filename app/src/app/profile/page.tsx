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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md"
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           bg-gray-100 cursor-not-allowed text-gray-600"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                Driver's License Number
              </label>
              <input
                id="license"
                type="text"
                value={user.license}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           transition-all duration-200 bg-white text-gray-900
                           hover:border-gray-300 shadow-sm hover:shadow-md"
                onChange={e => setUser({ ...user, license: e.target.value })}
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex gap-4">
                <button 
                  onClick={handleSave} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                             font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                             transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Changes
                </button>
                <button 
                  onClick={handleSignOut} 
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg 
                             font-semibold shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                             transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Summary Box */}
      <div className="w-full flex justify-center mt-6">
        <SpendingSummary email={user.email} />
      </div>
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
    <div className="bg-gray-100 p-6 rounded-xl shadow w-full max-w-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">Current Reservation Spending</h2>
      <p className="mb-4 text-gray-700 text-center">Total: <span className="font-bold text-green-600">${totalSpent}</span></p>
      <div className="space-y-2 w-full flex flex-col items-center">
        {spendingByReservation.map(r => {
          const percent = totalSpent ? (r.total / totalSpent) * 100 : 0;
          return (
            <div key={r.id} className="flex items-center gap-2 w-full justify-center">
              <span className="w-32 text-gray-600 text-right">{r.car}</span>
              <div className="h-4 bg-gray-300 rounded relative" style={{ width: '180px' }}>
                <div style={{ width: `${percent}%`, minWidth: '12px' }} className="h-4 bg-blue-500 rounded transition-all absolute left-0 top-0"></div>
              </div>
              <span className="ml-2 text-gray-800 font-semibold">${r.total}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}