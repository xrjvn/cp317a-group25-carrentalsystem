import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            CarRental Pro
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Your trusted partner for car rentals
          </p>
          <p className="text-lg text-blue-200 mb-12">
            CP317A Group 25 - Car Rental System
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Search Cars
            </Link>
            <Link 
              href="/login"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Easy Search</h3>
            <p className="text-blue-100">Find the perfect car with our advanced search filters</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-white mb-2">Quality Cars</h3>
            <p className="text-blue-100">Choose from our fleet of well-maintained vehicles</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Simple Booking</h3>
            <p className="text-blue-100">Reserve your car in just a few clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
