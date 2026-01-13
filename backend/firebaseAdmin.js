// import admin from "firebase-admin";
// import path from "path";
// import { fileURLToPath } from "url";

// // __dirname fix for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load service account JSON
// const servicePath = path.join(__dirname, "serviceAccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(servicePath),
// });

// export default admin;

// firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "./config/serviceAccount.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
