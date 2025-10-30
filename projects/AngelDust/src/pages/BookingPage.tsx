// pages/BookingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import DarkVeil from "./DarkVeil";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStep,
  selectService,
  selectDate,
  selectTime,
  updateVehicle,
  updateCustomer,
  resetBooking,
} from "@/store/slices/bookingSlice";
import { fetchServices } from "@/store/slices/servicesSlice";
import { fetchAvailability } from "@/store/slices/availabilitySlice";
import axios from "axios";

// ----------------------------
// Types
// ----------------------------
interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

interface Vehicle {
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  plate?: string;
}

interface Customer {
  name?: string;
  phone?: string;
  email?: string;
}

interface BookingState {
  step: number;
  service: Service | null;
  date: string | null;
  time: string | null;
  vehicle: Vehicle;
  customer: Customer;
}

interface Availability {
  workingDays?: string[];
  workingHours?: { start: string; end: string };
  slotsPerHour?: number;
}

interface RootState {
  services: { services: Service[] };
  booking: BookingState;
  availability: { data: Availability | null; loading: boolean };
}

// ----------------------------
// Component
// ----------------------------
export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const services = useAppSelector((state: RootState) => state.services.services || []);
  const booking = useAppSelector((state: RootState) => state.booking);
  const availabilityState = useAppSelector((state: RootState) => state.availability);
  const { data: availability, loading: availabilityLoading } = availabilityState;

  const { step, service, date, time, vehicle, customer } = booking;
  const preselectedId = (location.state as { serviceId?: string })?.serviceId;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const addDays = (base: Date, n: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + n);
    return d;
  };

  const next7 = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = addDays(today, i);
      return {
        date: d,
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
      };
    });
  }, [today]);

  const [slotsForSelectedDate, setSlotsForSelectedDate] = useState<{ time: string; available: boolean }[]>([]);
  const [exhaustedDates, setExhaustedDates] = useState<string[]>([]);

  // ----------------------------
  // Fetch Data
  // ----------------------------
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (preselectedId && !service && services.length > 0) {
      const pre = services.find((s) => s._id === preselectedId);
      if (pre) dispatch(selectService(pre));
    }
  }, [preselectedId, dispatch, service, services]);

  // Fetch unavailable (exhausted) dates from backend
  useEffect(() => {
    const fetchExhaustedDates = async () => {
      try {
        const from = today.toISOString().slice(0, 10);
        const to = addDays(today, 7).toISOString().slice(0, 10);
        const { data } = await axios.get(`/api/bookings/exhausted`, {
          params: { from, to },
        });
        setExhaustedDates(data || []);
      } catch (err) {
        console.error("Error fetching exhausted dates:", err);
      }
    };
    fetchExhaustedDates();
  }, [today]);

  // Fetch available slots for selected date
  useEffect(() => {
    const fetchSlots = async () => {
      if (!service?._id || !date) return;
      try {
        const { data } = await axios.get(`/api/bookings/slots`, {
          params: { serviceId: service._id, date },
        });
        setSlotsForSelectedDate(data || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };
    fetchSlots();
  }, [service?._id, date]);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleNext = () => {
    if (step === 0 && !service?._id) return;
    if (step === 1 && (!date || !time)) return;
    if (step === 2 && !customer.name) return;
    dispatch(setStep(step + 1));
  };

  const handleConfirm = async () => {
    if (!service || !date || !time || !customer.name || !customer.phone) return;

    try {
      const bookingData = {
        serviceId: service._id,
        date,
        time,
        vehicle,
        customer,
      };
      const { data } = await axios.post(`http://localhost:4000/api/bookings`, bookingData);
      navigate("/summary", { state: { booking: data } });
      dispatch(resetBooking());
    } catch (err) {
      console.error("Booking creation failed:", err);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const isDateExhausted = (iso: string) => exhaustedDates.includes(iso);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <DarkVeil />
      <div className="absolute inset-0 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white/6 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Book a Service</h1>

          {/* Stepper */}
          <div className="flex items-center gap-4 mb-6">
            {["Service", "Date & Time", "Vehicle & Contact", "Confirm"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                    i === step
                      ? "bg-sky-600 text-white"
                      : i < step
                      ? "bg-green-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="text-sm text-white/90">{label}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* Step 0 - Service Selection */}
            {step === 0 && (
              <motion.div key="step-service" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-lg font-semibold mb-3">Choose a Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s) => {
                    const isSelected = service?._id === s._id;
                    return (
                      <button
                        key={s._id}
                        onClick={() => dispatch(selectService(s))}
                        className={`p-4 rounded-xl transition text-left ${
                          isSelected ? "ring-2 ring-sky-500 bg-sky-600/20" : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-lg font-medium">{s.title}</div>
                            <div className="text-sm text-gray-400">{s.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">R {s.price}</div>
                            <div className="text-sm">{s.duration} mins</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 1 - Date & Time */}
            {step === 1 && (
              <motion.div key="step-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-lg font-semibold mb-3">Pick a Date</h2>
                {availabilityLoading ? (
                  <div className="text-sm text-gray-400">Loading availability...</div>
                ) : (
                  <>
                    <div className="flex gap-3 mb-4 overflow-auto">
                      {next7.map((d) => {
                        const disabled = isDateExhausted(d.iso);
                        return (
                          <button
                            key={d.iso}
                            disabled={disabled}
                            onClick={() => !disabled && dispatch(selectDate(d.iso))}
                            className={`min-w-[90px] p-3 rounded-lg text-left ${
                              date === d.iso ? "ring-2 ring-sky-500 bg-white/6" : "bg-white/3 hover:bg-white/6"
                            } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <div className="text-sm">{d.weekday}</div>
                            <div className="text-sm font-medium">{d.iso}</div>
                            {disabled && <div className="text-xs mt-1">Unavailable</div>}
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Available time slots</h3>
                      {date ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {slotsForSelectedDate.map((slot) => (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => slot.available && dispatch(selectTime(slot.time))}
                              className={`p-2 rounded-lg text-sm ${
                                time === slot.time
                                  ? "bg-sky-600 text-white"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              } ${!slot.available ? "opacity-40 cursor-not-allowed" : ""}`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Select a date first</div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2 - Vehicle & Contact */}
            {step === 2 && (
              <motion.div key="step-vehicle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-lg font-semibold mb-3">Vehicle & Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Vehicle Details</h3>
                    {["make", "model", "year", "color", "plate"].map((key) => (
                      <input
                        key={key}
                        placeholder={key}
                        value={(vehicle as any)[key] || ""}
                        onChange={(e) => dispatch(updateVehicle({ [key]: e.target.value }))}
                        className="w-full p-2 mb-2 rounded bg-white/5 text-white"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact</h3>
                    {["name", "phone", "email"].map((key) => (
                      <input
                        key={key}
                        placeholder={key}
                        value={(customer as any)[key] || ""}
                        onChange={(e) => dispatch(updateCustomer({ [key]: e.target.value }))}
                        className="w-full p-2 mb-2 rounded bg-white/5 text-white"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 - Confirm */}
            {step === 3 && (
              <motion.div key="step-confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-lg font-semibold mb-3">Confirm Booking</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Service</div>
                    <div className="font-medium">{service?.title || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Date & Time</div>
                    <div className="font-medium">{date || "-"} {time ? `@ ${time}` : ""}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Vehicle</div>
                    <div className="font-medium">
                      {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.plate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Contact</div>
                    <div className="font-medium">
                      {customer.name} — {customer.phone} — {customer.email}
                    </div>
                  </div>
                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={handleConfirm}
                      disabled={!service || !date || !time || !customer.name}
                      className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => dispatch(setStep(2))}
                      className="px-4 py-2 bg-white/5 text-white rounded"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            {step > 0 && (
              <button
                onClick={() => dispatch(setStep(step - 1))}
                className="px-3 py-1 bg-white/5 rounded text-white"
              >
                Back
              </button>
            )}
            <div className="flex gap-2">
              {step < 3 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-sky-600 text-white rounded"
                >
                  Next
                </button>
              )}
              <button
                onClick={() => navigate("/", { replace: true })}
                className="px-4 py-2 bg-white/5 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
