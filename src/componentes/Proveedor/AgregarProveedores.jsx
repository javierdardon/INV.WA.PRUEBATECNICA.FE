import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import { useLocation } from 'react-router';
import CustomTextField from "../../CustomTextField";

const AgregarProveedor = () => {
    const {state} = useLocation();
    const ProveedorData = state?.Proveedor || {};
    const isEditing = !!ProveedorData.IdProveedor;
    const [descripcion, setDescripcion] = useState(isEditing ? ProveedorData.Descripcion : '');

    const handleSubmit = async () => {
        if (isEditing) {
            return handleActualizar(ProveedorData.IdProveedor);
        } else {
            return handleCrear();
        }
    };

    const handleCrear = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Proveedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    descripcion,
                }),
            });

            if (response.status === 200) {
                alert('Proveedor registrada correctamente');
                window.location.href = '/proveedores';
            } else {
                alert('Error al registrar la Proveedor.');
            }
        } catch (error) {
            alert(
                'No se puede registrar la Proveedor en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    const handleActualizar = async (ProveedorId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Proveedor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    IdProveedor: parseInt(ProveedorData.IdProveedor),
                    Descripcion: descripcion,
                }),
            });

            if (response.status === 200) {
                alert('Proveedor actualizada correctamente');
                window.location.href = '/Proveedores';
            } else {
                alert('Error al actualizar la Proveedor.');
            }
        } catch (error) {
            alert(
                'No se puede actualizar la Proveedor en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    return (
        <>
            <Stack>
                <Box sx={{width: '50%', mx: 'auto'}}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="descripcion"
                        mb="10px"
                    >
                        Descripcion
                    </Typography>
                    <CustomTextField
                        id="descripcion"
                        variant="outlined"
                        fullWidth
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        sx={{width: '100%'}}
                    />
                </Box>
            </Stack>
            <Box sx={{width: '50%', mx: 'auto', mt: 2}}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{width: '100%'}}
                >
                    Guardar
                </Button>
            </Box>
        </>
    );
};

export default AgregarProveedor;
