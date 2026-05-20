'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const fetchCars = async (search = "", type = "") => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (type) params.append("type", type);

      const res = await fetch(
        `http://localhost:5000/explore-cars?${params.toString()}`
      );

      const data = await res.json();
      setCars(data);

    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 auto fetch on change
  useEffect(() => {
    fetchCars(search, type);
  }, [search, type]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Cars
      </h1>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => {
            setSearch("");
            setType("");
          }}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* CAR LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {cars.length === 0 ? (
          <p className="text-center col-span-3">No cars found</p>
        ) : (
          cars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={car.imageUrl}
                alt={car.carName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">

                <h2 className="text-xl font-bold">
                  {car.carName}
                </h2>

                <p className="text-sm text-gray-500">
                  {car.carType}
                </p>

                <p
                  className={`font-semibold ${
                    car.availabilityStatus === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {car.availabilityStatus}
                </p>

                <button
                  onClick={() => router.push(`/explore-cars/${car._id}`)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded"
                >
                  Details
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ExploreCars;