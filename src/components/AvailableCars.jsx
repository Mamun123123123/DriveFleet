"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AvailableCars = () => {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadCars = async () => {

      try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars`);
        const data = await res.json();

        setCars(data || []);

      } catch (error) {

        setCars([]);

      } finally {

        setLoading(false);

      }

    };

    loadCars();

  }, []);

  const visibleCars = cars.slice(0, 6);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Available Cars
      </h2>

      {loading && (
        <p className="text-gray-500">
          Loading cars...
        </p>
      )}

      {!loading && visibleCars.length === 0 && (
        <p className="text-gray-500">
          No cars available
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {visibleCars.map((car) => (
          <div
            key={car._id}
            className="border rounded-xl shadow p-4"
          >

           {car?.imageUrl && (
  <Image
    src={car.imageUrl}
    alt={car?.carName || "Car image"}
    width={500}
    height={300}
    className="w-full h-48 object-cover"
  />
)}

            <h3 className="text-lg font-semibold mt-2">
              {car?.carName}
            </h3>

            <p className="text-sm text-gray-600">
              Type: {car?.carType}
            </p>

            <p className="text-sm text-gray-600">
              Price: ${car?.dailyRentPrice}/day
            </p>

            <p className="text-sm text-gray-600">
              Location: {car?.pickupLocation}
            </p>

            <p className="text-sm text-gray-600">
              Status: {car?.availabilityStatus}
            </p>

            <Link href={`/explore-cars/${car._id}`}>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
                View Details
              </button>
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AvailableCars;