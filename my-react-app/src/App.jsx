import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Productos from './views/Productos';
import Clientes from './views/Clientes';
import Proveedores from './views/Proveedores';
import Ordenes from './views/Ordenes';

// Vistas
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
    <p className="text-gray-600">Bienvenido al sistema de gestión de inventario</p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-semibold text-gray-800">Productos</h3>
        <p className="text-2xl font-bold text-blue-600">15</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-semibold text-gray-800">Clientes</h3>
        <p className="text-2xl font-bold text-green-600">8</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-semibold text-gray-800">Proveedores</h3>
        <p className="text-2xl font-bold text-purple-600">5</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="font-semibold text-gray-800">Órdenes</h3>
        <p className="text-2xl font-bold text-orange-600">12</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="ordenes" element={<Ordenes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;