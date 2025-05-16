import React from 'react';
import EventsList from './components/EventsList';
import UsersList from './components/UsersList';
import CreateBooking from './components/CreateBooking';
import BookingsList from './components/BookingsList';





function App() {
  return (
    <div>
      <h1>Eventsystem</h1>
      <EventsList />
      <UsersList />
      <CreateBooking />
      <BookingsList />
    </div>
  );
}

export default App;
