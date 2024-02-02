import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Presentaciones = () => {
    const [Presentaciones, setPresentaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://localhost:44351/api/Presentacion' )
            .then((response) => response.json())
            .then((data) => {
                setPresentaciones(data);
            });
    }, []);

    const agregarPresentacion = () => {
        navigate('/ui/agregar-Presentacion');
    };

    const handleEliminar = (PresentacionId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://localhost:44351/api/Presentacion/${PresentacionId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setPresentaciones(Presentaciones.filter((Presentacion) => Presentacion.IdPresentacion !== PresentacionId));
                    } else {
                        console.error('Error al eliminar la categoría.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoría:', error);
                });
        }
    };

    return (
        <>
            <Button variant="contained" color="secondary" size="large" onClick={agregarPresentacion}>
                Agregar Presentacion
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Presentaciones.map((Presentacion, index) => (
                        <TableRow key={index}>
                            <TableCell>{Presentacion.IdPresentacion}</TableCell>
                            <TableCell>{Presentacion.Descripcion}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    data-id={Presentacion.IdPresentacion}
                                    onClick={() =>
                                        navigate(`/ui/editar-Presentacion/${Presentacion.IdPresentacion}`, {
                                            state: { Presentacion: Presentacion },
                                        })}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleEliminar(Presentacion.IdPresentacion)}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </>
    );
};

export default Presentaciones;
