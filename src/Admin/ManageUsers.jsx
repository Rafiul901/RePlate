import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (email, role) => {
    const confirm = await Swal.fire({
      title: `Make user ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(`http://localhost:3000/users/${email}/role`, { role });
        await fetchUsers();
        Swal.fire('Success!', `User role updated to ${role}.`, 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to update role.', 'error');
      }
    }
  };

  const deleteUser = async (email) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete user',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/users/${email}`);
        await fetchUsers();
        Swal.fire('Deleted!', 'User has been removed.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete user.', 'error');
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold  mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md  shadow border-2 border-cyan-400">
          <thead className="bg-white  text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4  text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role || 'user'}</td>
                <td className="py-2 px-4 space-x-2 flex flex-wrap gap-1">
                  <button
                    onClick={() => updateRole(user.email, 'admin')}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => updateRole(user.email, 'restaurant')}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    Make Restaurant
                  </button>
                  <button
                    onClick={() => updateRole(user.email, 'charity')}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 text-sm"
                  >
                    Make Charity
                  </button>
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
