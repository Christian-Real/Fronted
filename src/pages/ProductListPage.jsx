import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProductos, deleteProducto } from '../services/api'

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
      <div style={{
        width: '40px', height: '40px', border: '4px solid #e2e8f0',
        borderTop: '4px solid #2563eb', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p>Cargando inventario...</p>
    </div>
  )
}

function ErrorBanner({ mensaje, onReintentar }) {
  return (
    <div style={{
      background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
      padding: '16px 20px', color: '#dc2626', margin: '24px 0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <span>⚠️ {mensaje}</span>
      <button onClick={onReintentar} style={{
        background: '#dc2626', color: 'white', border: 'none',
        borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px'
      }}>
        Reintentar
      </button>
    </div>
  )
}

function ProductListPage() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const cargarProductos = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getProductos()
      setProductos(data)
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica que el backend esté activo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    try {
      await deleteProducto(id)
      setProductos(prev => prev.filter(p => p._id !== id && p.id !== id))
    } catch (err) {
      alert('Error al eliminar el producto. Intenta de nuevo.')
      console.error(err)
    }
  }

  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Encabezado */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px'
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Inventario de Productos</h2>
          {!loading && !error && (
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/nuevo')}
          style={{
            background: '#2563eb', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px', cursor: 'pointer',
            fontWeight: '600', fontSize: '14px'
          }}
        >
          + Nuevo producto
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          width: '100%', maxWidth: '360px', padding: '10px 14px',
          border: '1px solid #e2e8f0', borderRadius: '8px',
          fontSize: '14px', marginBottom: '24px', boxSizing: 'border-box'
        }}
      />

      {/* Estados */}
      {loading && <Spinner />}
      {!loading && error && <ErrorBanner mensaje={error} onReintentar={cargarProductos} />}
      {!loading && !error && productosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
          <p style={{ fontSize: '16px' }}>
            {busqueda ? 'No se encontraron productos con esa búsqueda.' : 'No hay productos registrados.'}
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && productosFiltrados.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {productosFiltrados.map(producto => (
            <ProductCard
              key={producto._id || producto.id}
              producto={producto}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default ProductListPage