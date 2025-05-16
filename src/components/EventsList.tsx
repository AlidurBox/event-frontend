import React, { useEffect, useState } from 'react';

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:5117/api/Events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Kunde inte hämta event:", err));
  }, []);

  return (
    <div>
      <h2>Event</h2>
      {events.length === 0 ? (
        <p>Inga event ännu.</p>
      ) : (
        events.map(event => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Datum:</strong> {new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EventsList;
