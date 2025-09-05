// Configuración base de la API
const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://webapiordenescompras2025-g7gfbwbne2dbfqbd.canadacentral-01.azurewebsites.net/api",
  TIMEOUT: 10000,
  ENDPOINTS: {
    PRODUCTS: "/products",
    CUSTOMERS: "/customers",
    SUPPLIERS: "/suppliers",
    ORDERS: "/orders",
  },
};

export default API_CONFIG;
