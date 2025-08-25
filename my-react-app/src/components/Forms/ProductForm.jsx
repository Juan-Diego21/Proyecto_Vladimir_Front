import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    idProveedor: '',
    precioUnitario: '',
    tipoPresentacion: '',
    estaDescontinuado: false
  });

  const [errors, setErrors] = useState({});

  // Cargar datos si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        nombreProducto: product.nombreProducto || '',
        idProveedor: product.idProveedor || '',
        precioUnitario: product.precioUnitario || '',
        tipoPresentacion: product.tipoPresentacion || '',
        estaDescontinuado: product.estaDescontinuado || false
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo al modificar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreProducto.trim()) {
      newErrors.nombreProducto = 'El nombre del producto es requerido';
    }

    if (!formData.idProveedor) {
      newErrors.idProveedor = 'El ID del proveedor es requerido';
    } else if (isNaN(formData.idProveedor)) {
      newErrors.idProveedor = 'Debe ser un número válido';
    }

    if (!formData.precioUnitario) {
      newErrors.precioUnitario = 'El precio es requerido';
    } else if (isNaN(formData.precioUnitario) || formData.precioUnitario <= 0) {
      newErrors.precioUnitario = 'Debe ser un precio válido';
    }

    if (!formData.tipoPresentacion) {
      newErrors.tipoPresentacion = 'La presentación es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        idProveedor: parseInt(formData.idProveedor),
        precioUnitario: parseFloat(formData.precioUnitario)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre del Producto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Producto *
        </label>
        <input
          type="text"
          name="nombreProducto"
          value={formData.nombreProducto}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none 
            focus:ring-2 focus:ring-blue-500 ${
            errors.nombreProducto ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Cerveza Lager"
        />
        {errors.nombreProducto && (
          <p className="text-red-500 text-sm mt-1">{errors.nombreProducto}</p>
        )}
      </div>

      {/* ID Proveedor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ID Proveedor *
        </label>
        <input
          type="number"
          name="idProveedor"
          value={formData.idProveedor}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none 
            focus:ring-2 focus:ring-blue-500 ${
            errors.idProveedor ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: 101"
        />
        {errors.idProveedor && (
          <p className="text-red-500 text-sm mt-1">{errors.idProveedor}</p>
        )}
      </div>

      {/* Precio Unitario */}
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
          className={`w-full px-3 py-2 border rounded-md focus:outline-none 
            focus:ring-2 focus:ring-blue-500 ${
            errors.precioUnitario ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: 2.50"
        />
        {errors.precioUnitario && (
          <p className="text-red-500 text-sm mt-1">{errors.precioUnitario}</p>
        )}
      </div>

      {/* Tipo de Presentación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Presentación *
        </label>
        <select
          name="tipoPresentacion"
          value={formData.tipoPresentacion}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none 
            focus:ring-2 focus:ring-blue-500 ${
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
        {errors.tipoPresentacion && (
          <p className="text-red-500 text-sm mt-1">{errors.tipoPresentacion}</p>
        )}
      </div>

      {/* Checkbox Descontinuado */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="estaDescontinuado"
          checked={formData.estaDescontinuado}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Producto descontinuado
        </label>
      </div>

      {/* Botones */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md 
            hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md 
            hover:bg-blue-600 transition-colors"
        >
          {product ? 'Actualizar' : 'Crear'} Producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;