"use client"
import React, { useState } from "react";

const CarDetailsClient = ({ car }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

       
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <img
            src={car.imageUrl}
            alt={car.carName}
            className="w-full h-[420px] object-cover"
          />
        </div>

        
        <div className="space-y-4">

          <h1 className="text-3xl font-bold">{car.carName}</h1>

          <p>🚗 Type: <b>{car.carType}</b></p>
          <p>💰 Price: <b>${car.dailyRentPrice}/day</b></p>
          <p>👥 Seats: <b>{car.seatCapacity}</b></p>
          <p>📍 Location: <b>{car.pickupLocation}</b></p>

          <p
            className={`font-semibold ${
              car.availabilityStatus === "Available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {car.availabilityStatus}
          </p>

          <p className="text-gray-600">{car.description}</p>

         
          <button
            disabled={car.availabilityStatus !== "Available"}
            onClick={() => setOpen(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Book Now
          </button>

        </div>
      </div>

  
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-4">

            <h2 className="text-2xl font-bold">
              Confirm Booking
            </h2>

            <p><b>Car:</b> {car.carName}</p>
            <p><b>Price:</b> ${car.dailyRentPrice}/day</p>
            <p><b>Pickup:</b> {car.pickupLocation}</p>

            <p className="text-gray-600">
              Do you want to book this car?
            </p>

    
            <div className="flex gap-3">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("Booking Successful 🚗");
                  setOpen(false);

                 
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CarDetailsClient;