import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

      <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md">
        <p className="text-gray-400 mb-4">
          View, update or add bookings manually.
        </p>
        <Button variant="secondary">Add Manual Booking</Button>
      </Card>
    </motion.div>
  );
}
