import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null); // Track which card is open

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`/api/bookings/${id}/status`, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

      {loading ? (
        <p className="text-gray-400">Loading bookings...</p>
      ) : (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card className="p-6 bg-black/50 border-white/10">
              <p className="text-gray-400">No bookings found.</p>
            </Card>
          ) : (
            bookings.map((b) => (
              <Card
                key={b._id}
                className="p-4 bg-black/50 border-white/10 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{b.customer?.name}</p>
                    <p className="text-sm text-gray-400">
                      {b.service?.name} — {b.date} at {b.time}
                    </p>
                    <p className="text-xs text-gray-500">Status: {b.status}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <select
                      className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm"
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleExpand(b._id)}
                    >
                      {expanded === b._id ? "Hide Details" : "View Details"}
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteBooking(b._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expanded === b._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 border-t border-white/10 pt-3 text-sm text-gray-300"
                    >
                      <p>
                        <strong>Service Title:</strong> {b.service?.name}
                      </p>
                      <p>
                        <strong>Service Price:</strong>{" "}
                        {b.service?.price ? `R${b.service.price}` : "N/A"}
                      </p>
                      <p>
                        <strong>Customer Phone:</strong> {b.customer?.phone}
                      </p>
                      {b.customer?.email && (
                        <p>
                          <strong>Email:</strong> {b.customer.email}
                        </p>
                      )}
                      {b.vehicle && (
                        <p>
                          <strong>Vehicle:</strong>{" "}
                          {b.vehicle.make || ""} {b.vehicle.model || ""}{" "}
                          {b.vehicle.plate || ""}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Booking ID: {b._id}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
