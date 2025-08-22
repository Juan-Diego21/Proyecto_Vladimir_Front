import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, name: "Cerveza Aguila", price: 5000, type: "Six Pack" },
    { id: 2, name: "Gaseosa Postobón", price: 3000, type: "Individual" },
    { id: 3, name: "Agua Cristal", price: 2000, type: "Individual" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
  });

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      type: product.type,
    });
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? { ...selectedProduct, ...formData } : p
      )
    );
    setSelectedProduct(null);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        gap: 4,
        py: 4,
      }}
    >
      {/* Título */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Administrador de Productos
      </Typography>

      {/* Lista de productos */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Precio: ${product.price}
                </Typography>
                <Typography color="text.secondary">
                  Presentación: {product.type}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#ffffff",
                    "&:hover": { backgroundColor: "#ffffff" },
                    borderRadius: 1,
                  }}
                  onClick={() => handleEditClick(product)}
                >
                  Editar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Panel de edición (solo aparece al dar click) */}
      {selectedProduct && (
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 2,
            maxWidth: 500,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Editar Producto
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Precio"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              fullWidth
            />
            <TextField
              select
              label="Presentación"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              fullWidth
            >
              <MenuItem value="Six Pack">Six Pack</MenuItem>
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Caja">Caja</MenuItem>
            </TextField>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#ffffff",
                "&:hover": { backgroundColor: "#ffffff" },
                borderRadius: 1,
              }}
              onClick={handleSave}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default App;
