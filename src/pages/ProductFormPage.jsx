import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  nombre: Yup.string().min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
  categoria: Yup.string().required('La categoría es obligatoria'),
  precio: Yup.number().positive('Debe ser un número positivo').required('El precio es obligatorio'),
  stock: Yup.number().integer('Debe ser un número entero').min(0, 'No puede ser negativo').required('El stock es obligatorio'),
})

const inputStyle = {
  width: '100%', padding: '0.7rem', borderRadius: '8px',
  border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box'
}

const errorStyle = { color: '#ef4444', fontSize: '0.85rem', marginTop: '0.2rem' }

function ProductFormPage({ productos = [], onGuardar }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const initialValues = useMemo(() => {
    if (id && productos.length > 0) {
      const producto = productos.find(p => p._id === id)
      if (producto) return producto
    }
    return { nombre: '', categoria: '', precio: '', stock: '' }
  }, [id, productos])

  const handleSubmit = (values) => {
    const producto = {
      ...values,
      _id: id ? id : undefined,
      precio: Number(values.precio),
      stock: Number(values.stock)
    }
    onGuardar(producto)
    navigate('/')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>
        {id ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
      </h2>
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
            <button type="submit" style={{
              flex: 1, padding: '0.8rem', background: '#16a34a',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '1rem', cursor: 'pointer'
            }}>
              💾 Guardar
            </button>
            <button type="button" onClick={() => navigate('/')} style={{
              flex: 1, padding: '0.8rem', background: '#64748b',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '1rem', cursor: 'pointer'
            }}>
              ❌ Cancelar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProductFormPage