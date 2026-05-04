import { Routes, Route } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductFormPage from './pages/ProductFormPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/nuevo" element={<ProductFormPage />} />
        <Route path="/editar/:id" element={<ProductFormPage />} />
      </Routes>
    </>
  )
}

export default App