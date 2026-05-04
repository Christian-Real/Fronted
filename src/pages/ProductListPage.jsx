import ProductCard from '../components/ProductCard'

function ProductListPage({ productos, onEliminar }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>
        Inventario de Productos ({productos.length})
      </h2>
      {productos.length === 0 ? (
        <p style={{ color: '#64748b' }}>No hay productos registrados.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {productos.map(producto => (
            <ProductCard key={producto._id} producto={producto} onEliminar={onEliminar} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListPage