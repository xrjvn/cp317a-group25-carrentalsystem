"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCars } from "@/app/data/mockCars";
import Image from "next/image";
import { useReservations } from "../context/ReservationContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';




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
    
    // Date objects for DatePicker components
    const [pickupDate, setPickupDate] = useState<Date | null>(
        preSelectedPickupDate ? new Date(preSelectedPickupDate) : null
    );
    const [returnDate, setReturnDate] = useState<Date | null>(
        preSelectedReturnDate ? new Date(preSelectedReturnDate) : null
    );
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
            setPickupDate(new Date(preSelectedPickupDate));
        }
        if (preSelectedReturnDate) {
            setFormData(prev => ({ ...prev, returnDate: preSelectedReturnDate }));
            setReturnDate(new Date(preSelectedReturnDate));
        }
    }, [preSelectedPickupDate, preSelectedReturnDate]);
    
    // Custom Tailwind-styled theme for react-select
    const selectStyles = {
        control: (base: any, state: any) => ({
            ...base,
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            padding: '0.125rem 0.5rem',
            minHeight: '42px',
            fontSize: '0.875rem',
            '&:hover': {
                border: '2px solid #d1d5db',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#3b82f6'
                : state.isFocused
                ? '#eff6ff'
                : 'white',
            color: state.isSelected ? 'white' : '#111827',
            padding: '0.75rem 1rem',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#3b82f6',
                color: 'white',
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#9ca3af',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#111827',
        }),
        menu: (base: any) => ({
            ...base,
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            marginTop: '0.25rem',
            zIndex: 9999,
        }),
        menuPortal: (base: any) => ({
            ...base,
            zIndex: 9999,
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '0.25rem',
        }),
    };
    
    // Options for react-select car dropdown
    const carOptions = [
        { value: '', label: 'Select a Car' },
        ...mockCars.map(car => ({
            value: car.id.toString(),
            label: `${car.year} ${car.make} ${car.model} ($${car.pricePerDay}/day)`
        }))
    ];




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
        <main className="min-h-screen bg-gray-50 py-8">
            {/* Custom styles for Tailwind-styled date picker and dropdowns */}
            <style dangerouslySetInnerHTML={{__html: `
                /* Style react-datepicker with Tailwind */
                .react-datepicker-wrapper {
                    width: 100%;
                }
                
                .react-datepicker__input-container input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    padding-right: 3rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    background-color: white;
                    color: #111827;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                
                .react-datepicker__input-container input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                .react-datepicker__input-container input:hover {
                    border-color: #d1d5db;
                }
                
                /* Calendar popup styling */
                .react-datepicker {
                    font-family: inherit;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                
                .react-datepicker__header {
                    background-color: #eff6ff;
                    border-bottom: 1px solid #e5e7eb;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    padding-top: 0.75rem;
                }
                
                .react-datepicker__current-month {
                    color: #1e40af;
                    font-weight: 600;
                    font-size: 0.875rem;
                    padding-bottom: 0.5rem;
                }
                
                .react-datepicker__day-names {
                    display: flex;
                    justify-content: space-around;
                    padding: 0.5rem 0;
                }
                
                .react-datepicker__day-name {
                    color: #6b7280;
                    font-weight: 500;
                    font-size: 0.75rem;
                    width: 2rem;
                    line-height: 2rem;
                }
                
                .react-datepicker__day {
                    color: #111827;
                    width: 2rem;
                    line-height: 2rem;
                    margin: 0.166rem;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                }
                
                .react-datepicker__day:hover {
                    background-color: #dbeafe;
                    border-radius: 0.375rem;
                }
                
                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    background-color: #3b82f6 !important;
                    color: white !important;
                    font-weight: 600;
                }
                
                .react-datepicker__day--today {
                    font-weight: 600;
                    color: #3b82f6;
                }
                
                .react-datepicker__day--disabled {
                    color: #d1d5db;
                    cursor: not-allowed;
                }
                
                .react-datepicker__navigation {
                    top: 0.75rem;
                }
                
                .react-datepicker__navigation-icon::before {
                    border-color: #6b7280;
                }
                
                .react-datepicker__navigation:hover *::before {
                    border-color: #3b82f6;
                }
                
                /* Ensure calendar popup renders outside container */
                .react-datepicker-popper {
                    z-index: 9999 !important;
                }
                
                .react-datepicker__portal {
                    z-index: 9999 !important;
                }
            `}} />
            
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Reserve a Car</h1>

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
                                <Select
                                    id="carId"
                                    instanceId="carId-select"
                                    value={carOptions.find(opt => opt.value === formData.carId) || null}
                                    onChange={(option) => {
                                        const value = option?.value || '';
                                        setFormData(prev => ({ ...prev, carId: value }));
                                    }}
                                    options={carOptions}
                                    styles={selectStyles}
                                    placeholder="Select a Car"
                                    isClearable={false}
                                    isSearchable={false}
                                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                    menuPosition="fixed"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        {/* Date Range Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Date Range</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pickup Date - Tailwind-styled DatePicker */}
                                <div className="relative">
                                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Pickup Date
                                    </label>
                                    <div className="relative">
                                        {/* Calendar icon */}
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <DatePicker
                                            id="pickupDate"
                                            selected={pickupDate}
                                            onChange={(date: Date | null) => {
                                                setPickupDate(date);
                                                setFormData(prev => ({ 
                                                    ...prev, 
                                                    pickupDate: date ? date.toISOString().split('T')[0] : '' 
                                                }));
                                            }}
                                            minDate={new Date()}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Select pickup date"
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg 
                                                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                       transition-all duration-200 bg-white text-gray-900
                                                       hover:border-gray-300 shadow-sm hover:shadow-md
                                                       cursor-pointer"
                                            wrapperClassName="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Return Date - Tailwind-styled DatePicker */}
                                <div className="relative">
                                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                                        Return Date
                                    </label>
                                    <div className="relative">
                                        {/* Calendar icon */}
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <DatePicker
                                            id="returnDate"
                                            selected={returnDate}
                                            onChange={(date: Date | null) => {
                                                setReturnDate(date);
                                                setFormData(prev => ({ 
                                                    ...prev, 
                                                    returnDate: date ? date.toISOString().split('T')[0] : '' 
                                                }));
                                            }}
                                            minDate={pickupDate || new Date()}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Select return date"
                                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg 
                                                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                       transition-all duration-200 bg-white text-gray-900
                                                       hover:border-gray-300 shadow-sm hover:shadow-md
                                                       cursor-pointer"
                                            wrapperClassName="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                                           font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}