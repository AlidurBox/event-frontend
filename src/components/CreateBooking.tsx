import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

type Event = {
  id: number;
  title: string;
};

const CreateBooking = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<number>();
  const [eventId, setEventId] = useState<number>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5170/api/Users")
      .then(res => res.json())
      .then(setUsers);

    fetch("http://localhost:5117/api/Events")
      .then(res => res.json())
      .then(setEvents);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !eventId) {
      setMessage("Välj både användare och event.");
      return;
    }

    fetch("http://localhost:5166/api/Bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId })
    })
      .then(res => {
        if (res.ok) {
          setMessage("Bokning skapad!");
        } else {
          setMessage("Misslyckades att skapa bokning.");
        }
      })
      .catch(() => setMessage("Nätverksfel."));
  };

  return (
    <div>
      <h2>Boka ett event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Användare:</label>
          <select value={userId ?? ""} onChange={e => setUserId(Number(e.target.value))}>
            <option value="">Välj användare</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Event:</label>
          <select value={eventId ?? ""} onChange={e => setEventId(Number(e.target.value))}>
            <option value="">Välj event</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Boka</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateBooking;
