import React, { useState, useEffect } from 'react';

const ClienteForm = ({ cliente, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    primerNombre: '',
    apellidos: '',
    ciudad: '',
    pais: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        primerNombre: cliente.primerNombre || '',
        apellidos: cliente.apellidos || '',
        ciudad: cliente.ciudad || '',
        pais: cliente.pais || '',
        telefono: cliente.telefono || ''
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.primerNombre.trim()) {
      newErrors.primerNombre = 'El primer nombre es requerido';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'El país es requerido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primer Nombre *
        </label>
        <input
          type="text"
          name="primerNombre"
          value={formData.primerNombre}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.primerNombre ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.primerNombre && <p className="text-red-500 text-sm mt-1">{errors.primerNombre}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Apellidos *
        </label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.apellidos ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ciudad *
        </label>
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.ciudad ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          País *
        </label>
        <input
          type="text"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.pais ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.pais && <p className="text-red-500 text-sm mt-1">{errors.pais}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.telefono ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          {cliente ? 'Actualizar' : 'Crear'} Cliente
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;