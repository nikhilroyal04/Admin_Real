import React from 'react'

function UserList() {
  return (
    <div>
       <h1>{UserList} UserList</h1>
    </div>
  )
}

export default UserList




// import React, { useEffect, useState } from 'react';

// function Roles() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('https://api.example.com/users'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Roles</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li> // Adjust based on your user data structure
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Roles;
