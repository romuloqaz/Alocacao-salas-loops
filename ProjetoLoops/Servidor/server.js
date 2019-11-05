const porta = 3003
const express = require('express');
const app = express();
const path = require('path');

const pg = require('pg')
var conString = "postgres://postgres:klihsman123@localhost:5432/ProjetoLoops";
var client = new pg.Client(conString);
client.connect();


app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Servidor/index.js'))
app.get('/',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
})

app.get('/cadastro', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro/telaCadastro.html'))
})

app.post('/autenticar', (req, res, next)=>{
        let query = client.query("SELECT* FROM exe");

        query.on('row', function(row) {
           if(row.id == 1){
               res.send(row)
           }
        });
        
        
        query.on('end', function() {
            client.end();
        });
})
app.listen(porta, ()=>{
    console.log('Server rodando na porta: '+porta)
})