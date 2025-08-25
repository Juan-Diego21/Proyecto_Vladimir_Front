import React, { useState } from 'react';
import Card from '../components/UI/Card';
import AddCard from '../components/UI/AddCard';
import Modal from '../components/UI/Modal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import ProveedorForm from '../components/Forms/ProveedorForm';
import useModal from '../hooks/useModal';
import useConfirmDialog from '../hooks/useConfirmDialog';

// Datos mock temporales para proveedores
const mockProveedores = [
  {
    id: 1,
    nombreCompania: 'Cervezas Alhambra',
    nombreContacto: 'Juan Martínez',
    ciudad: 'Granada',
    pais: 'España',
    telefono: '+34 958 123 456',
    fax: '+34 958 123 457'
  },
  {
    id: 2,
    nombreCompania: 'Bodegas Rioja',
    nombreContacto: 'María López',
    ciudad: 'Logroño',
    pais: 'España',
    telefono: '+34 941 234 567',
    fax: '+34 941 234 568'
  }
];

const Proveedores = () => {
  const [proveedores, setProveedores] = useState(mockProveedores);
  const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();
  const { isOpen: isDialogOpen, dialogData, openDialog, closeDialog } = useConfirmDialog();

  const handleAddProveedor = () => {
    openModal();
  };

  const handleEdit = (proveedor) => {
    openModal(proveedor);
  };

  const handleDeleteClick = (proveedor) => {
    openDialog({
      proveedor: proveedor,
      message: `¿Estás seguro de que quieres eliminar al proveedor "${proveedor.nombreCompania}"?`,
      confirmText: 'Eliminar',
      type: 'danger'
    });
  };

  const handleDeleteConfirm = () => {
    if (dialogData && dialogData.proveedor) {
      setProveedores(prev => prev.filter(p => p.id !== dialogData.proveedor.id));
    }
    closeDialog();
  };

  const handleSubmit = (formData) => {
    if (modalData) {
      setProveedores(prev => prev.map(p => 
        p.id === modalData.id ? { ...modalData, ...formData } : p
      ));
    } else {
      const newProveedor = {
        id: Math.max(...proveedores.map(p => p.id)) + 1,
        ...formData
      };
      setProveedores(prev => [...prev, newProveedor]);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Proveedores</h1>
        <p className="text-gray-600">{proveedores.length} proveedores registrados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proveedores.map((proveedor) => (
          <Card key={proveedor.id} className="p-4 flex flex-col">
            <div className="flex-1">
              <span className="text-sm text-gray-500 block mb-2">ID: {proveedor.id}</span>
              
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {proveedor.nombreCompania}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Contacto:</span> {proveedor.nombreContacto}</p>
                <p><span className="font-medium">Ubicación:</span> {proveedor.ciudad}, {proveedor.pais}</p>
                <p><span className="font-medium">Teléfono:</span> {proveedor.telefono}</p>
                {proveedor.fax && <p><span className="font-medium">Fax:</span> {proveedor.fax}</p>}
              </div>
            </div>

            <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(proveedor)}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteClick(proveedor)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
          </Card>
        ))}

        <AddCard 
          onClick={handleAddProveedor}
          label="Añadir proveedor"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData ? 'Editar Proveedor' : 'Añadir Nuevo Proveedor'}
      >
        <ProveedorForm
          proveedor={modalData}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Proveedor"
        message={dialogData?.message}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  );
};

export default Proveedores;