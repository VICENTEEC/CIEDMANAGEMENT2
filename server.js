const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Importa CORS
const app = express();

// Configura CORS para permitir todas las solicitudes de origen cruzado
// Para mayor seguridad, deberías restringirlo a tu dominio de origen específico
app.use(cors());

app.use(express.json());

// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Asegúrate de procesar los saltos de línea correctamente
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
// };


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


admin.initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://gestion-cied-coe.firebaseio.com'
});




// Endpoint para registrar usuarios
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Aquí puedes agregar al usuario a Firestore o realizar otras acciones necesarias

    // Envía una respuesta exitosa
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de PRACTICA_COE_DIM45');
  });

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
