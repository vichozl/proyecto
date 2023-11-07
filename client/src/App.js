import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('0');
  const [materialesList, setMateriales] = useState([]);

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();
  const [busqueda, setBusqueda] = useState('');


  const add = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      cantidad: cantidad,
      proveedor: proveedor,
      fecha: fecha,
      precio: precio
    }).then(() => {
      alert('!Material registrado!');
      getMateriales();
    });
  };

  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id:id,
      nombre: nombre,
      cantidad: cantidad,
      proveedor: proveedor,
      fecha: fecha,
      precio: precio
    }).then(() => {
      getMateriales();
      alert("!Actualización éxitosa!");
    });
  };

  const updateMaterial = () => {
    if (!id) {
      alert('El ID del material es requerido para actualizar.');
      return;
    }
    Axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      cantidad: cantidad,
      proveedor: proveedor,
      fecha: fecha,
      precio: precio
    }).then(() => {
      getMateriales();
      alert('¡Actualización exitosa!');
    }).catch(error => {
      alert('Ocurrió un error al actualizar el material');
      console.error(error);
    });
  };


  // Función para eliminar un material
const deleteMaterial = (id) => {
  Axios.delete(`http://localhost:3001/material/${id}`)
    .then(() => {
      alert('Material eliminado con éxito');
      getMateriales(); // Actualiza la lista después de la eliminación
    })
    .catch(error => {
      alert('Ocurrió un error al eliminar el material');
      console.error(error);
    });
};

  
  // Función para resetear el formulario y salir del modo de edición
    const cancelEdit = () => {
      setNombre('');
      setCantidad(0);
      setProveedor('');
      setFecha('');
      setPrecio('0');
      setId(null); 
      setEditar(false); 
    };

  const editarMaterial = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setCantidad(val.cantidad);
    setProveedor(val.proveedor);
    setFecha(val.fecha);
    setPrecio(val.precio);
    setId(val.id);
  }

  const getMateriales = () => {
    Axios.get('http://localhost:3001/materiales').then((response) => {
      setMateriales(response.data);
    });
  };

  const handleSearchChange = (event) => {
    setBusqueda(event.target.value);
  };
  
  const filteredMateriales = materialesList.filter((val) => {
    return val.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });
  

  useEffect(() => {
    getMateriales();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">EVATEC</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="card text-center">
          
        <div className="card-header">
          GESTIÓN DE MATERIALES
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input 
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" 
              value={nombre}
              placeholder="Ingrese el nombre del material" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cantidad:</span>
            <input 
              type="number"
              onChange={(event) => {
                setCantidad(event.target.value);
              }}        
              className="form-control" 
              value={cantidad}
              placeholder="Ingrese la cantidad" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Proveedor:</span>
            <input 
              type="text"
              onChange={(event) => {
                setProveedor(event.target.value);
              }}
              className="form-control" 
              value={proveedor}
              placeholder="Ingrese el proveedor" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha:</span>
            <input 
              type="text"
              onChange={(event) => {
                setFecha(event.target.value);
              }}
              className="form-control" 
              value={fecha}
              placeholder="Ingrese la fecha de ingreso" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio:</span>
            <input 
              type="number"
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              className="form-control" 
              value={precio}
              placeholder="Ingrese el valor" 
              aria-label="Username" 
              aria-describedby="basic-addon1" 
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar? 
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={cancelEdit}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
        </div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={handleSearchChange}
        />

        <table className="table table-striped">
          
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Fecha</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredMateriales.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.cantidad}</td>
                <td>{val.proveedor}</td>
                <td>{val.fecha}</td>
                <td>{val.precio}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                      editarMaterial(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteMaterial(val.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    </>
  );
}

export default App;