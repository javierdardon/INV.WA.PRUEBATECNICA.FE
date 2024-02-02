import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import { useLocation } from 'react-router';
import CustomTextField from "../../CustomTextField";

const AgregarMarca = () => {
    const { state } = useLocation();
    const MarcaData = state?.Marca || {};
    const isEditing = !!MarcaData.IdMarca;
    const [descripcion, setDescripcion] = useState(isEditing ? MarcaData.Descripcion : '');

    const handleSubmit = async () => {
        if (isEditing) {
            return handleActualizar(MarcaData.IdMarca);
        } else {
            return handleCrear();
        }
    };

    const handleCrear = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Marca', {
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
                alert('Marca registrada correctamente');
                window.location.href = '/Marcas';
            } else {
                alert('Error al registrar la Marca.');
            }
        } catch (error) {
            alert(
                'No se puede registrar la Marca en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    const handleActualizar = async (MarcaId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Marca', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    IdMarca: parseInt(MarcaData.IdMarca),
                    Descripcion: descripcion,
                }),
            });

            if (response.status === 200) {
                alert('Marca actualizada correctamente');
                window.location.href = '/Marcas';
            } else {
                alert('Error al actualizar la Marca.');
            }
        } catch (error) {
            alert(
                'No se puede actualizar la Marca en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    return (
        <>
            <Stack>
                <Box sx={{ width: '50%', mx: 'auto' }}>
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
                        sx={{ width: '100%' }}
                    />
                </Box>
            </Stack>
            <Box sx={{ width: '50%', mx: 'auto', mt: 2 }}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    Guardar
                </Button>
            </Box>
        </>
    );
};

export default AgregarMarca;
