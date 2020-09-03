const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');//servidor 
const cors = require('cors');
const app = express();// Automatically allow cross-origin requestsrouter.use(cors({ origin: true }));
app.use(cors({ origin: true }));

//end point de express trae todas las cervezasss
app.get('/beers', async (req, res) => {
  const beers = await admin.firestore().collection('beers').get()
  const list = []
  beers.docs.forEach(doc => {//docs son documento de firebase
    list.push({
      id: doc.id, 
      data: doc.data()
    })
  })
  res.send(list)
})

app.get('/beers/:id', async(req, res) => {
  const beer = await admin.firestore().collection('beers').doc(req.params.id).get().then((doc) =>{
    if (doc.exists){
      return {
        id: doc.id,
        data: doc.data()
      }
    }else {
      return {}
    }
  })
  res.send(beer)
})

//crear cervzas
app.post('/beers', async(req, res) => {
  const beer = await admin.firestore().collection('beers').add(req.body).then((doc) => {
    return doc.id
  })
  res.send(beer)
})
app.delete('/beers/:id', async(req, res) => {//endpoint de la api, actualiza un registro que ya existe
  const beer = await admin.firestore().collection('beers').doc(req.params.id).delete()  
 res.send(beer) 
})
//editar cerveza
app.put('/beers/:id', async(req, res) => {
 const beer = await admin.firestore().collection('beers').doc(req.params.id).update(req.body).then(function (doc){
   return doc.id
 })  
 res.send(beer)
})



exports.api = functions.https.onRequest(app)
