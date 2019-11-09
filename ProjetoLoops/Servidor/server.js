
const porta = 3003
const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
const cors= require('cors');
const log = require('./log')


const pg = require('pg')
var conString = "postgres://postgres:klihsman123@localhost:5432/ProjetoLoops";
var client = new pg.Client(conString);
client.connect();

app.use(body.json())
app.use(body.urlencoded({extended:false}))
app.use(cors())

app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Resources'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/img'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/css'))
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin'));
app.use(express.static('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaCadastro'))

app.get('/',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
})


app.get('/cadastro', (req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/CadastroUsuário/telaCadastro.html'));
    })


app.get('/cadastroSala', (req, res, next)=>{
    if(log.log == true){
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas/cadastroSala.html'))
    }else{
        res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/TelaLogin/telaLogin.html'))
    }
    })



app.get('/telaPrincipal',(req, res, next)=>{
    res.sendFile(path.join('/home/klihsman/Alocacao-salas-loops/ProjetoLoops/Telas/Paginas/Index.html'))
})


app.post('/autenticar', async (req, res, next)=>{
 
    function getProfessor(){
         return new Promise((resolve,reject)=> {      log.log = false

            resolve(JSON.stringify(log.log));
            let query = client.query("SELECT* FROM Servidor");
            
            query.on('row', function(row) {
                if(log.log == false) {
              
                     }
                });
        })
    }

    var waitToGetKlih = await getProfessor();
    res.send(JSON.stringify(waitToGetKlih));
        
        
        
      /*query.on('end', function() {
            client.end();
        });*/
})


app.listen(porta, ()=>{
    console.log('Server rodando na porta: '+porta)
})