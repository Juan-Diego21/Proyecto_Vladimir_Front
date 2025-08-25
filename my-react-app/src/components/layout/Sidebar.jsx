import React, { useState } from 'react';
import { 
  HomeIcon, 
  CubeIcon, 
  UserGroupIcon, 
  TruckIcon, 
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/' },
    { name: 'Productos', icon: CubeIcon, path: '/productos' },
    { name: 'Clientes', icon: UserGroupIcon, path: '/clientes' },
    { name: 'Proveedores', icon: TruckIcon, path: '/proveedores' },
    { name: 'Órdenes', icon: ShoppingCartIcon, path: '/ordenes' },
  ];

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out 
      ${isCollapsed ? 'w-20' : 'w-64'} h-screen flex flex-col`}>
      
      {/* Header del Sidebar */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Inventario</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {isCollapsed ? <Bars3Icon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Items de Navegación */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;