"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";
import { useReservations } from "../context/ReservationContext";




export default function ReservePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const preSelectedCarId = searchParams.get('carId');
    const preSelectedPickupDate = searchParams.get('pickupDate');
    const preSelectedReturnDate = searchParams.get('returnDate');
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: preSelectedCarId || "",
        pickupDate: preSelectedPickupDate || "",
        returnDate: preSelectedReturnDate || "",
    });
    const { reservations, addReservation, removeReservation } = useReservations();


    // Update carId when URL parameter changes
    useEffect(() => {
        if (preSelectedCarId) {
            setFormData(prev => ({ ...prev, carId: preSelectedCarId }));
        }
    }, [preSelectedCarId]);
    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            try {
                const user = JSON.parse(currentUser);
                setFormData(prev => ({
                    ...prev,
                    name: user.name || "",
                    email: user.email || ""
                }));
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (preSelectedPickupDate) {
            setFormData(prev => ({ ...prev, pickupDate: preSelectedPickupDate }));
        }
        if (preSelectedReturnDate) {
            setFormData(prev => ({ ...prev, returnDate: preSelectedReturnDate }));
        }
    }, [preSelectedPickupDate, preSelectedReturnDate]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
            alert("Return date cannot be earlier than pickup date.");
            return;
        }

        const selectedCar = mockCars.find((c) => c.id.toString() === formData.carId);
        if (!selectedCar) return alert("Please select a valid car option.");

        const hasConflict = reservations.some(reservation => {
            // Only check active reservations for the same car
            if (reservation.carId !== formData.carId || reservation.status !== 'active') {
                return false;
            }
            const newPickup = new Date(formData.pickupDate);
            const newReturn = new Date(formData.returnDate);
            const existingPickup = new Date(reservation.pickupDate);
            const existingReturn = new Date(reservation.returnDate);
            // Check if date ranges overlap
            return (newPickup <= existingReturn && newReturn >= existingPickup);
        });

        if (hasConflict) {
            alert("This car is already reserved during the selected dates. Please choose different dates.");
            return;
        }

        // Only redirect to checkout, do not confirm reservation yet
        router.push(`/checkout?carId=${formData.carId}&pickupDate=${formData.pickupDate}&returnDate=${formData.returnDate}`);
    };

    const handleCancel = (index: number) => {
        removeReservation(reservations[index].id);
    };


    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-grey-500 text-white">
            <h1 className="text-4xl font-bold mb-6 text-black">Reserve a Car</h1>

            {/* Selected Car Preview */}
            {formData.carId && (() => {
                const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                return selectedCar ? (
                    <div className="bg-gray-800 p-4 rounded-xl mb-6 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Selected Car:</h2>
                        <div className="flex items-center space-x-4">
                            {/* Insert Car Image*/}
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
                                <h3 className="font-semibold">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h3>
                                <p className="text-green-400 font-bold">${selectedCar.pricePerDay}/day</p>
                                <p className="text-sm text-gray-400">{selectedCar.location}</p>
                            </div>
                        </div>
                    </div>
                ) : null;
            })()}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    required
                />
                
                {/* Dropdown populated from mockCars dataset */}
                <select
                name="carId"
                value={formData.carId}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                >
                <option value="">Select a Car</option>
                {mockCars.map((car) => (
                    <option key={car.id} value={car.id.toString()}>
                    {car.make} {car.model} (${car.pricePerDay}/day)
                    </option>
                ))}
                </select>

                {/* Pickup date */}
                <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pickupDate: e.target.value }))
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                />

                {/* Return date */}
                <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, returnDate: e.target.value }))
                }
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
                >
                    Checkout
                </button>
            </form>

        </main>
    );
}