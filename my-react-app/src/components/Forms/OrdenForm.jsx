import React, { useState, useEffect } from 'react';

const OrdenForm = ({ orden, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    idProducto: '',
    idCliente: '',
    precioUnitario: '',
    tipoPresentacion: '',
    cantidad: '',
    fechaOrden: new Date().toISOString().split('T')[0],
    numeroOrden: `ORD-${Math.floor(100 + Math.random() * 900)}`
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (orden) {
      setFormData({
        idProducto: orden.idProducto || '',
        idCliente: orden.idCliente || '',
        precioUnitario: orden.precioUnitario || '',
        tipoPresentacion: orden.tipoPresentacion || '',
        cantidad: orden.cantidad || '',
        fechaOrden: orden.fechaOrden || new Date().toISOString().split('T')[0],
        numeroOrden: orden.numeroOrden || `ORD-${Math.floor(100 + Math.random() * 900)}`
      });
    }
  }, [orden]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.idProducto) {
      newErrors.idProducto = 'El ID del producto es requerido';
    } else if (isNaN(formData.idProducto)) {
      newErrors.idProducto = 'Debe ser un número válido';
    }

    if (!formData.idCliente) {
      newErrors.idCliente = 'El ID del cliente es requerido';
    } else if (isNaN(formData.idCliente)) {
      newErrors.idCliente = 'Debe ser un número válido';
    }

    if (!formData.precioUnitario) {
      newErrors.precioUnitario = 'El precio unitario es requerido';
    } else if (isNaN(formData.precioUnitario) || formData.precioUnitario <= 0) {
      newErrors.precioUnitario = 'Debe ser un precio válido';
    }

    if (!formData.tipoPresentacion) {
      newErrors.tipoPresentacion = 'La presentación es requerida';
    }

    if (!formData.cantidad) {
      newErrors.cantidad = 'La cantidad es requerida';
    } else if (isNaN(formData.cantidad) || formData.cantidad <= 0) {
      newErrors.cantidad = 'Debe ser una cantidad válida';
    }

    if (!formData.fechaOrden) {
      newErrors.fechaOrden = 'La fecha de orden es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        idProducto: parseInt(formData.idProducto),
        idCliente: parseInt(formData.idCliente),
        precioUnitario: parseFloat(formData.precioUnitario),
        cantidad: parseInt(formData.cantidad),
        total: parseFloat(formData.precioUnitario) * parseInt(formData.cantidad)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Producto *
          </label>
          <input
            type="number"
            name="idProducto"
            value={formData.idProducto}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.idProducto ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.idProducto && <p className="text-red-500 text-sm mt-1">{errors.idProducto}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Cliente *
          </label>
          <input
            type="number"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.idCliente ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.idCliente && <p className="text-red-500 text-sm mt-1">{errors.idCliente}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio Unitario *
          </label>
          <input
            type="number"
            step="0.01"
            name="precioUnitario"
            value={formData.precioUnitario}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.precioUnitario ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.precioUnitario && <p className="text-red-500 text-sm mt-1">{errors.precioUnitario}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cantidad ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cantidad && <p className="text-red-500 text-sm mt-1">{errors.cantidad}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Presentación *
          </label>
          <select
            name="tipoPresentacion"
            value={formData.tipoPresentacion}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tipoPresentacion ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccionar presentación</option>
            <option value="Individual">Individual</option>
            <option value="Six pack">Six pack</option>
            <option value="Caja">Caja</option>
            <option value="Botella">Botella</option>
            <option value="Lata">Lata</option>
          </select>
          {errors.tipoPresentacion && <p className="text-red-500 text-sm mt-1">{errors.tipoPresentacion}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Orden *
          </label>
          <input
            type="date"
            name="fechaOrden"
            value={formData.fechaOrden}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fechaOrden ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.fechaOrden && <p className="text-red-500 text-sm mt-1">{errors.fechaOrden}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Orden
        </label>
        <input
          type="text"
          name="numeroOrden"
          value={formData.numeroOrden}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>

      {formData.precioUnitario && formData.cantidad && (
        <div className="p-3 bg-blue-50 rounded-md">
          <p className="text-blue-800 font-semibold">
            Total: ${(parseFloat(formData.precioUnitario) * parseInt(formData.cantidad || 0)).toFixed(2)}
          </p>
        </div>
      )}

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
          {orden ? 'Actualizar' : 'Crear'} Orden
        </button>
      </div>
    </form>
  );
};

export default OrdenForm;