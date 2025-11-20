'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { mockCars, carTypes, locations, fuelTypes, transmissions, Car } from '../data/mockCars';

export default function SearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    pickupDate: null as Date | null,
    returnDate: null as Date | null,
    carType: '',
    location: '',
    fuelType: '',
    transmission: '',
    maxPrice: ''
  });

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Options for react-select dropdowns
  const carTypeOptions = [
    { value: '', label: 'All Types' },
    ...carTypes.map(type => ({ value: type, label: type }))
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    ...locations.map(location => ({ value: location, label: location }))
  ];

  const fuelTypeOptions = [
    { value: '', label: 'All Fuel Types' },
    ...fuelTypes.map(fuel => ({ value: fuel, label: fuel }))
  ];

  const transmissionOptions = [
    { value: '', label: 'All Transmissions' },
    ...transmissions.map(trans => ({ value: trans, label: trans }))
  ];

  const handleFilterChange = (field: string, value: string | Date | null) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: string, selectedOption: { value: string; label: string } | null) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: selectedOption?.value || ''
    }));
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filteredCars = mockCars.filter(car => {
      // Filter by car type
      if (searchFilters.carType && car.type !== searchFilters.carType) {
        return false;
      }
      
      // Filter by location
      if (searchFilters.location && car.location !== searchFilters.location) {
        return false;
      }
      
      // Filter by fuel type
      if (searchFilters.fuelType && car.fuelType !== searchFilters.fuelType) {
        return false;
      }
      
      // Filter by transmission
      if (searchFilters.transmission && car.transmission !== searchFilters.transmission) {
        return false;
      }
      
      // Filter by max price
      if (searchFilters.maxPrice && car.pricePerDay > parseInt(searchFilters.maxPrice)) {
        return false;
      }
      
      return car.available;
    });

    setSearchResults(filteredCars);
    setHasSearched(true);
    
    // Smooth scroll to results after a short delay to ensure DOM is updated
    setTimeout(() => {
      const resultsElement = document.getElementById('search-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const clearFilters = () => {
    setSearchFilters({
      pickupDate: null,
      returnDate: null,
      carType: '',
      location: '',
      fuelType: '',
      transmission: '',
      maxPrice: ''
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search for Cars</h1>
          <p className="text-gray-600">Find the perfect car for your trip</p>
        </div>

        {/* Search Form - Enhanced with better styling */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          {/* Form Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Filter Search</h2>
          </div>

          <form onSubmit={handleSearch} className="p-6">
            {/* Date Range Section - Grouped visually */}
            <div className="mb-6">
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
                      selected={searchFilters.pickupDate}
                      onChange={(date: Date | null) => handleFilterChange('pickupDate', date)}
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
                      selected={searchFilters.returnDate}
                      onChange={(date: Date | null) => handleFilterChange('returnDate', date)}
                      minDate={searchFilters.pickupDate || new Date()}
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

            {/* Divider - Visual separation */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Car Specifications Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Car Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Car Type - Tailwind-styled react-select */}
                <div>
                  <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-2">
                    Car Type
                  </label>
                  <Select
                    id="carType"
                    instanceId="carType-select"
                    value={carTypeOptions.find(opt => opt.value === searchFilters.carType) || null}
                    onChange={(option) => handleSelectChange('carType', option)}
                    options={carTypeOptions}
                    styles={selectStyles}
                    placeholder="All Types"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Location - Tailwind-styled react-select */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Select
                    id="location"
                    instanceId="location-select"
                    value={locationOptions.find(opt => opt.value === searchFilters.location) || null}
                    onChange={(option) => handleSelectChange('location', option)}
                    options={locationOptions}
                    styles={selectStyles}
                    placeholder="All Locations"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Fuel Type - Tailwind-styled react-select */}
                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <Select
                    id="fuelType"
                    instanceId="fuelType-select"
                    value={fuelTypeOptions.find(opt => opt.value === searchFilters.fuelType) || null}
                    onChange={(option) => handleSelectChange('fuelType', option)}
                    options={fuelTypeOptions}
                    styles={selectStyles}
                    placeholder="All Fuel Types"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Transmission - Tailwind-styled react-select */}
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission
                  </label>
                  <Select
                    id="transmission"
                    instanceId="transmission-select"
                    value={transmissionOptions.find(opt => opt.value === searchFilters.transmission) || null}
                    onChange={(option) => handleSelectChange('transmission', option)}
                    options={transmissionOptions}
                    styles={selectStyles}
                    placeholder="All Transmissions"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Price Range Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Price Range</h3>
              <div className="max-w-md">
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price Per Day ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    id="maxPrice"
                    value={searchFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                               focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                               transition-all duration-200 bg-white text-gray-900
                               hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons - Enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                           font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Search Cars
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 bg-white text-gray-700 px-8 py-3 rounded-lg 
                           font-semibold border-2 border-gray-300 shadow-sm hover:shadow-md 
                           hover:border-gray-400 hover:bg-gray-50
                           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div id="search-results" className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length} cars found)
              </h2>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((car) => (
                  <div key={car.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 relative">
                    <Image
                      src={car.image ? `/cars/${car.image}` : "/DefaultCarImage.png"}
                      alt={`${car.make ?? "Car"} ${car.model ?? ""}`}
                      fill
                      className="object-cover"
                    />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <span className="text-sm text-gray-500">{car.type}</span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>📍 {car.location}</p>
                        <p>⛽ {car.fuelType}</p>
                        <p>🔧 {car.transmission}</p>
                        <p>📊 {car.mileage.toLocaleString()} miles</p>
                      </div>

                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{car.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${car.pricePerDay}
                          </span>
                          <span className="text-gray-600">/day</span>
                        </div>
                        <Link 
                          href={`/reserve?carId=${car.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          Reserve
                        </Link>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
