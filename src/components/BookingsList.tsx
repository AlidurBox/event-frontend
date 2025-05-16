import React, { useEffect, useState } from 'react';

type Booking = {
  id: number;
  userId: number;
  eventId: number;
  createdAt: string;
};

const BookingsList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("http://localhost:5166/api/Bookings")
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Kunde inte hämta bokningar:", err));
  }, []);

  return (
    <div>
      <h2>Bokningar</h2>
      {bookings.length === 0 ? (
        <p>Inga bokningar ännu.</p>
      ) : (
        bookings.map(booking => (
          <div key={booking.id}>
            <p><strong>Användar-ID:</strong> {booking.userId}</p>
            <p><strong>Event-ID:</strong> {booking.eventId}</p>
            <p><strong>Bokad:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsList;
