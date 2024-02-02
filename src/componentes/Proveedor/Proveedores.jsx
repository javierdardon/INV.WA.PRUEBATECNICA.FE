import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Proveedores = () => {
    const [Proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://localhost:44351/api/Proveedor' )
            .then((response) => response.json())
            .then((data) => {
                setProveedores(data);
            });
    }, []);

    const agregarProveedor = () => {
        navigate('/ui/agregar-Proveedor');
    };

    const handleEliminar = (ProveedorId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://localhost:44351/api/Proveedor/${ProveedorId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setProveedores(Proveedores.filter((Proveedor) => Proveedor.IdProveedor !== ProveedorId));
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
            <Button variant="contained" color="secondary" size="large" onClick={agregarProveedor}>
                Agregar Proveedor
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
                    {Proveedores.map((Proveedor, index) => (
                        <TableRow key={index}>
                            <TableCell>{Proveedor.IdProveedor}</TableCell>
                            <TableCell>{Proveedor.Descripcion}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    data-id={Proveedor.IdProveedor}
                                    onClick={() =>
                                        navigate(`/ui/editar-Proveedor/${Proveedor.IdProveedor}`, {
                                            state: { Proveedor: Proveedor },
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
                                    onClick={() => handleEliminar(Proveedor.IdProveedor)}
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

export default Proveedores;
