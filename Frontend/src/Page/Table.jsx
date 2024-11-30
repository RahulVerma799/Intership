import React, { useContext } from 'react';
import demoData from './asst/asset';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../Context/AuthContext'; 

const Table = () => {
  const navigate = useNavigate(); 
  const { logout } = useContext(AuthContext); 

  
  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <div className="container mx-auto mt-8">
     
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">#</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Photo</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Date Created</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {demoData.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={user.img[0]}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.dateCreated}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : user.status === 'Suspended'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="mr-2 px-4 py-2 text-white rounded">⚙️</button>
                  <button className="px-4 py-2 text-white rounded">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
