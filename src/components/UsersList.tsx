import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5170/api/Users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Kunde inte hämta användare:", err));
  }, []);

  return (
    <div>
      <h2>Användare</h2>
      {users.length === 0 ? (
        <p>Inga användare ännu.</p>
      ) : (
        users.map(user => (
          <div key={user.id}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UsersList;
