import { useNavigate } from 'react-router-dom'

function ProductCard({ producto, onEliminar }) {
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'white', borderRadius: '12px', padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex',
      flexDirection: 'column', gap: '0.5rem'
    }}>
      <h3 style={{ margin: 0, color: '#1e293b' }}>{producto.nombre}</h3>
      <span style={{
        background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.7rem',
        borderRadius: '20px', fontSize: '0.8rem', width: 'fit-content'
      }}>{producto.categoria}</span>
      <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold', color: '#16a34a' }}>
        ${producto.precio.toFixed(2)}
      </p>
      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
        Stock: {producto.stock} unidades
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => navigate(`/editar/${producto.id}`)}
          style={{
            flex: 1, padding: '0.5rem', background: '#3b82f6',
            color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          ✏️ Editar
        </button>
        <button
          onClick={() => onEliminar(producto.id)}
          style={{
            flex: 1, padding: '0.5rem', background: '#ef4444',
            color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProductCard