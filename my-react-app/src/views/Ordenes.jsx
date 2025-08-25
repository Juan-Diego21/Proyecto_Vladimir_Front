import React, { useState } from 'react';
import Card from '../components/UI/Card';
import AddCard from '../components/UI/AddCard';
import Modal from '../components/UI/Modal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import OrdenForm from '../components/Forms/OrdenForm';
import useModal from '../hooks/useModal';
import useConfirmDialog from '../hooks/useConfirmDialog';

// Datos mock temporales para órdenes
const mockOrdenes = [
  {
    idOrden: 1,
    idProducto: 1,
    idCliente: 1,
    precioUnitario: 2.50,
    tipoPresentacion: 'Six pack',
    cantidad: 10,
    fechaOrden: '2024-01-15',
    numeroOrden: 'ORD-001',
    total: 25.00
  },
  {
    idOrden: 2,
    idProducto: 2,
    idCliente: 2,
    precioUnitario: 15.99,
    tipoPresentacion: 'Botella',
    cantidad: 5,
    fechaOrden: '2024-01-16',
    numeroOrden: 'ORD-002',
    total: 79.95
  }
];

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState(mockOrdenes);
  const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();
  const { isOpen: isDialogOpen, dialogData, openDialog, closeDialog } = useConfirmDialog();

  const handleAddOrden = () => {
    openModal();
  };

  const handleEdit = (orden) => {
    openModal(orden);
  };

  const handleDeleteClick = (orden) => {
    openDialog({
      orden: orden,
      message: `¿Estás seguro de que quieres eliminar la orden "${orden.numeroOrden}"?`,
      confirmText: 'Eliminar',
      type: 'danger'
    });
  };

  const handleDeleteConfirm = () => {
    if (dialogData && dialogData.orden) {
      setOrdenes(prev => prev.filter(o => o.idOrden !== dialogData.orden.idOrden));
    }
    closeDialog();
  };

  const handleSubmit = (formData) => {
    if (modalData) {
      setOrdenes(prev => prev.map(o => 
        o.idOrden === modalData.idOrden ? { ...modalData, ...formData } : o
      ));
    } else {
      const newOrden = {
        idOrden: Math.max(...ordenes.map(o => o.idOrden)) + 1,
        ...formData,
        total: formData.precioUnitario * formData.cantidad
      };
      setOrdenes(prev => [...prev, newOrden]);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Órdenes</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">{ordenes.length} órdenes registradas</p>
          <p className="text-green-600 font-semibold">
            Total: ${ordenes.reduce((sum, orden) => sum + orden.total, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ordenes.map((orden) => (
          <Card key={orden.idOrden} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {orden.numeroOrden}
                </h3>
                <p className="text-sm text-gray-500">ID: {orden.idOrden}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {orden.fechaOrden}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Producto ID:</p>
                <p>{orden.idProducto}</p>
              </div>
              <div>
                <p className="font-medium">Cliente ID:</p>
                <p>{orden.idCliente}</p>
              </div>
              <div>
                <p className="font-medium">Presentación:</p>
                <p>{orden.tipoPresentacion}</p>
              </div>
              <div>
                <p className="font-medium">Cantidad:</p>
                <p>{orden.cantidad}</p>
              </div>
              <div>
                <p className="font-medium">Precio Unitario:</p>
                <p>${orden.precioUnitario}</p>
              </div>
              <div>
                <p className="font-medium">Total:</p>
                <p className="text-green-600 font-semibold">${orden.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(orden)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteClick(orden)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
          </Card>
        ))}

        <AddCard 
          onClick={handleAddOrden}
          label="Añadir orden"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData ? 'Editar Orden' : 'Crear Nueva Orden'}
        className="max-w-2xl"
      >
        <OrdenForm
          orden={modalData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Orden"
        message={dialogData?.message}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  );
};

export default Ordenes;