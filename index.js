require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const app = express()
const port = process.env.APP_PORT

//set up middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//listen
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//default route
app.get('/', (request, response) => {
  response.json({ info: 'API base hybride : atelier RCF 2020' })
})

//link up the module exports and API routes
//c'est ici où nous décidons les urls des voies de l'API
app.get('/comediens', db.getActors)
app.get('/auteurs', db.getAuthors)
app.get('/pieces', db.getPlays)
app.get('/images', db.getImages)
app.get('/lagrange', db.getDocuments)
app.get('/registres', db.getRegisters)
app.get('/pieces-registres', db.getRegisterPlays)
app.get('/ventes', db.getTicketSales)

app.get('/comedien/:id', db.getActorById)
app.get('/auteur/:id', db.getAuthorById)
app.get('/piece/:id', db.getPlayById)
app.get('/image/:id', db.getImageById)
app.get('/registre/:id', db.getRegisterById)
app.get('/piece-registre/:id', db.getRegisterPlayById)

app.get('/seance/:date', db.getRegisterDetails)
app.get('/repertoire/:debut&:fin', db.getPeriodRepertoire)
app.get('/oeuvres/:auteur', db.getPlaysByAuthor)
app.get('/documents/:auteur', db.getDocumentsByAuthor)
