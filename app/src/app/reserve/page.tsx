"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";


export default function ReservePage() {
    const searchParams = useSearchParams();
    const preSelectedCarId = searchParams.get('carId');
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        carId: preSelectedCarId || "",
        pickupDate: "",
        returnDate: "",
    });

    const [reservations, setReservations] = useState<any[]>([]);

    // Update carId when URL parameter changes
    useEffect(() => {
        if (preSelectedCarId) {
            setFormData(prev => ({ ...prev, carId: preSelectedCarId }));
        }
    }, [preSelectedCarId]);




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

        const newReservation = { ...formData, car: selectedCar };
        setReservations([...reservations, newReservation]);

        alert(`Reservation confirmed for ${selectedCar.make} ${selectedCar.model}!`);
        setFormData({ name: "", email: "", carId: "", pickupDate: "", returnDate: "" });
    };

    const handleCancel = (index: number) => {
        setReservations((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-gray-950 text-white">
            <h1 className="text-4xl font-bold mb-6">Reserve a Car</h1>

            {/* Selected Car Preview */}
            {formData.carId && (() => {
                const selectedCar = mockCars.find(car => car.id.toString() === formData.carId);
                return selectedCar ? (
                    <div className="bg-gray-800 p-4 rounded-xl mb-6 max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Selected Car:</h2>
                        <div className="flex items-center space-x-4">
                            {/* Have the car's actual image show instead of emoji */}
                            <div className="w-24 h-16 rounded-lg overflow-hidden">
                                <Image
                                    src={selectedCar.image}
                                    alt={`${selectedCar.make} ${selectedCar.model}`}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
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
                    Confirm Reservation
                </button>
            </form>


            {/* Temporary reservation list */}
            {reservations.length > 0 && (
                <div className="mt-8 bg-gray-900 p-4 rounded-xl max-w-md w-full">
                    <h2 className="text-2xl mb-2">Current Reservations</h2>
                    {reservations.map((r, i) => (
                    <div 
                        key={i}
                        className="border-t border-gray-700 py-3 text-sm flex items-center justify-between gap-3"
                    >
                        {/* Left: car image + details */}
                        <div className="flex items-center gap-3">
                            <img
                                src={r.car.image && r.car.image.trim() !== "" ? r.car.image : "/DefaultCarImage.png"}
                                alt={`${r.car.brand ?? "Car"} ${r.car.model ?? ""}`}
                                width={100}
                                height={60}
                                style={{ borderRadius: "6px", objectFit: "cover" }}
                            />
                            <div>
                                <strong>{r.name}</strong> reserved{" "}
                                <b>
                                    {r.car.brand} {r.car.model}
                                </b>{" "}
                                ({r.car.year})
                                <br />
                                from {r.pickupDate} &rarr; {r.returnDate} (${r.car.pricePerDay}/day)
                            </div>
                        </div>

                        {/* Right: Cancel button */}
                        <button
                            onClick={() => handleCancel(i)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                    ))}
                </div>
            )}
        </main>
    );
}