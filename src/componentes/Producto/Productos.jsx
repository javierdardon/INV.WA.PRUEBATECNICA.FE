import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [idProveedor, setIdProveedor] = useState(''); // Inicializar el estado aquí
    const [idZona, setIdZona] = useState(''); // Estado para el ID de la zona
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:44351/api/Producto')
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
            });
    }, []);

    const agregarProducto = () => {
        navigate('/ui/agregar-Productos');
    };

    const handleEliminar = (productoId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            fetch(`https://localhost:44351/api/Producto/${productoId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Producto eliminado correctamente');
                        setProductos(productos.filter((producto) => producto.IdProducto !== productoId));
                    } else {
                        console.error('Error al eliminar el producto.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar el producto:', error);
                });
        }
    };
    const handleDescargarReporte = () => {
        fetch('https://localhost:44351/api/reporte/productos')
            .then((response) => {
                if (response.ok) return response.blob();
                throw new Error('No se pudo generar el reporte.');
            })
            .then((blob) => {
                // Crea un enlace para descargar el PDF
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ReporteProductos.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error al descargar el archivo:', error);
                alert(error.message);
            });
    };
    const handleDescargarReportePorProveedor = () => {
        if (!idProveedor) {
            alert('Por favor, ingresa el ID del proveedor.');
            return;
        }
        const url = `https://localhost:44351/api/reporte/productosporproveedor/${idProveedor}`;
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.blob();
                } else {
                    throw new Error('No se pudo generar el reporte.');
                }
            })
            .then(blob => {
                // Creamos un URL para el blob
                const blobUrl = window.URL.createObjectURL(blob);
                // Creamos un enlace temporal y lo configuramos para descarga
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `Reporte_Productos_Proveedor_${idProveedor}.pdf`;
                // Añadimos el enlace al documento y lo hacemos clic automáticamente
                document.body.appendChild(link);
                link.click();
                // Limpiamos añadiendo un pequeño timeout para la descarga
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                }, 100);
            })
            .catch(error => {
                console.error('Error al descargar el reporte:', error);
                alert('Error al descargar el reporte: ' + error.message);
            });
    };
    const handleQueryTopMarcasPorZona = () => {
        if (!idZona) {
            alert('Por favor, ingresa el ID de la zona.');
            return;
        }
        const url = `https://localhost:44351/api/reporte/topmarcasporzona/${idZona}`;
        fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('No se pudo obtener el top de marcas por zona.');
            })
            .then(data => {
                console.log(data); // Aquí podrías establecer otro estado para almacenar los datos y mostrarlos en la UI
                alert('Consulta realizada con éxito, revisa la consola para ver los resultados.');
            })
            .catch(error => {
                console.error('Error al realizar la consulta:', error);
                alert('Error al realizar la consulta: ' + error.message);
            });
    };
    return (
        <>
            <Button variant="contained" color="secondary" size="large" onClick={agregarProducto}>
                Agregar Producto
            </Button>
            <Button variant="contained" color="primary" size="large" onClick={handleDescargarReporte} style={{ marginLeft: '10px' }}>
                Descargar Reporte PDF
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleDescargarReportePorProveedor} // y aquí
                style={{ marginLeft: '10px' }}
            >
                Descargar Reporte por Proveedor
            </Button>
            <TextField
                label="ID Proveedor"
                type="number"
                value={idProveedor}
                onChange={(e) => setIdProveedor(e.target.value)} // Minúscula 'i' aquí
                style={{ margin: '0 10px' }}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleQueryTopMarcasPorZona}
                style={{ marginLeft: '10px' }}
            >
                Query Top Marcas por Zona
            </Button>
            <TextField
                label="ID Zona"
                type="number"
                value={idZona}
                onChange={(e) => setIdZona(e.target.value)}
                style={{ margin: '0 10px' }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Código</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>IVA</TableCell>
                        <TableCell>Peso</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Presentación</TableCell>
                        <TableCell>Proveedor</TableCell>
                        <TableCell>Zona</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map((producto, index) => (
                        <TableRow key={index}>
                            <TableCell>{producto.IdProducto}</TableCell>
                            <TableCell>{producto.Codigo}</TableCell>
                            <TableCell>{producto.DescripcionProducto}</TableCell>
                            <TableCell>{producto.Precio}</TableCell>
                            <TableCell>{producto.Stock}</TableCell>
                            <TableCell>{producto.Iva}</TableCell>
                            <TableCell>{producto.Peso}</TableCell>
                            <TableCell>{producto.IdMarca}</TableCell> {/* Considerar mejorar para mostrar nombre de marca */}
                            <TableCell>{producto.IdPresentacion}</TableCell> {/* Considerar mejorar para mostrar nombre de presentación */}
                            <TableCell>{producto.IdProveedor}</TableCell> {/* Considerar mejorar para mostrar nombre de proveedor */}
                            <TableCell>{producto.IdZona}</TableCell> {/* Considerar mejorar para mostrar nombre de zona */}
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() =>
                                        navigate(`/ui/editar-Productos/${producto.IdProducto}`, {
                                            state: { producto: producto },
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
                                    onClick={() => handleEliminar(producto.IdProducto)}
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

export default Productos;
