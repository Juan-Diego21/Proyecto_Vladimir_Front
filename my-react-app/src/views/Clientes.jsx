import React, { useState } from 'react';
import Card from '../components/UI/Card';
import AddCard from '../components/UI/AddCard';
import Modal from '../components/UI/Modal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import ClienteForm from '../components/Forms/ClienteForm';
import useModal from '../hooks/useModal';
import useConfirmDialog from '../hooks/useConfirmDialog';

// Datos mock temporales para clientes
const mockClientes = [
  {
    id: 1,
    primerNombre: 'María',
    apellidos: 'García López',
    ciudad: 'Madrid',
    pais: 'España',
    telefono: '+34 912 345 678'
  },
  {
    id: 2,
    primerNombre: 'Carlos',
    apellidos: 'Rodríguez Martínez',
    ciudad: 'Barcelona',
    pais: 'España',
    telefono: '+34 933 456 789'
  },
  {
    id: 3,
    primerNombre: 'Ana',
    apellidos: 'Fernández Sánchez',
    ciudad: 'Valencia',
    pais: 'España',
    telefono: '+34 963 123 456'
  }
];

const Clientes = () => {
  const [clientes, setClientes] = useState(mockClientes);
  const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();
  const { isOpen: isDialogOpen, dialogData, openDialog, closeDialog } = useConfirmDialog();

  const handleAddCliente = () => {
    openModal();
  };

  const handleEdit = (cliente) => {
    openModal(cliente);
  };

  const handleDeleteClick = (cliente) => {
    openDialog({
      cliente: cliente,
      message: `¿Estás seguro de que quieres eliminar al cliente "${cliente.primerNombre} ${cliente.apellidos}"?`,
      confirmText: 'Eliminar',
      type: 'danger'
    });
  };

  const handleDeleteConfirm = () => {
    if (dialogData && dialogData.cliente) {
      setClientes(prev => prev.filter(c => c.id !== dialogData.cliente.id));
    }
    closeDialog();
  };

  const handleSubmit = (formData) => {
    if (modalData) {
      setClientes(prev => prev.map(c => 
        c.id === modalData.id ? { ...modalData, ...formData } : c
      ));
    } else {
      const newCliente = {
        id: Math.max(...clientes.map(c => c.id)) + 1,
        ...formData
      };
      setClientes(prev => [...prev, newCliente]);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <p className="text-gray-600">{clientes.length} clientes registrados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clientes.map((cliente) => (
          <Card key={cliente.id} className="p-4 flex flex-col">
            <div className="flex-1">
              <span className="text-sm text-gray-500 block mb-2">ID: {cliente.id}</span>
              
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {cliente.primerNombre} {cliente.apellidos}
              </h3>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="w-16 font-medium">Ciudad:</span>
                  <span>{cliente.ciudad}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-16 font-medium">País:</span>
                  <span>{cliente.pais}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-16 font-medium">Teléfono:</span>
                  <span className="font-medium">{cliente.telefono}</span>
                </p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(cliente)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteClick(cliente)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
          </Card>
        ))}

        <AddCard 
          onClick={handleAddCliente}
          label="Añadir cliente"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}
      >
        <ClienteForm
          cliente={modalData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Cliente"
        message={dialogData?.message}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  );
};

export default Clientes;