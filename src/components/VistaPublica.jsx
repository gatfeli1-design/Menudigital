// src/components/VistaPublica.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const VistaPublica = () => {
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerMenu = async () => {
      try {
        const negociosRef = collection(db, 'businesses');
        const q = query(negociosRef, where('slug', '==', 'elsabormovil'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const negocioDoc = querySnapshot.docs[0];
          const negocioData = { id: negocioDoc.id, ...negocioDoc.data() };
          setNegocio(negocioData);

          // Obtener los productos del negocio
          const productosRef = collection(db, `businesses/${negocioDoc.id}/products`);
          const productosSnapshot = await getDocs(productosRef);
          const listaProductos = productosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProductos(listaProductos);
        } else {
          console.log("No se encontró el negocio.");
        }
      } catch (error) {
        console.error("Error obteniendo el menú:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerMenu();
  }, []);

  if (cargando) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh', padding: '20px' }}>Cargando el menú más delicioso...</div>;
  }

  if (!negocio) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh', padding: '20px' }}>Lo sentimos, este menú no está disponible en este momento.</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#ff5722', marginBottom: '5px' }}>{negocio.name}</h1>
        <p style={{ color: '#aaa', fontSize: '14px' }}>¡Explora nuestra variedad y haz tu pedido al instante!</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {productos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777' }}>Pronto agregaremos deliciosos platos a nuestro menú.</p>
        ) : (
          productos.map((prod) => (
            <div key={prod.id} style={{ backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{prod.name}</h3>
                <p style={{ margin: '0', color: '#888', fontSize: '13px' }}>{prod.description}</p>
                <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '16px', display: 'inline-block', marginTop: '8px' }}>${prod.price}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VistaPublica;
