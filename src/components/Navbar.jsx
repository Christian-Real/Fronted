import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ background: '#1e293b', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🖥️ TechInventory</h1>
      <Link 
        to="/nuevo" 
        style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none' }}>
        + Nuevo Producto
      </Link>
    </nav>
  )
}

export default Navbar