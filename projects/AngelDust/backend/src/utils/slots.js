
// Convert "HH:MM" to total minutes
function timeToMinutes(t) {
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + mm;
}

// Convert total minutes to "HH:MM"
function minutesToTime(m) {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/**
 * Generate slots between start and end using service duration
 * Compute availability based on existing bookings and capacity
 */
export function computeSlots(start, end, service, bookings, capacityPerSlot) {
  const startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);
  const step = service.durationMins || 60; // fallback if durationMins undefined
  const slots = [];

  for (let t = startMin; t + step <= endMin; t += step) {
    const timeStr = minutesToTime(t);
    const booked = bookings.filter((b) => b.time === timeStr).length;
    slots.push({
      time: timeStr,
      available: booked < (service.capacityPerSlot || capacityPerSlot),
      booked,
      capacity: service.capacityPerSlot || capacityPerSlot,
    });
  }

  return slots;
}
