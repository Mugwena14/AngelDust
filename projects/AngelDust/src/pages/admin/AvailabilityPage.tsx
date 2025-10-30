import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAvailability,
  clearAvailabilityError,
} from "@/store/slices/availabilitySlice";
import { Loader2 } from "lucide-react";

export default function AvailabilityPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((s) => s.availability);

  const [form, setForm] = useState({
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    start: "09:00",
    end: "17:00",
    slotsPerHour: 2,
  });

  // 🔹 Load availability on mount
  useEffect(() => {
    dispatch(fetchAvailability());
  }, [dispatch]);

  // 🔹 Sync with store data
  useEffect(() => {
    if (data) {
      setForm({
        workingDays: data.workingDays || form.workingDays,
        start: data.workingHours?.start || form.start,
        end: data.workingHours?.end || form.end,
        slotsPerHour: data.slotsPerHour || form.slotsPerHour,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 🔹 Update field handler
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Save handler


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Availability Management</h1>

      <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md space-y-6">
        <div>
          <Label className="text-gray-300">Working Days</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (day) => (
                <button
                  key={day}
                  onClick={() =>
                    handleChange(
                      "workingDays",
                      form.workingDays.includes(day)
                        ? form.workingDays.filter((d) => d !== day)
                        : [...form.workingDays, day]
                    )
                  }
                  className={`px-3 py-1 rounded-xl border text-sm ${
                    form.workingDays.includes(day)
                      ? "bg-white text-black"
                      : "border-white/20 text-gray-400"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">Start Time</Label>
            <Input
              type="time"
              value={form.start}
              onChange={(e) => handleChange("start", e.target.value)}
              className="bg-black/40 text-white border-white/20 mt-1"
            />
          </div>
          <div>
            <Label className="text-gray-300">End Time</Label>
            <Input
              type="time"
              value={form.end}
              onChange={(e) => handleChange("end", e.target.value)}
              className="bg-black/40 text-white border-white/20 mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-gray-300">Slots per Hour</Label>
          <Input
            type="number"
            min={1}
            value={form.slotsPerHour}
            onChange={(e) => handleChange("slotsPerHour", Number(e.target.value))}
            className="bg-black/40 text-white border-white/20 mt-1 w-32"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm border border-red-400/30 bg-red-900/20 rounded-lg p-2">
            {error}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            disabled={loading}
            className="bg-white text-black hover:bg-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
