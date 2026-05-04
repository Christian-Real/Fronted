import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import ProductListPage from './pages/ProductListPage'
import ProductFormPage from './pages/ProductFormPage'
import Navbar from './components/Navbar'
import { getProductos, createProducto, updateProducto, deleteProducto } from './api/productos'

function App() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarProductos = useCallback(async () => {
    try {
      const res = await getProductos()
      setProductos(res.data)
      setError(null)
    } catch (_) {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  const agregarProducto = async (producto) => {
    const res = await createProducto(producto)
    setProductos(prev => [...prev, res.data])
  }

  const editarProducto = async (productoActualizado) => {
    const res = await updateProducto(productoActualizado._id, productoActualizado)
    setProductos(prev => prev.map(p => p._id === productoActualizado._id ? res.data : p))
  }

  const eliminarProducto = async (id) => {
    await deleteProducto(id)
    setProductos(prev => prev.filter(p => p._id !== id))
  }

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>⏳ Cargando inventario...</div>
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>❌ {error}</div>

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListPage productos={productos} onEliminar={eliminarProducto} />} />
        <Route path="/nuevo" element={<ProductFormPage onGuardar={agregarProducto} />} />
        <Route path="/editar/:id" element={<ProductFormPage productos={productos} onGuardar={editarProducto} />} />
      </Routes>
    </>
  )
}

export default App