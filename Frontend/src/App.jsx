import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import ProtectedRoute from './Context/ProtectedRoute';
import Table from './Page/Table';
import { AuthProvider } from './Context/AuthContext';




const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={ <ProtectedRoute> <Table /> </ProtectedRoute> } />
        
      </Routes>
    
    </AuthProvider>
  );
};

export default App;
