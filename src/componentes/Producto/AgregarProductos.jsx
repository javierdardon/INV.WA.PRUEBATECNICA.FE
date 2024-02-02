
import React, { useState,useEffect } from 'react';
import { Box, Typography, Button, Stack, TextField,MenuItem,Select, } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const productoData = state?.producto || {};
    const isEditing = !!productoData.IdProducto;
    const [marca, setMarca] = useState({ IdMarca: '' });
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        fetch('https://localhost:44351/api/Marca')
            .then((response) => response.json())
            .then((data) => {
                setMarcas(data);
            });

    }, []);


    const handleSubmit = () => {
        if (isEditing) {
            handleActualizar(productoData.IdProducto);
        } else {
            handleCrear();
        }
    };
    // Estados para cada propiedad del producto
    const [codigo, setCodigo] = useState(isEditing ? productoData.Codigo : '');
    const [descripcionProducto, setDescripcionProducto] = useState(isEditing ? productoData.DescripcionProducto : '');
    const [precio, setPrecio] = useState(isEditing ? productoData.Precio : 0);
    const [stock, setStock] = useState(isEditing ? productoData.Stock : 0);
    const [iva, setIva] = useState(isEditing ? productoData.Iva : 0);
    const [peso, setPeso] = useState(isEditing ? productoData.Peso : 0);
    const [idMarca, setIdMarca] = useState(isEditing ? productoData.IdMarca : '');
    const [idPresentacion, setIdPresentacion] = useState(isEditing ? productoData.IdPresentacion : '');
    const [idProveedor, setIdProveedor] = useState(isEditing ? productoData.IdProveedor : '');
    const [idZona, setIdZona] = useState(isEditing ? productoData.IdZona : '');

    const handleCrear = async () => {
        const response = await fetch('https://localhost:44351/api/Producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Codigo: codigo,
                DescripcionProducto: descripcionProducto,
                Precio: parseFloat(precio),
                Stock: parseInt(stock, 10),
                Iva: parseFloat(iva),
                Peso: parseFloat(peso),
                IdMarca: parseInt(idMarca, 10),
                IdPresentacion: parseInt(idPresentacion, 10),
                IdProveedor: parseInt(idProveedor, 10),
                IdZona: parseInt(idZona, 10),
            }),
        });

        if (response.status === 200) {
            alert('Producto registrado correctamente');
            navigate('/productos');
        } else {
            alert('Error al registrar el producto.');
        }
    };

    const handleActualizar = async () => {
        const response = await fetch('https://localhost:44351/api/Producto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IdProducto: parseInt(productoData.IdProducto),
                Codigo: codigo,
                DescripcionProducto: descripcionProducto,
                Precio: parseFloat(precio),
                Stock: parseInt(stock),
                Iva: parseFloat(iva),
                Peso: parseFloat(peso),
                IdMarca: parseInt(idMarca),
                IdPresentacion: parseInt(idPresentacion),
                IdProveedor: parseInt(idProveedor),
                IdZona: parseInt(idZona),
            }),
        });
        console.log(response.json())
        if (response.status === 200) {
            alert('Producto actualizado correctamente');
            navigate('/productos');
        } else {
            alert('Error al actualizar el producto.');
        }
    };



    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                {isEditing ? 'Editar Producto' : 'Agregar Producto'}
            </Typography>
            <Stack spacing={3}>
                {/* Repetir para cada propiedad del producto */}
                <TextField
                    label="Código"
                    variant="outlined"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <TextField
                    label="Descripción del Producto"
                    variant="outlined"
                    value={descripcionProducto}
                    onChange={(e) => setDescripcionProducto(e.target.value)}
                />
                <TextField
                    label="Precio"
                    variant="outlined"
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <TextField
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <TextField
                    label="IVA"
                    variant="outlined"
                    type="number"
                    value={iva}
                    onChange={(e) => setIva(e.target.value)}
                />
                <TextField
                    label="Peso"
                    variant="outlined"
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="marca"
                    mb="5px"
                >
                    Marca
                </Typography>
                <Select
                    id="genero"
                    variant="outlined"
                    fullWidth
                    value={marca.IdMarca}
                    onChange={(e) => setMarca(marcas.find((item) => item.IdMarca === e.target.value) || { IdMarca: '' })}
                >
                    <MenuItem></MenuItem>
                    {marcas.map((marca) => (
                        <MenuItem key={marca.IdMarca} value={marca.IdMarca}>
                            {marca.Descripcion}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="ID Presentación"
                    variant="outlined"
                    type="number"
                    value={idPresentacion}
                    onChange={(e) => setIdPresentacion(e.target.value)}
                />
                <TextField
                    label="ID Proveedor"
                    variant="outlined"
                    type="number"
                    value={idProveedor}
                    onChange={(e) => setIdProveedor(e.target.value)}
                />
                <TextField
                    label="ID Zona"
                    variant="outlined"
                    type="number"
                    value={idZona}
                    onChange={(e) => setIdZona(e.target.value)}
                />
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
                </Button>
            </Stack>
        </Box>
    );
};

export default AgregarProducto;