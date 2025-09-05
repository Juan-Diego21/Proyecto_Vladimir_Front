import API_CONFIG from "../config/api";

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Método genérico para realizar peticiones HTTP con mejor manejo de errores
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Log de la request para debugging
    console.log(`API Request: ${config.method || "GET"} ${url}`, {
      payload: options.body ? JSON.parse(options.body) : "No body",
    });

    try {
      const response = await fetch(url, config);

      // Log de la response
      console.log(`API Response: ${response.status} ${response.statusText}`, {
        url: url,
        status: response.status,
        statusText: response.statusText,
      });

      // Manejar diferentes códigos de estado
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: await response.text() };
        }

        const error = new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
        error.status = response.status;
        error.data = errorData;

        throw error;
      }

      // Para respuestas sin contenido
      if (response.status === 204) {
        return { success: true, message: "Operation completed successfully" };
      }

      // Para respuestas con contenido
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Request failed:", {
        url: url,
        error: error.message,
        status: error.status,
        data: error.data,
      });

      // Mejorar el mensaje de error para el usuario
      if (error.status === 500) {
        error.message =
          "Error interno del servidor. Por favor, intente más tarde.";
      }

      throw error;
    }
  }

  // Métodos específicos para Productos con mejor manejo
  async getProducts() {
    return this.request(API_CONFIG.ENDPOINTS.PRODUCTS);
  }

  async getProductById(id) {
    return this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  }

  async createProduct(productData) {
    return this.request(API_CONFIG.ENDPOINTS.PRODUCTS, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    // Asegurar que el ID esté en el payload si el backend lo requiere
    const payload = { ...productData };
    if (!payload.id) {
      payload.id = parseInt(id);
    }

    return this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  async deleteProduct(id) {
    return this.request(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
