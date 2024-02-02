import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Zonas = () => {
    const [Zonas, setZonas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://localhost:44351/api/Zona' )
            .then((response) => response.json())
            .then((data) => {
                setZonas(data);
            });
    }, []);

    const agregarZona = () => {
        navigate('/ui/agregar-Zona');
    };

    const handleEliminar = (ZonaId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://localhost:44351/api/Zona/${ZonaId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setZonas(Zonas.filter((Zona) => Zona.IdZona !== ZonaId));
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
            <Button variant="contained" color="secondary" size="large" onClick={agregarZona}>
                Agregar Zona
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
                    {Zonas.map((Zona, index) => (
                        <TableRow key={index}>
                            <TableCell>{Zona.IdZona}</TableCell>
                            <TableCell>{Zona.Descripcion}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    data-id={Zona.IdZona}
                                    onClick={() =>
                                        navigate(`/ui/editar-Zona/${Zona.IdZona}`, {
                                            state: { Zona: Zona },
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
                                    onClick={() => handleEliminar(Zona.IdZona)}
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

export default Zonas;
