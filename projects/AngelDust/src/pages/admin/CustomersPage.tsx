import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  fetchCustomers,
  fetchCustomerById,
  clearSelectedCustomer,
} from "@/store/slices/customerSlice";

export default function CustomersPage() {
  const dispatch = useDispatch();
  const [exporting, setExporting] = useState(false);

  const selectCustomersState = (state) => state.customers || {};
  const { customers = [], selectedCustomer = null, history = [], loading = false, error = null } =
    useSelector(selectCustomersState);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSelectCustomer = (id) => {
    dispatch(fetchCustomerById(id));
  };

  const handleBack = () => {
    dispatch(clearSelectedCustomer());
  };

  const handleExport = () => {
    setExporting(true);
    try {
      const csvRows = [];
      const headers = ["Name", "Email", "Phone"];
      csvRows.push(headers.join(","));

      customers.forEach((c) => {
        csvRows.push(`${c.name},${c.email},${c.phone}`);
      });

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customers.csv";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

      <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md">
        <p className="text-gray-400 mb-4">
          View all clients, booking history, and export data.
        </p>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {loading && <p className="text-gray-400 mb-4">Loading...</p>}

        {!selectedCustomer ? (
          <>
            <div className="space-y-3 mb-6">
              {customers.map((c) => (
                <div
                  key={c._id}
                  onClick={() => handleSelectCustomer(c._id)}
                  className="cursor-pointer p-3 bg-white/5 hover:bg-white/10 rounded-lg transition"
                >
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.email}</p>
                </div>
              ))}
            </div>
            <Button onClick={handleExport} disabled={exporting}>
              {exporting ? "Exporting..." : "Export to CSV"}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Button onClick={handleBack} variant="outline" className="mb-4">
                ← Back
              </Button>
              <h2 className="text-xl font-semibold mb-2">
                {selectedCustomer.name}'s Booking History
              </h2>
              <p className="text-gray-400 mb-4">
                {selectedCustomer.email} — {selectedCustomer.phone}
              </p>
            </div>

            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((h) => (
                  <div
                    key={h._id}
                    className="p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <p className="font-medium">{h.service?.title}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(h.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No booking history available.</p>
            )}
          </>
        )}
      </Card>
    </motion.div>
  );
}
