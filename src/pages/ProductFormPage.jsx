import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { getProductos, createProducto, updateProducto } from '../services/api'

const validationSchema = Yup.object({
  nombre: Yup.string().min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
  categoria: Yup.string().required('La categoría es obligatoria'),
  precio: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('El precio es obligatorio'),
  stock: Yup.number()
    .typeError('Debe ser un número entero')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('El stock es obligatorio'),
})

const inputStyle = {
  width: '100%', padding: '0.7rem', borderRadius: '8px',
  border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box'
}

const errorStyle = { color: '#ef4444', fontSize: '0.85rem', marginTop: '0.2rem' }

function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [initialValues, setInitialValues] = useState({
    nombre: '', categoria: '', precio: '', stock: ''
  })
  const [loadingData, setLoadingData] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [errorGuardar, setErrorGuardar] = useState(null)

useEffect(() => {
  if (!esEdicion) return

  const cargarProducto = async () => {
    setLoadingData(true)
    try {
      const { data } = await getProductos()
      const producto = data.find(p => (p._id || p.id) == id)
      if (producto) {
        setInitialValues({
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          stock: producto.stock,
        })
      }
    } catch (err) {
      console.error('Error al cargar producto:', err)
    } finally {
      setLoadingData(false)
    }
  }

  cargarProducto()
}, [id, esEdicion])

  const handleSubmit = async (values) => {
    setGuardando(true)
    setErrorGuardar(null)
    try {
      const payload = {
        ...values,
        precio: Number(values.precio),
        stock: Number(values.stock),
      }
      if (esEdicion) {
        await updateProducto(id, payload)
      } else {
        await createProducto(payload)
      }
      // Solo navega si el backend respondió exitosamente
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al guardar. Verifica los datos e intenta de nuevo.'
      setErrorGuardar(msg)
      console.error(err)
    } finally {
      setGuardando(false)
    }
  }

  if (loadingData) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        Cargando datos del producto...
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>
        {esEdicion ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
      </h2>

      {/* Banner de error de red */}
      {errorGuardar && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
          padding: '12px 16px', color: '#dc2626', marginBottom: '16px', fontSize: '14px'
        }}>
          ⚠️ {errorGuardar}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Nombre del Producto</label>
            <Field name="nombre" style={inputStyle} placeholder="Ej: Laptop Dell XPS" />
            <ErrorMessage name="nombre" component="div" style={errorStyle} />
          </div>
          <div>
            <label>Categoría</label>
            <Field name="categoria" as="select" style={inputStyle}>
              <option value="">Selecciona una categoría</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Teclado">Teclado</option>
              <option value="Mouse">Mouse</option>
              <option value="Auriculares">Auriculares</option>
              <option value="Otro">Otro</option>
            </Field>
            <ErrorMessage name="categoria" component="div" style={errorStyle} />
          </div>
          <div>
            <label>Precio (USD)</label>
            <Field name="precio" type="number" step="0.01" style={inputStyle} placeholder="Ej: 299.99" />
            <ErrorMessage name="precio" component="div" style={errorStyle} />
          </div>
          <div>
            <label>Stock</label>
            <Field name="stock" type="number" style={inputStyle} placeholder="Ej: 10" />
            <ErrorMessage name="stock" component="div" style={errorStyle} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={guardando}
              style={{
                flex: 1, padding: '0.8rem',
                background: guardando ? '#86efac' : '#16a34a',
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '1rem', cursor: guardando ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {guardando ? '⏳ Guardando...' : '💾 Guardar'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={guardando}
              style={{
                flex: 1, padding: '0.8rem', background: '#64748b',
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '1rem', cursor: 'pointer'
              }}
            >
              ❌ Cancelar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProductFormPage