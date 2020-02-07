/*
API pour la base hybride créée pour l'atelier RCF-ARTEC février/2020
C'est évidemment READ ONLY, donc très peu d'effort a été consacré à la sécurité

Cette base comprend 8 tableaux: auteurs, comediens, documents_lagrange, images_registres, registers, pieces, pieces_regia-stres, et ventes

The choice not to use an ORM was a deliberate effort to make the link to the database as explicit as possible
While going that route may have made things cleaner, this format brings to the forefront what otherwise would have been hidden under the hood

There's not any sophistocated error handling - something to add later
*/

require('dotenv').config();
require('console');
var moment = require('moment');

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
const maxDate = '1743-12-31'
const minDate = '1715-09-01'


// les requêtes générals (sans paramètres) pour les 8 tableaux (basic fetchers)
const getActors = (request, response) => {
  pool.query('select * from comediens order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAuthors = (request, response) => {
  pool.query('select * from auteurs order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDocuments = (request, response) => {
  pool.query('select * from documents_lagrange order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getImages = (request, response) => {
  pool.query('select * from images_registres order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPlays = (request, response) => {
  pool.query('select * from pieces order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRegisters = (request, response) => {
  pool.query('select * from registres order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRegisterPlays = (request, response) => {
  pool.query('select * from pieces_registres order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTicketSales = (request, response) => {
  pool.query('select * from ventes order by id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


/*
les requêtes auquels on fourni une clé primaire et qui renvoient une seule rangée
c'est un type de requête qu'on retrouve dans les API presque sans exception
les documents lagrange et les ventes ne peuvent pas être identifiés par une seule colonne (leurs clés sont composites), donc on ne les inclus pas ici
*/

const getActorById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from comediens where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

const getAuthorById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from auteurs where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

const getPlayById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from pieces where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

const getRegisterById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from registres where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

const getRegisterPlayById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from pieces_registres where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

const getImageById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("select * from images_registres where id=$1", [id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]? results.rows[0]: null
    response.status(200).json(res)
  })
}

//okay now time for the useful stuff
//ces requêtes sont moins standards/plus ciblés - on pense ici à des cas d'utilisation/scénarios particuliers

//all register info by date
//cherchez les détails d'un registre pour une date spécifique
const getRegisterDetails = (request, response) => {
  const date = request.params.date
  if(!moment(date, 'YYYY-MM-DD').isValid()) {
      response.status(400).json("Erreur: requête malformée")
      return
  }
  pool.query("select * from registres where date=$1", [date], (error, results) => {
    if (error || !results) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    res = results.rows[0]
    if(res) {
      pool.query("select * from images_registres where id_registre = $1", [res.id], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rows.length > 0) {
          res.images = results.rows
        }

        pool.query("select * from pieces_registres join pieces on id_piece = pieces.id where id_registre = $1", [res.id], (error, results) => {
          if (error) {
            throw error
          }
          if(results.rows.length > 0) {
            res.pieces = results.rows
          }
            pool.query("select * from ventes where id_registre = $1", [res.id], (error, results) => {
              if (error) {
                throw error
              }
              if(results.rows.length > 0) {
                res.ventes = results.rows
              }
                response.status(200).json(res)
            })
        })
      })
    }
    else {
      response.status(200).json(null)
    }
  })
}

//repertoire - plays performed and the specific performances - over a given time period
// le repertoire pendant une certaine durée
const getPeriodRepertoire = (request, response) => {
  const debut = request.params.debut
  const fin = request.params.fin
  if(!(moment(debut, 'YYYY-MM-DD').isValid() && moment(debut, 'YYYY-MM-DD').isValid()) ) {
      response.status(400).json("Erreur: requête malformée")
      return
  }
  pool.query("select id_registre, id_piece, date, debut, reprise, ordre, gratuit, notes_lieu, notes_public, notes_representation from pieces_registres join registres on id_registre = registres.id where date >= $1 and date <= $2", [debut,fin], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    instances = results.rows
    if(instances.length > 0) {
      unique = Array.from(new Set(instances.map(x=>x.id_piece)))
      pool.query("select * from pieces where id in (" + unique.join(',') + ")", (error, results) => {
        if (error) {
          throw error
        }
        plays = results.rows
        for(let i=0;i<plays.length;i++) {
          plays[i].representations =instances.filter(function(x){return x.id_piece == plays[i].id})
        }

        response.status(200).json(plays)
      })

    }

    else {
      response.status(200).json(results.rows)
    }
  })
}


//plays by a given author
//cherchez toutes les pièces d'un auteur
const getPlaysByAuthor = (request, response) => {
  const author_id = parseInt(request.params.auteur)
  pool.query("select * from pieces where $1 = any(id_auteur)", [author_id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    response.status(200).json(results.rows)
  })
}

//docs by author
//cherchez tous les documents de la base lagrange qui sont liés à un certain auteur
const getDocumentsByAuthor = (request, response) => {
  const author_id = parseInt(request.params.auteur)
  pool.query("select * from documents_lagrange where id_auteur = $1", [author_id], (error, results) => {
    if (error) {
      response.status(400).json("Erreur: requête malformée")
      return
    }
    response.status(200).json(results.rows)
  })
}



//ouvrez les fonctions aux programmes qui utilisent ce module
module.exports = {
  getActors,
  getAuthors,
  getPlays,
  getRegisters,
  getRegisterPlays,
  getImages,
  getDocuments,
  getTicketSales,
  getActorById,
  getAuthorById,
  getPlayById,
  getRegisterById,
  getRegisterPlayById,
  getImageById,
  getRegisterDetails,
  getPeriodRepertoire,
  getPlaysByAuthor,
  getDocumentsByAuthor
}
