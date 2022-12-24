const admin = require("firebase-admin");
const {getDatabase} = require('firebase-admin/database');
const serviceAccount = require('./credentials.json')
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://venmas-d79a7-default-rtdb.firebaseio.com/"
});
const db = getDatabase(app)

module.exports = { db }