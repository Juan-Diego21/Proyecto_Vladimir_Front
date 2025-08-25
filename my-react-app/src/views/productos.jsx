import React, { useState } from 'react';
import Card from '../components/UI/Card';
import AddCard from '../components/UI/AddCard';
import Modal from '../components/UI/Modal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import ProductForm from '../components/Forms/ProductForm';
import useModal from '../hooks/useModal';
import useConfirmDialog from '../hooks/useConfirmDialog';

// Datos mock temporales para productos
const mockProductos = [
  {
    id: 1,
    nombreProducto: 'Cerveza Lager',
    idProveedor: 101,
    precioUnitario: 2.50,
    tipoPresentacion: 'Six pack',
    estaDescontinuado: false
  },
  {
    id: 2,
    nombreProducto: 'Vino Tinto',
    idProveedor: 102,
    precioUnitario: 15.99,
    tipoPresentacion: 'Botella',
    estaDescontinuado: false
  },
  {
    id: 3,
    nombreProducto: 'Whisky',
    idProveedor: 103,
    precioUnitario: 35.50,
    tipoPresentacion: 'Botella',
    estaDescontinuado: true
  }
];

const Productos = () => {
  const [productos, setProductos] = useState(mockProductos);
  const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();
  const { isOpen: isDialogOpen, dialogData, openDialog, closeDialog } = useConfirmDialog();

  const handleAddProducto = () => {
    openModal(); // Abrir modal sin datos (creación)
  };

  const handleEdit = (producto) => {
    openModal(producto); // Abrir modal con datos del producto
  };

  const handleDeleteClick = (producto) => {
    openDialog({
      product: producto,
      message: `¿Estás seguro de que quieres eliminar el producto "${producto.nombreProducto}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      type: 'danger'
    });
  };

  const handleDeleteConfirm = () => {
    if (dialogData && dialogData.product) {
      setProductos(prev => prev.filter(p => p.id !== dialogData.product.id));
      console.log('Producto eliminado:', dialogData.product);
    }
    closeDialog();
  };

  const handleSubmit = (formData) => {
    if (modalData) {
      // Editar producto existente
      setProductos(prev => prev.map(p => 
        p.id === modalData.id ? { ...modalData, ...formData } : p
      ));
      console.log('Producto actualizado:', formData);
    } else {
      // Crear nuevo producto
      const newProduct = {
        id: Math.max(...productos.map(p => p.id)) + 1,
        ...formData
      };
      setProductos(prev => [...prev, newProduct]);
      console.log('Producto creado:', newProduct);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">{productos.length} productos encontrados</p>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="text-sm text-gray-600">
              {productos.filter(p => !p.estaDescontinuado).length} activos
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="text-sm text-gray-600">
              {productos.filter(p => p.estaDescontinuado).length} descontinuados
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <Card key={producto.id} className="p-4 flex flex-col hover:shadow-lg transition-shadow">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-gray-500">ID: {producto.id}</span>
                {producto.estaDescontinuado ? (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Descontinuado
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Activo
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {producto.nombreProducto}
              </h3>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="w-20 font-medium">Proveedor:</span>
                  <span>#{producto.idProveedor}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-20 font-medium mr-4">Presentación:</span>
                  <span>{producto.tipoPresentacion}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-20 font-medium">Precio:</span>
                  <span className="font-semibold text-green-600">
                    ${producto.precioUnitario.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(producto)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md 
                  hover:bg-blue-600 transition-colors text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Editar ${producto.nombreProducto}`}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteClick(producto)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md 
                  hover:bg-red-600 transition-colors text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Eliminar ${producto.nombreProducto}`}
              >
                Eliminar
              </button>
            </div>
          </Card>
        ))}

        {/* Tarjeta para añadir nuevo producto */}
        <AddCard 
          onClick={handleAddProducto}
          label="Añadir producto"
        />
      </div>

      {/* Modal para añadir/editar producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData ? 'Editar Producto' : 'Añadir Nuevo Producto'}
      >
        <ProductForm
          product={modalData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      {/* Diálogo de confirmación para eliminar */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Producto"
        message={dialogData?.message || "¿Estás seguro de que quieres eliminar este producto?"}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default Productos;