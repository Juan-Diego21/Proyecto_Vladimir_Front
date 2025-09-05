import React, { useState, useEffect } from "react";
import Card from "../components/UI/Card";
import AddCard from "../components/UI/AddCard";
import Modal from "../components/UI/Modal";
import ConfirmDialog from "../components/UI/ConfirmDialog";
import ProductForm from "../components/Forms/ProductForm";
import useModal from "../hooks/useModal";
import useConfirmDialog from "../hooks/useConfirmDialog";
import { apiService } from "../services/apiService";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();
  const {
    isOpen: isDialogOpen,
    dialogData,
    openDialog,
    closeDialog,
  } = useConfirmDialog();

  // Función para formatear precio
  const formatPrice = (price) => {
    if (price === null || price === undefined) return "N/A";
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "N/A";
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(numericPrice);
  };

  // Función para convertir booleano a texto Sí/No
  const formatDiscontinued = (isDiscontinued) => {
    return isDiscontinued ? "Sí" : "No";
  };

  // Función para mapear los datos de la API
  const mapApiProductToFrontend = (apiProduct) => {
    return {
      id: apiProduct.id,
      nombreProducto: apiProduct.productName || "Sin nombre",
      idProveedor: apiProduct.supplierId || "N/A",
      precioUnitario: apiProduct.unitPrice || 0,
      tipoPresentacion: apiProduct.package || "No especificado",
      estaDescontinuado: apiProduct.isDiscontinued || false,
    };
  };

  // Cargar productos desde la API
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await apiService.getProducts();

      let actualProducts = [];
      if (Array.isArray(productsData)) {
        actualProducts = productsData;
      } else if (productsData?.data) {
        actualProducts = productsData.data;
      } else if (productsData?.products) {
        actualProducts = productsData.products;
      }

      const mappedProducts = actualProducts.map(mapApiProductToFrontend);
      setProductos(mappedProducts);
    } catch (err) {
      const errorMsg =
        "Error al cargar los productos: " +
        (err.message || "Error desconocido");
      setError(errorMsg);
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddProducto = () => {
    openModal();
  };

  const handleEditarProducto = (producto) => {
    openModal(producto);
  };

  const handleEliminarProducto = (producto) => {
    openDialog({
      product: producto,
      message: `¿Estás seguro de que quieres eliminar el producto "${producto.nombreProducto}"? Esta acción no se puede deshacer.`,
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      type: "danger",
    });
  };

  const handleConfirmarEliminacion = async () => {
    if (!dialogData?.product) return;

    try {
      setOperationLoading(true);
      await apiService.deleteProduct(dialogData.product.id);

      setSuccessMessage(
        `Producto "${dialogData.product.nombreProducto}" eliminado exitosamente`
      );
      await loadProducts(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError(
        "Error al eliminar el producto: " +
          (error.message || "Error desconocido")
      );
    } finally {
      setOperationLoading(false);
      closeDialog();
    }
  };

  const handleSubmitProducto = async (formData) => {
    try {
      setOperationLoading(true);

      // Mapear a formato de API
      const apiData = {
        productName: formData.nombreProducto,
        supplierId: parseInt(formData.idProveedor),
        unitPrice: parseFloat(formData.precioUnitario),
        package: formData.tipoPresentacion,
        isDiscontinued: formData.estaDescontinuado,
      };

      if (modalData) {
        // Editar producto existente
        await apiService.updateProduct(modalData.id, apiData);
        setSuccessMessage(
          `Producto "${formData.nombreProducto}" actualizado exitosamente`
        );
      } else {
        // Crear nuevo producto
        await apiService.createProduct(apiData);
        setSuccessMessage(
          `Producto "${formData.nombreProducto}" creado exitosamente`
        );
      }

      await loadProducts(); // Recargar la lista
      closeModal();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setError(
        "Error al guardar el producto: " +
          (error.message || "Error desconocido")
      );
    } finally {
      setOperationLoading(false);
    }
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Cargando productos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <p className="text-gray-600">
          {productos.length} productos encontrados
        </p>
      </div>

      {/* Mensajes de éxito y error */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Éxito:</strong> {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <Card
            key={producto.id}
            className="p-4 flex flex-col hover:shadow-lg transition-shadow"
          >
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-gray-500">ID: {producto.id}</span>
                {producto.estaDescontinuado && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Descontinuado
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {producto.nombreProducto}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex justify-between">
                  <span className="font-medium">ID Proveedor:</span>
                  <span>{producto.idProveedor}</span>
                </p>

                <p className="flex justify-between">
                  <span className="font-medium">Precio unitario:</span>
                  <span className="font-semibold text-green-600">
                    {formatPrice(producto.precioUnitario)}
                  </span>
                </p>

                <p className="flex justify-between">
                  <span className="font-medium">Tipo de paquete:</span>
                  <span>{producto.tipoPresentacion}</span>
                </p>

                <p className="flex justify-between">
                  <span className="font-medium">¿Está descontinuado?</span>
                  <span
                    className={
                      producto.estaDescontinuado
                        ? "text-red-600 font-medium"
                        : "text-green-600"
                    }
                  >
                    {formatDiscontinued(producto.estaDescontinuado)}
                  </span>
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => handleEditarProducto(producto)}
                disabled={operationLoading}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminarProducto(producto)}
                disabled={operationLoading}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
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
          disabled={operationLoading}
        />
      </div>

      {/* Modal para añadir/editar producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData ? "Editar Producto" : "Añadir Nuevo Producto"}
      >
        <ProductForm
          product={modalData}
          onSubmit={handleSubmitProducto}
          onCancel={closeModal}
          loading={operationLoading}
        />
      </Modal>

      {/* Diálogo de confirmación para eliminar */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleConfirmarEliminacion}
        title="Eliminar Producto"
        message={dialogData?.message}
        confirmText={operationLoading ? "Eliminando..." : "Sí, eliminar"}
        cancelText="Cancelar"
        type="danger"
        loading={operationLoading}
      />
    </div>
  );
};

export default Productos;
