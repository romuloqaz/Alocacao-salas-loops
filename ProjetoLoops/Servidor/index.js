const pg = require('pg');
let conString = "postgres://postgres:klihsman123@localhost:5432/ProjetoLoops";
let client = new pg.Client(conString);

module.exports ={
   cliente: client
}
