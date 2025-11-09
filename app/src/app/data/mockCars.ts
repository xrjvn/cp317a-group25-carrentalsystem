export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: 'Economy' | 'Compact' | 'Mid-size' | 'Full-size' | 'Luxury' | 'SUV' | 'Van';
  pricePerDay: number;
  image: string;
  features: string[];
  available: boolean;
  location: string;
  mileage: number;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual';
}

export const mockCars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: 'Mid-size',
    pricePerDay: 45,
    image: '2023 Honda Civic.jpg',
    features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
    available: true,
    location: 'Downtown Branch',
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    type: 'Compact',
    pricePerDay: 35,
    image: '2023 Toyota Camry.jpg',
    features: ['Apple CarPlay', 'Lane Assist', 'Bluetooth'],
    available: true,
    location: 'Airport Branch',
    mileage: 12000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '3',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    type: 'Luxury',
    pricePerDay: 85,
    image: '2024 BMW 3 Series.jpg',
    features: ['Leather Seats', 'Navigation', 'Premium Sound'],
    available: true,
    location: 'Downtown Branch',
    mileage: 8000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '4',
    make: 'Ford',
    model: 'Explorer',
    year: 2023,
    type: 'SUV',
    pricePerDay: 65,
    image: '2023 Ford Explorer.jpg',
    features: ['AWD', 'Third Row Seating', 'Towing Package'],
    available: true,
    location: 'Suburban Branch',
    mileage: 18000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'Luxury',
    pricePerDay: 95,
    image: '2024 Tesla Model 3.jpg',
    features: ['Autopilot', 'Supercharging', 'Premium Interior'],
    available: true,
    location: 'Downtown Branch',
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Automatic'
  },
  {
    id: '6',
    make: 'Nissan',
    model: 'Altima',
    year: 2023,
    type: 'Mid-size',
    pricePerDay: 42,
    image: '2023 Nissan Altima.jpg',
    features: ['ProPILOT Assist', 'Bose Audio', 'Remote Start'],
    available: true,
    location: 'Airport Branch',
    mileage: 20000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '7',
    make: 'Chevrolet',
    model: 'Equinox',
    year: 2023,
    type: 'SUV',
    pricePerDay: 55,
    image: '2023 Chevrolet Equinox.jpg',
    features: ['WiFi Hotspot', 'Teen Driver', 'Safety Package'],
    available: true,
    location: 'Suburban Branch',
    mileage: 16000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: '8',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2023,
    type: 'Compact',
    pricePerDay: 32,
    image: '2023 Hyundai Elantra.jpeg',
    features: ['Wireless Charging', 'Blind Spot Monitor', 'Lane Keep Assist'],
    available: true,
    location: 'Downtown Branch',
    mileage: 14000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  }
];

export const carTypes = ['Economy', 'Compact', 'Mid-size', 'Full-size', 'Luxury', 'SUV', 'Van'];
export const locations = ['Downtown Branch', 'Airport Branch', 'Suburban Branch'];
export const fuelTypes = ['Gasoline', 'Hybrid', 'Electric'];
export const transmissions = ['Automatic', 'Manual'];
