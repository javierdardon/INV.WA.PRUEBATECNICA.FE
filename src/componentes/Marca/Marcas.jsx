import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Marcas = () => {
    const [Marcas, setMarcas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://localhost:44351/api/Marca' )
            .then((response) => response.json())
            .then((data) => {
                setMarcas(data);
            });
    }, []);

    const agregarMarca = () => {
        navigate('/ui/agregar-Marca');
    };

    const handleEliminar = (MarcaId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://localhost:44351/api/Marca/${MarcaId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setMarcas(Marcas.filter((Marca) => Marca.IdMarca !== MarcaId));
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
            <Button variant="contained" color="secondary" size="large" onClick={agregarMarca}>
                Agregar Marca
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
                    {Marcas.map((Marca, index) => (
                        <TableRow key={index}>
                            <TableCell>{Marca.IdMarca}</TableCell>
                            <TableCell>{Marca.Descripcion}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    data-id={Marca.IdMarca}
                                    onClick={() =>
                                        navigate(`/ui/editar-Marca/${Marca.IdMarca}`, {
                                            state: { Marca: Marca },
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
                                    onClick={() => handleEliminar(Marca.IdMarca)}
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

export default Marcas;
