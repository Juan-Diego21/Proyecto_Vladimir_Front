# Sistema de Inventario - Frontend

Frontend moderno para un sistema de gestión de inventario construido con React, React Router y TailwindCSS.

## 🚀 Características

- **Interfaz Moderna**: Diseño minimalista y responsive con TailwindCSS
- **Sidebar Colapsable**: Navegación lateral que se expande/contrae
- **CRUD Completo**: Gestión completa de Productos, Clientes, Proveedores y Órdenes
- **Componentes Reutilizables**: Arquitectura modular y componentes compartidos
- **Validación de Formularios**: Validación en tiempo real con mensajes de error
- **Modales Interactivos**: Interfaces modales para crear y editar registros
- **Confirmación de Acciones**: Diálogos de confirmación para operaciones críticas
- **Datos Mock**: Datos de ejemplo para demostración (listo para integración con API)

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca principal de UI
- **React Router DOM** - Navegación entre vistas
- **TailwindCSS** - Framework de estilos utility-first
- **Heroicons** - Biblioteca de íconos
- **Hooks Personalizados** - Gestión de estado y lógica reutilizable

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── Forms/
│   │   ├── ClienteForm.jsx
│   │   ├── OrdenForm.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProveedorForm.jsx
│   ├── Layout/
│   │   ├── MainLayout.jsx
│   │   └── Sidebar.jsx
│   └── UI/
│       ├── AddCard.jsx
│       ├── Card.jsx
│       ├── ConfirmDialog.jsx
│       └── Modal.jsx
├── hooks/
│   ├── useConfirmDialog.js
│   └── useModal.js
├── views/
│   ├── Clientes.jsx
│   ├── Ordenes.jsx
│   ├── Productos.jsx
│   └── Proveedores.jsx
├── App.jsx
└── main.jsx
```

## 🎯 Vistas Disponibles

### 📊 Dashboard
- Vista principal con resumen de estadísticas
- Accesos rápidos a las diferentes secciones

### 📦 Productos
- **Campos**: ID, Nombre, Proveedor, Precio, Presentación, Estado
- **Operaciones**: Crear, editar, eliminar productos
- **Características**: Marcado de productos descontinuados

### 👥 Clientes
- **Campos**: ID, Nombre, Apellidos, Ciudad, País, Teléfono
- **Operaciones**: Gestión completa de clientes

### 🏢 Proveedores
- **Campos**: ID, Compañía, Contacto, Ubicación, Teléfono, Fax
- **Operaciones**: CRUD completo de proveedores

### 📋 Órdenes
- **Campos**: Número de orden, Producto, Cliente, Cantidad, Precio, Total, Fecha
- **Operaciones**: Crear y gestionar órdenes de compra
- **Cálculos**: Cálculo automático de totales

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd inventory-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 🎨 Personalización

### Colores y Temas
Los colores principales están definidos en TailwindCSS. Puedes personalizar el tema editando `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Componentes
Cada componente está diseñado para ser reutilizable y fácil de modificar. Los componentes principales incluyen:

- **Card**: Contenedor base para tarjetas
- **AddCard**: Tarjeta especial para añadir nuevos items
- **Modal**: Ventana modal reutilizable
- **ConfirmDialog**: Diálogo de confirmación

## 🔌 Integración con Backend

### Preparación para API Real
El proyecto está preparado para integrarse con un backend .NET. Los puntos de integración están marcados con `console.log` que deben ser reemplazados por llamadas API.

### Ejemplo de Integración
```javascript
// En los componentes, reemplazar:
const response = await fetch('/api/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### Variables de Entorno
Crea un archivo `.env` para configurar la API:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
```

## 📱 Responsive Design

El diseño es completamente responsive y se adapta a:
- 📱 Móviles (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## ♿ Accesibilidad

- Navegación por teclado (ESC para cerrar modales)
- Etiquetas ARIA en componentes interactivos
- Contraste adecuado de colores
- Focus states visibles

## 🧪 Testing

### Pruebas de Componentes
```bash
npm test           # Ejecutar tests
npm run test:watch # Modo watch
```

### Coverage
El proyecto incluye configuración para reportes de coverage con Jest.

## 📦 Build y Deploy

### Build de Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

### Deploy
El build genera archivos estáticos en la carpeta `dist/` listos para deployar en:
- Netlify
- Vercel
- GitHub Pages
- Servidores estáticos

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🐛 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Abre un nuevo issue con detalles del problema

## 🔄 Próximas Mejoras

- [ ] Integración real con API .NET
- [ ] Paginación en listas largas
- [ ] Búsqueda y filtros
- [ ] Exportación de datos (PDF, Excel)
- [ ] Gráficos y reportes avanzados
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y de integración
- [ ] Progressive Web App (PWA)

---

**Nota**: Este frontend está diseñado para trabajar con un backend .NET existente. Los datos mock deben ser reemplazados por llamadas reales a la API según las especificaciones del backend.
