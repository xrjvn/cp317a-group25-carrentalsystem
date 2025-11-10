'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockCars, carTypes, locations, fuelTypes, transmissions, Car } from '../data/mockCars';

export default function SearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    pickupDate: '',
    returnDate: '',
    carType: '',
    location: '',
    fuelType: '',
    transmission: '',
    maxPrice: ''
  });

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
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
  };

  const clearFilters = () => {
    setSearchFilters({
      pickupDate: '',
      returnDate: '',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search for Cars</h1>
          <p className="text-gray-600">Find the perfect car for your trip</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pickup Date */}
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  value={searchFilters.pickupDate}
                  onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Return Date */}
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  value={searchFilters.returnDate}
                  onChange={(e) => handleFilterChange('returnDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Car Type */}
              <div>
                <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  id="carType"
                  value={searchFilters.carType}
                  onChange={(e) => handleFilterChange('carType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {carTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  value={searchFilters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  id="transmission"
                  value={searchFilters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price/Day ($)
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={searchFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search Cars
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-md p-6">
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
              <div className="max-h-96 overflow-y-auto pr-2">
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
