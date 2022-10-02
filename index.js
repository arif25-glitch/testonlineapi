const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

app.use(express.static("frontend"));
app.use(express.json({"limit" : "1mb"}));

server.listen(port, () => console.log("Listening"));

app.get('/', (req, res) => {
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://fireapiproject-4f818-default-rtdb.asia-southeast1.firebasedatabase.app",
      authDomain: "fireapiproject-4f818.firebaseapp.com"
    });
    
    let database = admin.database();
    let userRef = database.ref("users");
  
    userRef.once('value', (snapshot) => {
    })
    .then((result) => {
      res.json(result.val());
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      admin.app().delete();
    });
  }
})
