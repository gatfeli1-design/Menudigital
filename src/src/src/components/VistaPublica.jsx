// src/components/VistaPublica.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const VistaPublica = () => {
  const [negocio, setNegocio] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatosNegocio = async () => {
      try {
        const negociosRef = collection(db, 'businesses');
        const q = query(negociosRef, where('slug', '==', 'elsabormovil'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const negocioDoc = querySnapshot.docs[0];
          setNegocio({ id: negocioDoc.id, ...negocioDoc.data() });
        } else {
          console.log("No se encontró el negocio con ese slug.");
        }
      } catch (error) {
        console.error("Error obteniendo el negocio:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatosNegocio();
  }, []);

  if (cargando) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>Cargando menú...</div>;
  }

  if (!negocio) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>El menú solicitado no existe o ha sido eliminado.</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '20px', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff5722' }}>{negocio.name}</h1>
      <p style={{ color: '#aaa' }}>¡Bienvenido a nuestro menú digital oficial!</p>
    </div>
  );
};

export default VistaPublica;
