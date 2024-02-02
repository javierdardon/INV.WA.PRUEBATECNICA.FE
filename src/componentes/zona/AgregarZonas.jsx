import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

import { useLocation } from 'react-router';
import CustomTextField from "../../CustomTextField";

const AgregarZona = () => {
    const { state } = useLocation();
    const ZonaData = state?.Zona || {};
    const isEditing = !!ZonaData.IdZona;
    const [descripcion, setDescripcion] = useState(isEditing ? ZonaData.Descripcion : '');

    const handleSubmit = async () => {
        if (isEditing) {
            return handleActualizar(ZonaData.IdZona);
        } else {
            return handleCrear();
        }
    };

    const handleCrear = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Zona', {
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
                alert('Zona registrada correctamente');
                window.location.href = '/zonas';
            } else {
                alert('Error al registrar la Zona.');
            }
        } catch (error) {
            alert(
                'No se puede registrar la Zona en este momento. Por favor, inténtalo de nuevo más tarde.',
            );
        }
    };

    const handleActualizar = async (ZonaId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch('https://localhost:44351/api/Zona', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    IdZona: parseInt(ZonaData.IdZona),
                    Descripcion: descripcion,
                }),
            });

            if (response.status === 200) {
                alert('Zona actualizada correctamente');
                window.location.href = '/zonas';
            } else {
                alert('Error al actualizar la Zona.');
            }
        } catch (error) {
            alert(
                'No se puede actualizar la Zona en este momento. Por favor, inténtalo de nuevo más tarde.',
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

export default AgregarZona;
