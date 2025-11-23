"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";
import { useReservations } from "../context/ReservationContext";

export default function ModifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reservationId = searchParams.get('reservationId');
    
    const { reservations, updateReservation } = useReservations();
    
    const reservation = reservations.find(r => r.id === reservationId);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: "",
        pickupDate: "",
        returnDate: "",
    });

    // Pre-fill form with existing reservation data
    useEffect(() => {
        if (reservation) {
            setFormData({
                name: reservation.name,
                email: reservation.email,
                carId: reservation.carId,
                pickupDate: reservation.pickupDate,
                returnDate: reservation.returnDate,
            });
        }
    }, [reservation]);

    // Redirect if reservation not found
    useEffect(() => {
        if (!reservationId || !reservation) {
            router.push('/reservations');
        }
    }, [reservationId, reservation, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reservationId) {
            alert("Reservation ID is missing.");
            return;
        }

        if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
            alert("Return date cannot be earlier than pickup date.");
            return;
        }

        const selectedCar = mockCars.find((c) => c.id.toString() === formData.carId);
        if (!selectedCar) {
            alert("Please select a valid car option.");
            return;
        }

        updateReservation(reservationId, {
            name: formData.name,
            email: formData.email,
            carId: formData.carId,
            pickupDate: formData.pickupDate,
            returnDate: formData.returnDate,
        });

        alert(`Reservation updated for ${selectedCar.make} ${selectedCar.model}!`);
        router.push('/reservations');
    };

    if (!reservation) {
        return null; // Will redirect in useEffect
    }

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Modify Reservation</h1>

                {/* Selected Car Preview */}
                {formData.carId && (() => {
                    const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                    return selectedCar ? (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Selected Car:</h2>
                            <div className="flex items-center space-x-4">
                                <div className="w-24 h-16 rounded-lg overflow-hidden">
                                    <Image
                                    src={`/cars/${selectedCar.image}`}
                                    alt={`${selectedCar.make} ${selectedCar.model}`}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full rounded-lg"
                                    onError={(e) => (e.currentTarget.src = "/DefaultCarImage.png")}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h3>
                                    <p className="text-green-600 font-bold">${selectedCar.pricePerDay}/day</p>
                                    <p className="text-sm text-gray-600">{selectedCar.location}</p>
                                </div>
                            </div>
                        </div>
                    ) : null;
                })()}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Reservation Details</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Personal Information Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Personal Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                                                   focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                   transition-all duration-200 bg-white text-gray-900
                                                   hover:border-gray-300 shadow-sm hover:shadow-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                                                   focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                   transition-all duration-200 bg-white text-gray-900
                                                   hover:border-gray-300 shadow-sm hover:shadow-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        {/* Car Selection Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Car Selection</h3>
                            <div>
                                <label htmlFor="carId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Select a Car
                                </label>
                                <select
                                    id="carId"
                                    name="carId"
                                    value={formData.carId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                                               focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                               transition-all duration-200 bg-white text-gray-900
                                               hover:border-gray-300 shadow-sm hover:shadow-md
                                               cursor-pointer"
                                    required
                                >
                                    <option value="">Select a Car</option>
                                    {mockCars.map((car) => (
                                        <option key={car.id} value={car.id.toString()}>
                                            {car.year} {car.make} {car.model} (${car.pricePerDay}/day)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        {/* Date Range Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Date Range</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Pickup Date
                                    </label>
                                    <div className="relative">
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="date"
                                            id="pickupDate"
                                            name="pickupDate"
                                            value={formData.pickupDate}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, pickupDate: e.target.value }))
                                            }
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg 
                                                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                       transition-all duration-200 bg-white text-gray-900
                                                       hover:border-gray-300 shadow-sm hover:shadow-md
                                                       cursor-pointer"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Return Date
                                    </label>
                                    <div className="relative">
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="date"
                                            id="returnDate"
                                            name="returnDate"
                                            value={formData.returnDate}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, returnDate: e.target.value }))
                                            }
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg 
                                                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                       transition-all duration-200 bg-white text-gray-900
                                                       hover:border-gray-300 shadow-sm hover:shadow-md
                                                       cursor-pointer"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                                               font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                               transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Update Reservation
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push('/reservations')}
                                    className="flex-1 bg-white text-gray-700 px-8 py-3 rounded-lg 
                                               font-semibold border-2 border-gray-300 shadow-sm hover:shadow-md 
                                               hover:border-gray-400 hover:bg-gray-50
                                               focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                                               transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

