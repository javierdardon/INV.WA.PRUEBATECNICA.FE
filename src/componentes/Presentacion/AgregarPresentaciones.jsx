import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import { useLocation } from 'react-router';
import CustomTextField from "../../CustomTextField";

const AgregarPresentacion = () => {
    const { state } = useLocation();
    const PresentacionData = state?.Presentacion || {};
    const isEditing = !!PresentacionData.IdPresentacion;
    const [descripcion, setDescripcion] = useState(isEditing ? PresentacionData.Descripcion : '');

    const handleSubmit = async () => {
        if (isEditing) {
            return handleActualizar(PresentacionData.IdPresentacion);
        } else {
            return handleCrear();
        }
    };

    const handleCrear = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Presentacion', {
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
                alert('Presentacion registrada correctamente');
                window.location.href = '/Presentaciones';
            } else {
                alert('Error al registrar la Presentacion.');
            }
        } catch (error) {
            alert(
                'No se puede registrar la Presentacion en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    const handleActualizar = async (PresentacionId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Presentacion', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    IdPresentacion: parseInt(PresentacionData.IdPresentacion),
                    Descripcion: descripcion,
                }),
            });

            if (response.status === 200) {
                alert('Presentacion actualizada correctamente');
                window.location.href = '/Presentaciones';
            } else {
                alert('Error al actualizar la Presentacion.');
            }
        } catch (error) {
            alert(
                'No se puede actualizar la Presentacion en este momento. Por favor, inténtalo de nuevo más tarde.',
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

export default AgregarPresentacion;
